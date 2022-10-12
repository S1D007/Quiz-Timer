import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonPage, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, useIonAlert, IonTitle, IonToolbar, useIonRouter, IonLoading, useIonLoading, IonSpinner } from '@ionic/react'
import { App } from '@capacitor/app';
import React, {  useState } from 'react'
import coin from "../Images/coin.png"
import axios from "axios"
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
function PracticeHome({ history }) {
  const [present, dismiss] = useIonLoading();
  const [spinner,setSpinner] = useState(false)
  const [numb, setNumber] = useState(1)
  const [cat, setCat] = useState([])
  const [loading,setLoading] = useState(true)
  const [currCategory,setCurrCategory] = useState('')
  const [currLevel,setLevel] = useState()
  const [presentAlert] = useIonAlert();
  const ionRouter = useIonRouter();
  const coins = localStorage.getItem('coins')
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        presentAlert({
          header: 'Do you really want to Exit Practice ?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                history.replace("/home")
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
  const handdleClick = () =>{
    setSpinner(true)
    getQuestionsFromBackend()
  }
  
  if(!loading){
    history.push("/practiceQuiz")
    localStorage.setItem("coins",coins-5)
  }
  const getQuestionsFromBackend = () =>{
    console.log("Fetching")
    const url = `http://backquery.online:1111/practice?category=${currCategory}&limit=${numb}`
    try{
        axios.get(url).then(response => {
          localStorage.setItem('question',JSON.stringify(response.data))
          console.log(response.data)
          setLoading(false)
          }).catch((e)=>{
            alert(e)
          })
    }catch(e){
        alert(e)
    }
}
  localStorage.setItem("queNumber", numb)
  let category = [
    {
      id: 1,
      name: 'General Knowledge',
    },
    {
      id: 2,
      name: 'Science & Nature',
    },
    {
      id: 3,
      name: 'Science: Computers',
    },
    {
      id: 4,
      name: 'Science: Mathematics',
    },
    {
      id: 5,
      name: 'Mythology',
    },
    {
      id: 6,
      name: 'Sports',
    },
    {
      id: 7,
      name: 'Geography',
    },
    {
      id: 8,
      name: 'History',
    },
    {
      id: 9,
      name: 'Politics',
    },
    {
      id: 10,
      name: 'Animals',
    },
    {
      id: 11,
      name: 'Vehicles',
    },
    {
      id: 12,
      name: 'Entertainment: Comics',
    },
    {
      id: 13,
      name: 'Science: Gadgets',
    },
    {
      id: 14,
      name: 'Entertainment: Japanese Anime & Manga',
    },
    {
      id: 15,
      name: 'Entertainment: Cartoon & Animations',
    },
  ];
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
          }} >{coins}</span>
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
                  <IonSelect interface="action-sheet" onIonChange={(e)=>{
                setCurrCategory(e.detail.value)
              }} placeholder="Choose a Category">
                    {
            category?.map((e)=>{
              return <IonSelectOption key={e.id} value = {e.name} >
                {e.name}
              </IonSelectOption>
            })
          }
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
                <IonItem >
                  <IonSelect disabled="true" interface="action-sheet" placeholder="Level" onIonChange={(e)=>{
                    setLevel(e.detail.value)
                  }}
                  >
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
              <IonButton onClick={()=>handdleClick()
              } color={"success"} >
                <h1 color='dark' style={{
                  margin: "50px",
                  color: "#000"
                }} >{spinner?<IonSpinner/>:"Start"}</h1>
              </IonButton>
            </div>
          </div>
        </div>
        {/* <IonApp> */}

      </IonApp>
    </IonPage>
  )
}

export default PracticeHome