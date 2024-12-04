import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProviderList from './pages/ProviderList';
import ProviderDetail from './pages/ProviderDetail';
import OrderForm from './pages/OrderForm';
import Payment from './pages/Payment';
import AuthGuard from './components/AuthGuard';
import { useEffect } from 'react';
import { initializeData } from './utils/localStorage';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AuthGuard exact path="/providers" component={ProviderList} />
          <AuthGuard exact path="/provider/:id" component={ProviderDetail} />
          <AuthGuard exact path="/order/:serviceId" component={OrderForm} />
          <AuthGuard exact path="/payment/:orderId" component={Payment} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;