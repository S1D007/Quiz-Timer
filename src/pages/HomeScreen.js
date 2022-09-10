import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonList, IonMenu, IonMenuToggle, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import coin from "../components/Images/coin.png"
import { menu } from "ionicons/icons"
import { person } from "ionicons/icons"

function HomeScreen({history}) {
  const [numb,setNumber] = useState(1)
  return (
    
    <IonPage style={{
      backgroundColor: "#0D1117",
      color: "white"
    }} >
      <IonApp fullscreen={true} style={{
        backgroundColor: "#0D1117",
        color: "white"
        // height:"100vh"
      }} >
        <div style={{
          background: " linear-gradient(to right, #b993d6, #8ca6db)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          width: "150px",
          height: "60px",
          color: "#000",
          margin: "0 auto",
          // padding:"1%",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          }} >100</span>
        </div>
        <div style={{
          // display: "flex",
          position: "relative",
          // bottom:"500",
          left: 20
        }} >
          <IonIcon onClick={()=>alert("Hello World")} size='large' color='#fff' icon={menu} >
          </IonIcon>
          <IonMenu contentId='home' side='start' >

          </IonMenu>
        </div>
        <div style={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center"
          textAlign: "center",
          marginTop: "-10px"
        }} >
          <h1 style={{
            fontSize: "3rem"
          }} >Good Evening</h1>
          <h2 style={{
            marginTop: "-10px",
            fontFamily: "monospace",
            fontSize: "2rem"
          }} >Siddhant</h2>
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
              marginTop: "-20px",
              padding: "50px"
            }} >
              <IonList>
                <IonItem>
                  <IonSelect interface="action-sheet" placeholder="Choose a Category">
                    <IonSelectOption value="apples">Apples</IonSelectOption>
                    <IonSelectOption value="oranges">Oranges</IonSelectOption>
                    <IonSelectOption value="bananas">Bananas</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            </div>
            <div style={{
              padding:"50px",
              marginTop:"-20px"
            }} >
            <IonList>
                <IonItem>
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
              padding:"80px",
              marginTop:"-60px"
            }} >
            
            {/* <h1>Numbers of Questions</h1> */}
              <IonButton disabled={numb===1?true:false} onClick={(e)=>setNumber(numb-1)} color="danger" >-</IonButton>
              <IonInput type='number' style={{
                marginTop:"-15px"
              }} value={numb} disabled={true} color="dark" />
              <IonButton disabled={numb===10?true:false} onClick={(e)=>setNumber(numb+1)} 
              color="success" >+</IonButton>
            </div>
            <div style={{
           marginTop:"-80px",
           display:"flex",
           justifyContent:"center",
          }} >
            <IonButton onClick={()=> history.push("/quizScreen")} color={"dark"} >
                <h1 color='light' style={{
                  margin:"50px",
                  color:"#fff"
                }} >Start</h1>
            </IonButton>
          </div>
          </div>
        </div>
        
      </IonApp>
    </IonPage>
  )
}

export default HomeScreen