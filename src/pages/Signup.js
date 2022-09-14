import { IonButton, IonIcon, IonInput, IonLabel, IonText, IonPage, useIonLoading } from '@ionic/react'
import React, { useLayoutEffect, useState,createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, } from "firebase/auth";
// import LoginAnim from "../components/Images/loginGIF.gif";
import Back from "../components/Images/chevron-back-outline.svg"
import { Storage } from '@ionic/storage';

export const EmailContext = createContext()
function Login({ history }) {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [cPass, setCPass] = useState("")
    const [present, dismiss] = useIonLoading();
    const auth = getAuth();
    const storage = new Storage();
    storage.create();
    const onSignin = () => {
        !email&&!pass&&!cPass?alert("Feilds are Required!"):
        present({
            message: 'Loading...',
            duration: 1000,
            spinner: 'circles'
          })
        createUserWithEmailAndPassword(auth, email, pass).then(() => {
            storage.set("signup",true)
            storage.set("email",email)
            history.replace("/profile")
        }).catch((e) => {
            alert(e.message)
        })
    }
    const store = async()=>{
        const check = await storage.get("signup");
        if (check) {
            history.push("/profile")
        }
    }
    useLayoutEffect(()=>{
        store()
    },[])
    return (
        <IonPage style={{
            backgroundColor: "#0D1117",
            color:"white"
        }} >
            <IonText>

                <h1 style={{
                    fontWeight: "bold",
                    margin: "5%",
                    fontSize: "2rem",
                    fontFamily: "sans-serif",
                    color:"white"
                }} ><IonIcon src={Back} onClick={() => {
                    history.go(-1)
                }} alt="Logo" style={{
                    display: "inline-block",
                    color:"white"
                }} /></h1>
            </IonText>
            
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} >
                <IonText>
                    <h4 style={
                        {
                            fontWeight: "lighter",
                            color: "#818181",
                            fontFamily: "monospace",
                            fontSize: "1.2rem",
                            marginBottom: "2rem",
                            textAlign: "center"
                        }
                    } >
                        Great To See You Champ!
                        <br />
                        Why Dont you Create an Account?
                    </h4>
                </IonText>
            </div>
            
            <div style={{
            }} >
                <div style={{
                    margin: "5%",
                    maxWidth: "1000px",
                }} >
                    <IonLabel >
                        <h2 style={{
                            fontWeight: "bold",
                            margin: "5%",
                            color:"white",
                            fontSize:"1.2rem"
                        }} >Email</h2>
                    </IonLabel>
                    <EmailContext.Provider value={email}>
                    <IonInput onIonChange={(e) => setEmail(e.target.value)} style={{
                        border: "3px solid #818181",
                        borderRadius: "1.2rem",
                        marginBottom: "1.8rem",
                        padding: "1rem",
                        color:"white",
                        fontSize:"1rem"

                    }} type="text" placeholder="foo@bar.com" />
                    </EmailContext.Provider>
                    <IonLabel>
                        <h2 style={{
                            fontWeight: "bold",
                            margin: "5%",
                            color:"white",
                            fontSize:"1.2rem"

                        }} >Password</h2>
                    </IonLabel>
                    <IonInput onIonChange={(e) =>
                        setPass(e.target.value)} style={{
                            border: "3px solid #818181",
                            borderRadius: "1.2rem",
                            padding: "1rem",
                            color:"white",
                            fontSize:"1rem"
                        }} type="password" placeholder="Do*@****" />
                    <IonLabel>
                        <h2 style={{
                            fontWeight: "bold",
                            margin: "5%",
                            fontSize:"1.2rem"
                        }} >Confirm Password</h2>
                    </IonLabel>
                    <IonInput onIonChange={(e) =>
                        setCPass(e.target.value)} style={{
                            border: "3px solid #818181",
                            borderRadius: "1.2rem",
                            padding: "1rem",
                            color:"white",
                            fontSize:"1rem"
                        }} type="password" placeholder="Do*@****" />
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color:"white"
            }} >
                <IonButton onClick={() => {
                    if (cPass !== pass) {
                        alert("Password Does not Match ")
                    } else {
                        onSignin()
                    }
                }} color={"tertiary"} size='large' >
                    <h1 style={{
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        padding: "6rem",
                        color:"white"
                    }} >Signup</h1>
                </IonButton>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5pt"

            }} >
                <h6 style={{
                    fontWeight: "lighter",
                    color:"white"
                }} >
                    Already have an account?
                    <span style={{
                          fontWeight: "bold",
                        padding: "5px",
                        color: "white"
                    }} onClick={() => {
                        history.push("/login")
                    }} >
                        Login
                    </span>
                </h6>
            </div>
        </IonPage>
    )
}

export default Login