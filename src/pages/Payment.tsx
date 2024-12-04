import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonModal, IonIcon } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { getItem, setItem } from '../utils/localStorage';
import { Order, LaundryService } from '../types';
import { checkmarkCircle } from 'ionicons/icons';

const PAYMENT_METHODS = [
  { id: 'bca', name: 'BCA', type: 'bank' },
  { id: 'mandiri', name: 'Mandiri', type: 'bank' },
  { id: 'bni', name: 'BNI', type: 'bank' },
  { id: 'bri', name: 'BRI', type: 'bank' },
  { id: 'cash', name: 'Cash on Delivery', type: 'cash' },
];

const Payment: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const history = useHistory();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const order: Order | undefined = (getItem('orders') || [])
    .find((o: Order) => o.id === orderId);

  const service: LaundryService | undefined = order
    ? (getItem('services') || []).find((s: LaundryService) => s.id === order.serviceId)
    : undefined;

  if (!order || !service) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="text-center">Order not found</div>
        </IonContent>
      </IonPage>
    );
  }

  const handleConfirmPayment = () => {
    if (!selectedPayment) return;

    const orders = getItem('orders') || [];
    const updatedOrders = orders.map((o: Order) => {
      if (o.id === order.id) {
        return {
          ...o,
          status: 'paid',
          paymentMethod: selectedPayment,
        };
      }
      return o;
    });

    setItem('orders', updatedOrders);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    history.push('/providers');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/order/${service.id}`} />
          </IonButtons>
          <IonTitle>Payment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Service</span>
                <span>{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>{order.quantity} {service.unit}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span className="text-primary-500">
                  Rp {order.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <IonList className="bg-transparent">
              <IonRadioGroup value={selectedPayment} onIonChange={e => setSelectedPayment(e.detail.value)}>
                {PAYMENT_METHODS.map(method => (
                  <IonItem key={method.id} className="bg-gray-800 mb-2 rounded-lg">
                    <IonLabel>{method.name}</IonLabel>
                    <IonRadio slot="end" value={method.id} />
                  </IonItem>
                ))}
              </IonRadioGroup>
            </IonList>
          </div>

          <IonButton
            expand="block"
            onClick={handleConfirmPayment}
            disabled={!selectedPayment}
          >
            Confirm Payment
          </IonButton>
        </div>

        <IonModal isOpen={showSuccessModal} onDidDismiss={handleCloseSuccessModal}>
          <div className="h-full flex flex-col items-center justify-center p-6">
            <IonIcon
              icon={checkmarkCircle}
              className="text-6xl text-primary-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-center text-gray-400 mb-6">
              Your order has been confirmed and is being processed.
            </p>
            <IonButton expand="block" onClick={handleCloseSuccessModal}>
              Back to Home
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Payment;