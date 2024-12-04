import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { LaundryProvider } from "../types";
import { star } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

interface ProviderCardProps {
  provider: LaundryProvider;
  onClick: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onClick }) => {
  return (
    <IonCard onClick={onClick} className="cursor-pointer">
      <img
        src={provider.image}
        alt={provider.name}
        className="w-full h-48 object-cover"
      />
      <IonCardHeader>
        <IonCardTitle className="text-lg text-white font-semibold">
          {provider.name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">{provider.address}</p>
          <div className="flex items-center">
            <IonIcon icon={star} className="text-yellow-400 mr-1" />
            <span>{provider.rating}</span>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ProviderCard;
