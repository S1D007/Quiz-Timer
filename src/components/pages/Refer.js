import { IonApp, IonImg, IonPage } from '@ionic/react'
import React from 'react'
import share from "../Images/share.gif"
import sharebtn from "../Images/sharebtn.gif"
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';

function Refer() {
    const name = localStorage.getItem("Name")
    const email = localStorage.getItem("emailOfUser")
    const code = btoa(email)
    const shortCode = code.slice(0, 15)
    console.log(shortCode)
    console.log(code)
    const handleClickShare = async () => {
        await Share.share({
            title: `Quiz Timer`,
            text: `${name} is Inviting You to Install Quiz Timer Refer Code: ${code}`,
            dialogTitle: 'Share with buddies',
        });
    }
    return (
        <IonPage style={{
            backgroundColor: "#fff",
            color: "#000"
        }}>
            <IonApp>
                <div>
                    <div style={{
                        textAlign: "center"
                    }} >
                        <h1 style={{
                            fontSize: "40px",
                            padding: "10px",
                            fontFamily: "monospace"
                        }} >Heyy! {name}</h1>
                        <h3 style={{
                            fontFamily: "sans-serif",
                            padding: "10px",
                            marginTop: "-20px"
                        }} >Share Quiz Timer and Earn Coins</h3>
                    </div>
                    <div>
                        <IonImg style={{
                            marginTop: "-10px",
                        }} src={share}></IonImg>
                    </div>
                    <p style={{
                        textAlign: "center",
                        fontFamily: "monospace",
                        marginTop: "-20px",
                        marginBottom: "-0.2px",
                        // backgroundColor:"#000"
                    }}  >Copy To Clipboard</p>
                    <div onClick={async () => {
                        await Clipboard.write({
                            string: code,
                            label:"Copied"
                        })
                        alert("Copied to clipboard")
                    }} style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>

                        <div style={{
                            boxShadow: " rgba(125,103,207,0.4) 5px 5px, rgb(125,103,207,0.5) 10px 10px",
                            padding: "15px",
                            border: "3px solid #0d0d0d",
                            borderRadius: "15px"
                        }} >
                            {shortCode}...
                        </div>
                    </div>
                    <div style={{
                        border: "3px solid rgba(125,103,207,0.4)",
                        marginTop: "30px",
                        margin: "10px",
                        borderRadius: "50px",
                        padding: "10px",
                        display: "inline-block",
                        float: "right"
                    }} >
                        <IonImg onClick={handleClickShare} style={{
                            width: "40px",
                            display: "inline-block"
                        }} src={sharebtn} ></IonImg>
                    </div>
                </div>
            </IonApp>
        </IonPage>
    )
}

export default Refer