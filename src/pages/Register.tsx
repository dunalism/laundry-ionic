import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  IonToast,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../utils/auth";

const Register: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      setToastMessage("Please fill in all fields");
      setShowToast(true);
      return;
    }

    try {
      registerUser({ name, email, password });
      history.push("/login");
    } catch (error) {
      setToastMessage("Registration failed. Please try again.");
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="max-w-md mx-auto space-y-4">
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            type="text"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />

          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />

          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />

          <IonButton expand="block" onClick={handleRegister}>
            Register
          </IonButton>
          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <a
              onClick={() => history.push("/login")}
              className="text-primary-500 cursor-pointer"
            >
              Login here
            </a>
          </p>
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

export default Register;
