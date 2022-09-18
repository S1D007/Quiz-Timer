import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonPage, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, useIonAlert, IonTitle, IonToolbar, useIonRouter, IonLoading, useIonLoading } from '@ionic/react'
import { App } from '@capacitor/app';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import coin from "../components/Images/coin.png"
import { menu } from "ionicons/icons"
import { person } from "ionicons/icons"
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { UserContext } from '../components/Functions/context';
import { Route, Switch } from 'react-router'
function HomeScreen({ history }) {
  const [present, dismiss] = useIonLoading();
  const [numb, setNumber] = useState(1)
  const userDetails = React.useContext(UserContext)
  const [coinVAl, setCoinVAL] = useState(null)
  const [cat, setCat] = useState([])
  const [presentAlert] = useIonAlert();
  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        presentAlert({
          header: 'Do you really want to Exit ?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                history.push("/home")
              },
            },
            {
              text: 'Yes',
              role: 'confirm',
              handler: () => {
                App.exitApp()
              },
            },
          ],
        })
      }
    });
  });
  useEffect(() => {
    setCoinVAL(userDetails.coins)
    setCat(userDetails.cattegories)
  },[userDetails])
  const id = localStorage.getItem("id")
  const docRef = doc(db,"users",id)
  localStorage.setItem("queNumber",numb)
  return (

    <IonPage 
     style={{
      backgroundColor: "#0D1117",
      color: "white"
    }} >
      <IonApp fullscreen={true} style={{
        backgroundColor: "#0D1117",
        color: "white",
      }} >
      
        <IonMenu color={"dark"} content-id="main-content">
          <IonHeader color={"dark"} >
            <IonToolbar color='dark'>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent color={"dark"} >
            <IonList>
              <IonListHeader>
                Account
              </IonListHeader>
              <IonMenuToggle auto-hide="false">
                <IonItem button>
                  <IonIcon slot="start" name='home'></IonIcon>
                  <IonLabel onClick={() => history.push("/updateProfile")} >
                    Profile
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <div style={{
          backgroundColor: "#0D1117"
        }} className="ion-page" id="main-content">
          <IonHeader style={{
            backgroundColor: "#0D1117"
          }} >
            <IonToolbar style={{
              backgroundColor: "#0D1117"
            }} >
              <IonButtons slot="start">
                <IonMenuToggle>
                  <IonButton>
                    <IonIcon slot="icon-only" icon={menu}></IonIcon>
                  </IonButton>
                </IonMenuToggle>
              </IonButtons>
              <IonTitle alignItems={"center"} >Quiz Home</IonTitle>
            </IonToolbar>
          </IonHeader>
        </div>
        <div style={{
          background: " linear-gradient(to right, #b993d6, #8ca6db)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          width: "150px",
          height: "60px",
          color: "#000",
          margin: "0 auto",
          // padding:"1%",
          borderRadius: "20px",
          marginTop: "100px",
          // borderBottomRightRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: "-10px",
          zIndex: -1
        }} >
          <IonImg style={{
            width: "50px",
            marginLeft: "10px"
            // display:"inline-block",
          }} src={coin} />
          <span style={{
            // marginTop:"50px",
            marginRight: "15px",
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: "monospace",
          }} >{coinVAl}</span>
        </div>
        <div style={{
          // display: "flex",
          position: "relative",
          top: "35px",
          // bottom:"500",
          left: 20
        }} >

        </div>
        <div className='shadow' style={{
          position: "relative",
          backgroundColor: "#fff",
          left: 0,
          top: 25,
          height: "100%",
          width: "100%",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          padding: "0.5rem"
        }} >
          <div style={{
            height: "100%",
            width: "100%",
            border: "2px dashed dahhed",
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
            boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
            backgroundColor: "#fff",
            color: "#000"
          }} >
            <div style={{
              marginTop: "20px",
              padding: "30px"
            }} >
              <IonList style={{
                borderRadius: "50px",

              }} >
                <IonItem>
                  <IonSelect interface="action-sheet" placeholder="Choose a Category">
          {/* {
            cat.map((e)=>{
              return <IonSelectOption>
                {e.name}
              </IonSelectOption>
            })
          } */}
        </IonSelect>
                </IonItem>
              </IonList>
            </div>
            <div style={{
              padding: "30px",
              marginTop: "-50px"
            }} >
              <IonList style={{
                borderRadius: "50px",

              }} >
                <IonItem  >
                  <IonSelect interface="action-sheet" placeholder="Level">
                    <IonSelectOption value="Easy">Easy</IonSelectOption>
                    <IonSelectOption value="Medium">Medium</IonSelectOption>
                    <IonSelectOption value="Hard">Hard</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            </div>
            <div style={{
              display: 'flex',
              padding: "80px",
              marginTop: "-60px"
            }} >

              {/* <h1>Numbers of Questions</h1> */}
              <IonButton disabled={numb === 1 ? true : false} onClick={(e) => setNumber(numb - 1)} color="danger" >-</IonButton>
              <IonInput type='number' style={{
                marginTop: "-15px"
              }} value={numb} disabled={true} color="dark" />
              <IonButton disabled={numb === 10 ? true : false} onClick={(e) => setNumber(numb + 1)}
                color="success" >+</IonButton>
            </div>
            <div style={{
              marginTop: "-80px",
              display: "flex",
              justifyContent: "center",
            }} >
              <IonButton onClick={() =>{ history.push("/quizScreen")
              updateDoc(docRef,{
                coin:coinVAl - 5
              })}
              } color={"success"} >
                <h1 color='dark' style={{
                  margin: "50px",
                  color: "#000"
                }} >Start</h1>
              </IonButton>
            </div>
          </div>
        </div>
        {/* <IonApp> */}

      </IonApp>
    </IonPage>
  )
}

export default HomeScreen