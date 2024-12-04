import { LaundryProvider, LaundryService } from "../types";

export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};

export const initializeData = () => {
  // Initialize cities and providers if not exists
  if (!getItem("providers")) {
    const cities = ["Bandung", "Jakarta", "Surabaya"];
    const providers: LaundryProvider[] = [];

    cities.forEach((city) => {
      for (let i = 1; i <= 10; i++) {
        providers.push({
          id: `${city.toLowerCase()}-${i}`,
          name: `${city} Laundry ${i}`,
          city,
          address: `Jl. ${city} No. ${i}`,
          rating: Math.floor(Math.random() * 5) + 1,
          image: `https://picsum.photos/200/200?random=${i}`,
        });
      }
    });

    setItem("providers", providers);
  }

  // Initialize services if not exists
  if (!getItem("services")) {
    const services: LaundryService[] = [];
    const serviceTypes = [
      { name: "Cuci Baju", type: "Per Kilo", price: 5000 },
      { name: "Setrika Baju", type: "Per Kilo", price: 3000 },
      { name: "Cuci Sepatu", type: "Per Pasang", price: 25000 },
      { name: "Cuci Selimut", type: "Per Item", price: 20000 },
      { name: "Cuci Karpet", type: "Per Meter", price: 30000 },
      { name: "Dry Clean", type: "Per Item", price: 15000 },
      { name: "Cuci Express", type: "Per Kilo", price: 8000 },
      { name: "Setrika Express", type: "Per Kilo", price: 5000 },
      { name: "Cuci + Setrika", type: "Per Kilo", price: 7000 },
      { name: "Cuci Gordyn", type: "Per Meter", price: 25000 },
    ];

    const providers = getItem("providers") || [];
    providers.forEach((provider) => {
      serviceTypes.forEach((service, index) => {
        services.push({
          id: `${provider.id}-service-${index}`,
          providerId: provider.id,
          name: service.name,
          type: service.type,
          price: service.price,
          unit: service.type,
        });
      });
    });

    setItem("services", services);
  }
};
