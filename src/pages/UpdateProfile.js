import { IonIcon, IonInput, IonItem, IonPage, IonText, IonList, IonSelect, IonSelectOption, IonButton, IonImg, IonApp } from '@ionic/react';
import { call, man,arrowBackOutline } from "ionicons/icons"
import React, { useEffect, useLayoutEffect, useState, } from 'react'
import ProfileImg from "../components/Images/profile.gif"
import { EmailContext } from '../components/Functions/context';
import { Storage } from '@ionic/storage';
// import {category} from "./json/category"
let category = [
  {
    id: 1,
    name: 'Maths',
  },
  {
    id: 2,
    name: 'Science',
  },
  {
    id: 3,
    name: 'English',
  },
  {
    id: 4,
    name: 'Sports',
  },
  {
    id: 5,
    name: 'Computer',
  },
];
const compareWith = (o1, o2) => {
  if (!o1 || !o2) {
    return o1 === o2;
  }

  if (Array.isArray(o2)) {
    return o2.some((o) => o.id === o1.id);
  }

  return o1.id === o2.id;
};
const Profile = ({ history }) => {
  const [currentCategory, setCurrentCategory] = useState([]);
  const email = React.useContext(EmailContext)
  const onClickHanddler = async () => {
    const store = new Storage();
    await store.create();
    await store.set("profile",true)
    history.replace("/login")
  }

  // useLayoutEffect(()=>{
  //   onClickHanddler()
  // },[])
  return (
    <IonPage  style={{
      backgroundColor: "#fff",
      color: "black"
    }} >
    <IonApp style={{
      backgroundColor: "#fff",
      margin: "5%",
      color: "black"
    }} >
      <div  >
      <IonIcon size='large' onClick={()=>history.go(-1)} icon={arrowBackOutline} />
        <div style={{
          display: "flex",
          justifyContent: "center",
        }} >
          <IonImg style={{
            width: "40vw"
          }} src={ProfileImg} />

        </div>
        <div>
          <IonInput value={"siddhant"} style={{
            border: "2px solid #2f2f2f",
            color: "black",
            padding: "1rem",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            marginBottom: "20px",
            marginTop: "40px",
            boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
          }} type="text" placeholder="Whats Your Name?" >
            <IonItem slot='start' style={{
              backgroundColor: "#0D1117"
            }} position='floating' >
              <IonIcon icon={man} />
            </IonItem>
          </IonInput>

          <IonInput value={"123456789"} style={{
            border: "2px solid #2f2f2f",
            color: "black",
            padding: "1rem",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
          }} type="number" placeholder="Enter Your 10 Digit Phone Number" >
            <IonItem slot='start' style={{
              backgroundColor: "#0D1117"
            }} position='floating' >
              <IonIcon icon={call} />
            </IonItem>
          </IonInput>
        </div>
        <div>
          <IonInput style={{
            border: "2px solid #2f2f2f",
            color: "black",
            padding: "1rem",
            borderRadius: "10px",
            marginBottom: "10vw",
            marginTop: "40px",
            
          }} type="text"  value={email} />
        </div>
        <div style={{
          marginTop: "5vw",
          marginBottom: "5vw"
        }} >
          <h2 style={{
            fontFamily: "monospace",
            fontSize: "2rem",
            textAlign: "center",
          }} >
            Choose Category
          </h2>
          <IonList style={{
            border: "2px solid black",
            borderRadius: "50px",
          }} >
            <IonItem
              style={{
                borderRadius: "50px",
              }} class='ionItem' >
              <IonSelect style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }} compareWith={compareWith} onIonChange={(ev) => {
                setCurrentCategory(ev.detail.value)
              }}
                placeholder="Select the Multiple Category" multiple={true}>
                {category.map((e) => (
                  <IonSelectOption key={e.id} value={e}>
                    {e.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
      }} >
        <IonButton onClick={() => {
          onClickHanddler()
        }} style={{
          position: "fixed",
          bottom: "0",
        }} color={"success"} >
          <h1 color='dark' style={{
            margin: "5%",
            padding: "50px"
          }} >Update Profile</h1>
        </IonButton>
      </div>
      </IonApp>
    </IonPage>
  )
}

export default Profile