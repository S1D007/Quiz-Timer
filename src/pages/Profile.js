import { IonIcon, IonInput, IonItem, IonPage, IonText, IonList, IonSelect, IonSelectOption, IonButton, IonImg, IonApp } from '@ionic/react';
import { call, man } from "ionicons/icons"
import React, { useEffect, useLayoutEffect, useState, } from 'react'
import ProfileImg from "../components/Images/profile.gif"
import { EmailContext } from '../components/Functions/context';
import { Storage } from '@ionic/storage';
import {db} from "../config/firebase"
import {collection, addDoc, Timestamp} from 'firebase/firestore'
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
  const [phone,setPhone] = useState(null)
  const [name,setName] = useState(null)
  const email = React.useContext(EmailContext)
  const onClickHanddler = async () => {
    const store = new Storage();
    await store.create();
    try {
      await addDoc(collection(db, 'users'), {
        cattegories:currentCategory,
        email:email,
        phone:phone,
        name:name,
        coins:100,
        created: Timestamp.now()
      })
    } catch (err) {
      alert(err)
    }
    // await store.set("profile",true)
    // history.replace("/login")
  }

  // useLayoutEffect(()=>{
  //   onClickHanddler()
  // },[])
  return (
    <IonPage class='profile' style={{
      backgroundColor: "#fff",
      padding: "5%",
      color: "black"
    }} >
    <IonApp class='profile' style={{
      backgroundColor: "#fff",
      padding: "5%",
      color: "black"
    }}  >
      <div  >
        <div >
          <IonText style={{
          }} color={"#fff"} >
            <h1 style={{
              textAlign: "center",
              fontSize: "3rem",
              fontFamily: "sans-serif",
              fontWeight: "bold"
            }}  >Profile</h1>
          </IonText>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
        }} >
          <IonImg style={{
            width: "40vw"
          }} src={ProfileImg} />

        </div>
        <div>
          <IonInput value={name} onIonChange={(e)=>setName(e.target.value)} style={{
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

          <IonInput value={phone} onIonChange={(e)=>setPhone(e.target.value)} style={{
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
            boxShadow: "rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px"
          }} type="text" disabled={true} value={"Email: " + email} />
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
          }} >lets Go</h1>
        </IonButton>
      </div>
      </IonApp>
    </IonPage>
  )
}

export default Profile