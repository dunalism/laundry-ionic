import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonLabel,
  IonInput,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { getItem, setItem } from "../utils/localStorage";
import { LaundryService, Order } from "../types";
import { getCurrentUser } from "../utils/auth";

const OrderForm: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const service: LaundryService | undefined = (getItem("services") || []).find(
    (s: LaundryService) => s.id === serviceId
  );

  const currentUser = getCurrentUser();

  if (!service || !currentUser) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="text-center">Service not found</div>
        </IonContent>
      </IonPage>
    );
  }

  const totalPrice = service.price * quantity;

  const handleSubmit = () => {
    if (!address) {
      setToastMessage("Please provide your address");
      setShowToast(true);
      return;
    }

    if (quantity < 1) {
      setToastMessage("Quantity must be at least 1");
      setShowToast(true);
      return;
    }

    const order: Order = {
      id: `order-${Date.now()}`,
      userId: currentUser.id,
      serviceId: service.id,
      quantity,
      totalPrice,
      status: "pending",
    };

    const orders = getItem("orders") || [];
    orders.push(order);
    setItem("orders", orders);

    history.push(`/payment/${order.id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/provider/${service.providerId}`} />
          </IonButtons>
          <IonTitle>Order Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-400">{service.type}</p>
            <p className="text-primary-500 font-semibold mt-2">
              Rp {service.price.toLocaleString("id-ID")} / {service.unit}
            </p>
          </div>

          <div className="space-y-4">
            <IonLabel position="floating">Quantity ({service.unit})</IonLabel>
            <IonInput
              type="number"
              value={quantity}
              onIonChange={(e) => setQuantity(Number(e.detail.value))}
              min={1}
            />

            <IonLabel position="floating">Delivery Address</IonLabel>
            <IonTextarea
              value={address}
              onIonChange={(e) => setAddress(e.detail.value!)}
              rows={3}
            />

            <IonLabel position="floating">Additional Notes</IonLabel>
            <IonTextarea
              value={notes}
              onIonChange={(e) => setNotes(e.detail.value!)}
              rows={3}
            />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal</span>
              <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span className="text-primary-500">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <IonButton expand="block" onClick={handleSubmit}>
            Proceed to Payment
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="top"
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default OrderForm;
