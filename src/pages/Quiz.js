import { IonApp, IonButton, IonButtons, IonContent, IonIcon, IonImg, IonPage } from '@ionic/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import coin from "../components/Images/coin.png"
import { alarmOutline } from "ionicons/icons"
function Quiz() {
    const [counter, setCounter] = React.useState(5);
    const counterRef = React.useRef(counter);
    const [bgColor, setBgColor] = useState("white");
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCount) => prevCount - 1);
            counterRef.current--;

            if (counterRef.current === 0) clearInterval(interval);
        }, 1000);
    }, []);

    const xy = ["It is asdsdasdsadasdEasy sdfdssdfdsfdsffto Use", "It is Dsddsfdsfdffdfdfifficult",
        "it is Not so Posdfddspuldfdsfdsfar", "I likedsfdsfsdfdsfdfdsf Python"]
    const qw = [1, 2, 3, 4, 5, 6]
    useEffect(() => {
        switch (counter) {
            case 5:
                setBgColor("#b9ffab");
                break;
            case 4:
                setBgColor("#fcffab");
                break;
            case 3:
                setBgColor("#abffcf");
                break;
            case 2:
                setBgColor("#cdabff");
                break;
            case 1:
                setBgColor("#ffabab");
                break;
            case 0:
                setBgColor("#f54242");
                break;
            default:
                setBgColor("#fff")
        }
    }, [counter])

    return (
        <IonPage style={{
            backgroundColor: "#0D1117",
        }} >
            <IonApp style={{
                backgroundColor: "#0D1117",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "30px"
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
                    <div style={{
                        // position: "absolute",
                        width: "102px",
                        height: "34px",
                        left: "137px",
                        top: "50px",
                        borderRadius: "10px",
                        // padding:"10px",
                        // paddingLeft: "50px",
                        // paddingRight: "50px",
                        color: `black`,
                        backgroundColor: `${bgColor}`,
                        // paddingTop:"20px",
                        // paddingBottom:"10px"
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }} >
                        <IonIcon size='large' icon={alarmOutline} />
                        <h1 style={{
                            // position: "absolute",
                            // left: "176.67px",
                            // top: "53px",
                            fontFamily: "monospace",
                            fontWeight: "400",
                            fontSize: "30px",
                            marginBottom: "18px",
                            marginLeft: "20px"
                            // lineHeight: "16px",

                        }} > {counter}</h1>

                    </div>
                </div>

                <div style={{
                    width: "100%",
                    height: "85vh",
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 0,
                    borderTopLeftRadius: "50px",
                    borderTopRightRadius: "50px",
                    color: "black"
                }} >
                    <div style={{
                        padding: "150px",
                        marginTop: "-140px"
                    }} >
                        <hr color='#0D1117' style={{
                            fontSize: "5px",
                            padding: "2px",
                            borderRadius: "50px"
                        }} />
                    </div>
                    
                        <div style={{ display: "flex", justifyContent: "space-evenly",alignContent: "center",margin:"40px",marginTop:"-150px" }} >
                            {
                                qw.map((e) => {
                                    return <div style={{
                                        color:"rgba(0,0,0,0.7)"
                                    }} >
                                    <h3 style={{
                                        background: "#D4D4D4",
                                        paddingLeft:"10px",
                                        paddingRight:"10px",
                                        paddingTop:"2.5px",
                                        paddingBottom:"2.5px",
                                        borderRadius: "50px",
                                        backgroundColor:e !== 1? "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%);":"lightblue",
                                        
                                    }} >{e}</h3>
                                    </div>
                                })
                            }
                    </div>
                    <div style={{
                        margin:"5%"
                    }} >
                        <h4 style={{
                            fontWeight:"bold"
                        }} >Why Javascript is So Popular ?</h4>
                        <div style={{
                            display:"table-row",
                            justifyContent:"space-between",
                        }} >
                            {xy.map((e,i)=>{
                                return <div style={{
                                    display:"inline-flex"
                                }} >
                                <div style={{
                                    marginRight:"10px"
                                }} >
                                <h4 style={{
                                        background: "#D4D4D4",
                                        paddingLeft:"10px",
                                        paddingRight:"10px",
                                        paddingTop:"5px",
                                        paddingBottom:"2.5px",
                                        borderRadius: "50px",
                                        backgroundColor:e !== 1? "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%);":"lightblue",
                                    }} >{i+1}</h4>
                                </div>
                                    <div style={{
                                        display:"flex",
                                        justifyContent:"flex-start",
                                        alignContent:"center",
                                        alignItems:"center"
                                    }} >
                                    <h4 style={{
                                        fontFamily:"Roboto"
                                    }} >{e}</h4>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </IonApp>
        </IonPage>
    )
}

export default Quiz