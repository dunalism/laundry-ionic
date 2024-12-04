import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage className="bg-white">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to LaundryApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-3xl font-bold text-primary-600">LaundryApp</h1>
          <p className="text-center text-gray-300 mb-8">
            Find the best laundry service near you
          </p>
          <div className="space-y-4 w-full max-w-xs">
            <IonButton
              expand="block"
              onClick={() => history.push("/register")}
              className="w-full"
            >
              Register
            </IonButton>
            <IonButton
              expand="block"
              fill="outline"
              onClick={() => history.push("/login")}
              className="w-full"
            >
              Login
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
