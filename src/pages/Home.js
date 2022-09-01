import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonImg, IonInput, IonPage, IonSearchbar, IonVirtualScroll } from '@ionic/react'

import React,{useState} from 'react'
import { category } from "./json/category"
function Home() {
  const [selected,setSelected] = useState(false)
  const [color,setColor] = useState("dark");
  return (
    <>
      <IonPage fullscreen scrollEvents={true} style={{
        background: "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)"
      }} >
        {/* Header */}
        <div style={{
          margin:"5%",
          marginTop:"15%"
        }} >
          <IonInput placeholder='Enter your Name' style={{
            border:"3px solid rgba(0,0,0,0.5)",
            borderRadius:"50px",
            padding:"1rem",
            boxShadow:"1px 1px 10px  black",
            background:"rgba(255,255,255,0.7)",
            color:"black"
          }} />
        </div>
        {/* content */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          // left: "10px",
          top: "10rem",

          /* white */

          background: "#FFFFFF",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
        }} >
          <div style={{
            position: "absolute",
            top:"2rem",
            left:"0.2rem",
            
          }} >
            {
              category.map((item, index) => {
                return<IonCard style={{
                  width: " 92vw",
                  height: " 96px",
                  boxShadow: "4px 13px 20px rgba(51, 51, 51, 0.2)",
                  borderRadius: "5px",
                }} >
                  <IonCardHeader style={{
                    position: "absolute",
                    width: "288px",
                    height: "72px",
                    left: "47px",
                  }} >
                    <IonCardContent style={{
                      // marginBottom: "-50px"
                    }} >
                      <IonCardTitle style={{
                        fontWeight: "bold"
                      }}>{item.name}</IonCardTitle>
                      <IonImg style={{
                        position: "absolute",
                        width: "72px",
                        height: "72px",
                        left: "-3.8rem",
                        top: "-0.5rem"
                      }} src={item?.img} />
                    </IonCardContent>
                    <IonButton color={color} onClick={()=>{
                        // onClickHanddler(index)
                    }}  style={{
                      position: "absolute",
                      left: "10rem",
                      top: "1.5rem",
                    }} >
                      <h4>Select</h4>
                    </IonButton>
                  </IonCardHeader>
                </IonCard>
              })
            }
          </div>
        </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',

          }} >
            <IonButton disabled={selected === true?"false":"true"}  color={"tertiary"} >
              <h4>Continue</h4>
            </IonButton>
          </div>
      </IonPage>
    </>
  )
}

export default Home