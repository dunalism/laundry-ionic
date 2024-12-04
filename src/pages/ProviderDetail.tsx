import { useState, useMemo } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { getItem } from "../utils/localStorage";
import { LaundryProvider, LaundryService } from "../types";
import ServiceCard from "../components/ServiceCard";
import SearchBar from "../components/SearchBar";
import { usePagination } from "../hooks/usePagination";

const ProviderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const provider: LaundryProvider | undefined = (
    getItem("providers") || []
  ).find((p: LaundryProvider) => p.id === id);

  const allServices: LaundryService[] = (getItem("services") || []).filter(
    (s: LaundryService) => s.providerId === id
  );

  const filteredServices = useMemo(() => {
    return allServices.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allServices, searchQuery]);

  const {
    paginatedItems: services,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = usePagination(filteredServices, 4);

  if (!provider) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="text-center">Provider not found</div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/providers" />
          </IonButtons>
          <IonTitle>{provider.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="space-y-4">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{provider.name}</h2>
            <p className="text-gray-400">{provider.address}</p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★</span>
              <span>{provider.rating}</span>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-4">Available Services</h3>
            <SearchBar value={searchQuery} onSearch={setSearchQuery} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => history.push(`/order/${service.id}`)}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <IonButton onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </IonButton>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <IonButton
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProviderDetail;
