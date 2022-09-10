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
import HomeScreen from './pages/HomeScreen';
// import Home from './pages/Home';
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import Quiz from './pages/Quiz'
import { useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';
setupIonicReact();
const App = () => {
  const [launched,setlaunched] = useState(false)
  const [board,setBoard] = useState()
  const launchedInfo = async ()=>{
    const store = new Storage();
    await store.create();
    const profile = await store.get("profile")
    const login = await store.get("login")
    const onBoaard = await store.get("onBoaardingEnded")
    if(onBoaard){
      setBoard(false)
    }else{
      setBoard(true)
    }
    if(profile||login) {
      setlaunched(true)
    }else{
      setlaunched(false)
    }
  }
  useEffect(()=>{
    launchedInfo()
  })
  return (
  <IonReactRouter>
<IonApp>
    <Route exact path={"/"} component={board === false ? null:OnBoarding}  />
    <Route exact path={"/signup"} component={Signup}  />
    <Route exact path={"/login"} component={Login}  />
    <Route id={"home"} exact path={"/home"} component={HomeScreen}  />
    <Route exact path={"/profile"} component={Profile}  />
    <Route exact path={"/quizScreen"} component={Quiz}  />
    <Route exact path={"/updateProfile"} component={UpdateProfile}  />
  </IonApp>
  </IonReactRouter>
  )

};

export default App;