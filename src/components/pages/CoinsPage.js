import { IonApp, IonContent, IonIcon, IonImg, IonPage } from '@ionic/react'
import coin from "../Images/coin.png"
import React from 'react'
function CoinsPage() {
    return (
        <IonPage>
            <IonApp>
                <IonContent>
                    <div>
                        <div style={{
                            background: " linear-gradient(to right, #b993d6, #8ca6db)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                            width: "150px",
                            height: "60px",
                            color: "#000",
                            margin: "0 auto",
                            // padding:"1%",
                            borderRadius: "20px",
                            marginTop: "60px",
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
                            }} >40</span>
                        </div>
                        <div style={{
                            background: "#fff",
                            height: "100vh",
                            width: "100%",
                            borderTopLeftRadius: "50px",
                            borderTopRightRadius: "50px",
                            color: "#0d0d0d",
                            padding: "5%",

                        }} >
                            <div style={{
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
                                        fontSize: "50px",
                                        fontFamily: "monospace",
                                        fontWeight: "bold",
                                        background: "#fff",
                                        borderRadius: "20px",
                                        margin: "12px",
                                        padding: "8px"
                                    }} >-60</h1>
                                </div>
                                <div style={{
                                    display: "block"
                                }} >
                                    <h4 style={{
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>Last Balance: 100</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonApp>
        </IonPage>
    )
}

export default CoinsPage