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
import OnBoarding from './components/pages/OnBoarding';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import HomeScreen from './components/pages/HomeScreen';
// import Home from './pages/Home';
import Profile from './components/pages/Profile'
import CoinsPage from './components/pages/CoinsPage'
import UpdateProfile from './components/pages/UpdateProfile'
import PracticeHome from "./components/pages/PracticeHome"
import Quiz from './components/pages/Quiz'
import PracticeQuiz from "./components/pages/PracticeQuiz"
setupIonicReact();
const App = () => {
  return (
  <IonReactRouter>
<IonApp>
    <Route exact path={"/"} component={OnBoarding}  />
    <Route exact path={"/signup"} component={Signup}  />
    <Route exact path={"/login"} component={Login}  />
    <Route id={"home"} exact path={"/home"} component={HomeScreen}  />
    <Route id={"home"} exact path={"/practice"} component={PracticeHome}  />
    <Route exact path={"/profile"} component={Profile}  />
    <Route exact path={"/quizScreen"} component={Quiz}  />
    <Route exact path={"/coinsPage"} component={CoinsPage}  />
    <Route exact path={"/practiceQuiz"} component={PracticeQuiz}  />
    <Route exact path={"/updateProfile"} component={UpdateProfile}  />
</IonApp>
  </IonReactRouter>
  )

};

export default App;