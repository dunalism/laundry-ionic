import { IonSearchbar } from "@ionic/react";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => {
  return (
    <IonSearchbar
      value={value}
      onIonChange={(e) => onSearch(e.detail.value!)}
      placeholder="Cari layanan laundry..."
      color="dark"
      className="mb-4"
    />
  );
};

export default SearchBar;
