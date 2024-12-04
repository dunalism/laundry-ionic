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
import { loginUser } from "../utils/auth";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setToastMessage("Please fill in all fields");
      setShowToast(true);
      return;
    }

    const user = loginUser(email, password);
    if (user) {
      history.push("/providers");
    } else {
      setToastMessage("Invalid email or password");
      setShowToast(true);
    }
  };

  return (
    <IonPage className="">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="max-w-md mx-auto space-y-4">
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

          <IonButton expand="block" onClick={handleLogin}>
            Login
          </IonButton>
          <p className="text-center text-gray-300">
            Don't have an account?{" "}
            <a
              onClick={() => history.push("/register")}
              className="text-primary-500 cursor-pointer"
            >
              Register here
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

export default Login;
