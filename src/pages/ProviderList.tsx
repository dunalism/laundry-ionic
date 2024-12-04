import { useState, useMemo } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { getItem } from "../utils/localStorage";
import { LaundryProvider } from "../types";
import ProviderCard from "../components/ProviderCard";
import SearchBar from "../components/SearchBar";
import CityFilter from "../components/CityFilter";
import { usePagination } from "../hooks/usePagination";

const ProviderList: React.FC = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  const providers = getItem("providers") || [];
  const cities = [...new Set(providers.map((p: LaundryProvider) => p.city))];

  const filteredProviders = useMemo(() => {
    return providers.filter((provider: LaundryProvider) => {
      const matchesSearch = provider.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCity =
        selectedCity === "all" || provider.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [providers, searchQuery, selectedCity]);

  const { paginatedItems, currentPage, totalPages, nextPage, prevPage } =
    usePagination(filteredProviders, 4);

  return (
    <IonPage color="dark">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Laundry Providers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />

        <div className="mb-4">
          <CityFilter
            cities={cities as string[]}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
          />
        </div>

        {paginatedItems.length === 0 ? (
          <div className="text-center text-gray-500">
            Pencarian tidak ditemukan
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedItems.map((provider: LaundryProvider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onClick={() => history.push(`/provider/${provider.id}`)}
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
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProviderList;
