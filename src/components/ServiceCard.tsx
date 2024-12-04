import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { LaundryService } from "../types";

interface ServiceCardProps {
  service: LaundryService;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <IonCard onClick={onClick} className="cursor-pointer">
      <IonCardHeader>
        <IonCardTitle className="text-lg font-semibold text-white">
          {service.name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{service.type}</p>
          <p className="text-primary-500 font-semibold">
            Rp {service.price.toLocaleString("id-ID")} / {service.unit}
          </p>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ServiceCard;
