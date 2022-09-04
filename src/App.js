import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet,setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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
// pages
import OnBoarding from './components/OnBoarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile'
setupIonicReact();
const App = () => {

  // console.log(props.e);
  return <IonReactRouter>
  <IonApp>
    <IonRouterOutlet>
    <Route exact path={"/"} component={OnBoarding}  />
    <Route exact path={"/signup"} component={Signup}  />
    <Route exact path={"/login"} component={Login}  />
    <Route exact path={"/home"} component={Home}  />
    <Route exact path={"/profile"} component={Profile}  />
    </IonRouterOutlet>
  </IonApp>
  </IonReactRouter>
};

export default App;