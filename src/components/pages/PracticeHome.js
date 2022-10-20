import { IonApp, IonButton,  IonImg, IonInput, IonItem, IonList,  IonPage,  IonSelect, IonSelectOption, useIonAlert, useIonRouter, IonSpinner, IonIcon, IonText } from '@ionic/react'
import { App } from '@capacitor/app';
import React, {  useCallback, useEffect, useState } from 'react'
import coin from "../Images/coin.png"
import axios from "axios"
import {category} from  "../category.js"
import { arrowBack } from 'ionicons/icons';
function PracticeHome({ history }) {
  const [spinner,setSpinner] = useState(false)
  const [numb, setNumber] = useState(1)
  const [loading,setLoading] = useState(true)
  const [currCategory,setCurrCategory] = useState('')
  const [presentAlert] = useIonAlert();
  const ionRouter = useIonRouter();
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
                history.go(-1)
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

  useEffect(()=>{
    const url = `http://backquery.online:1111/get-questions?limit=10`
    axios.get(url).then((e)=>{
      console.log(e)
    })
  },[]) 

  const handdleClick = () =>{
    setSpinner(true)
    setLoading(true)
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
  const coins = localStorage.getItem('coins')
const conditionalLoading = useCallback(() =>{
  if(!loading){
    history.push("/practiceQuiz")
    localStorage.setItem("coins",coins-5)
  }
},[loading,history,coins])

conditionalLoading()

const minus = useCallback((e) => setNumber(numb - 1),[numb])
const plus = useCallback((e) => setNumber(numb + 1),[numb])
const setCategory = useCallback((e)=>{
  setCurrCategory(e.detail.value)
},[])

  localStorage.setItem("queNumber", numb)
  
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
 <IonText>

<h1 style={{
    fontWeight: "bold",
    margin: "5%",
    fontSize: "2rem",
    fontFamily: "sans-serif",
    color: "white"

}} ><IonIcon src={arrowBack}  onClick={() => {
    history.go(-1)
}} alt="Logo" style={{
    display: "inline-block",
    color: "white"
}} /></h1>
</IonText>
        
        <div style={{
          background: " linear-gradient(to right, #b993d6, #8ca6db)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          width: "150px",
          height: "60px",
          color: "#000",
          margin: "0 auto",
          // padding:"1%",
          borderRadius: "20px",
          // marginTop: "4?0px",
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
                  <IonSelect interface="action-sheet" onIonChange={setCategory} placeholder="Choose a Category">
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
                  <IonSelect disabled="true" interface="action-sheet" placeholder="Level" 
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
              <IonButton disabled={numb === 1 ? true : false} onClick={minus} color="danger" >-</IonButton>
              <IonInput type='number' style={{
                marginTop: "-15px"
              }} value={numb} disabled={true} color="dark" />
              <IonButton disabled={numb === 10 ? true : false} onClick={plus}
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