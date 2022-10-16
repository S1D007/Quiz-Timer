import { IonApp, IonContent, IonIcon, IonImg, IonPage, IonSpinner, IonText } from '@ionic/react'
import coin from "../Images/coin.png"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Back from "../Images/chevron-back-outline.svg"
function CoinsPage({history}) {
    const [data,setData] = useState([])
    const [spin,setSpin] = useState(true)
    const coins = localStorage.getItem('coins')
    useEffect(()=>{
        const email = localStorage.getItem("emailOfUser")
        const url = `http://backquery.online:1111/coin-history-get?email=${email}`
        axios.get(url).then((e)=>{
            console.log(e.data.data)
            setSpin(false)
            const dat = e.data.data.reverse()
            setData(dat)  
        })
    },[])
    console.log(data)
    return (
        <IonPage
        style={{
        backgroundColor: "#0D1117",
        color: "white"
      }}>
            <IonApp  fullscreen={true} style={{
        backgroundColor: "#0D1117",
        color: "white"
            }}  >
                <div>
                    <div>
                    <IonText>

          <h1 style={{
            fontWeight: "bold",
            margin: "5%",
            fontSize: "2rem",
            fontFamily: "sans-serif",
            color: "white"
          }} ><IonIcon src={Back} onClick={() => {
            history.replace("/home")
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
                            marginTop: "20px",
                            // borderBottomRightRadius: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            top: "-10px",
                            zIndex: -1
                        }} >
                            <IonImg style={{
                                width: "60px",
                                marginLeft: "10px"
                                // display:"inline-block",
                            }} src={coin} />
                            <span style={{
                                // marginTop:"50px",
                                marginRight: "15px",
                                color: "#fff",
                                fontSize: "1.6rem",
                                fontWeight: "bold",
                                fontFamily: "monospace",
                            }} >{coins}</span>
                        </div>
                        <div style={{
                            background: "#fff",
                            height: "100vh",
                            width: "100%",
                            borderTopLeftRadius: "50px",
                            borderTopRightRadius: "50px",
                            color: "#0d0d0d",
                            padding: "3%",

                        }} >
                        {spin === true?<IonSpinner color={"dark"}/>:""}
                            {
                               data?.map(({coins,lastBalance})=>{
                                    return <div style={{
                                width: "100%",
                                height: "80px",
                                borderRadius: "20px",
                                background: 'linear-gradient(to right, #eb3349, #f45c43)',
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                marginTop:"15px"
                            }} >
                                <div>
                                    <h1 style={{
                                        fontSize: "35px",
                                        fontFamily: "monospace",
                                        fontWeight: "bold",
                                        background: "#fff",
                                        borderRadius: "20px",
                                        margin: "8px",
                                        padding: "12px"
                                    }} >{coins}</h1>
                                </div>
                                <div style={{
                                    display: "block"
                                }} >
                                    <h4 style={{
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>Last Balance: {lastBalance}</h4>
                                </div>
                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </IonApp>
        </IonPage>
    )
}

export default CoinsPage