import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

const CityFilter: React.FC<CityFilterProps> = ({
  cities,
  selectedCity,
  onSelectCity,
}) => {
  return (
    <IonSegment
      value={selectedCity}
      onIonChange={(e) => onSelectCity(e.detail.value! as string)}
    >
      <IonSegmentButton value="all">
        <IonLabel>All</IonLabel>
      </IonSegmentButton>
      {cities.map((city) => (
        <IonSegmentButton key={city} value={city}>
          <IonLabel>{city}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};

export default CityFilter;
