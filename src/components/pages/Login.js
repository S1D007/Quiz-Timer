import { IonButton,IonInput,IonLabel, IonText, IonImg, IonPage, useIonLoading } from '@ionic/react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Storage } from "@ionic/storage"
import {app, db} from "../../config/firebase"

import React, { useEffect, useLayoutEffect, useState } from 'react';
import Welcome from "../Images/welcome.gif"
import { collection, onSnapshot, query, where } from 'firebase/firestore';

function Login({ history }) {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [present, dismiss] = useIonLoading();
    const auth = getAuth();
    const storage = new Storage();
    storage.create();
    const onLogin = () => {
        !email && !pass?alert("Enter Your Credientials"):
        present({
            message: 'Loading...',
            duration: 1000,
            spinner: 'circles'
          })
        signInWithEmailAndPassword(auth, email, pass).then(() => {
            localStorage.setItem("emailOfUser",email)
            localStorage.setItem("practice",false)
            storage.set("login",true)
            storage.set("email",email)
            history.replace("/home");
        }).catch((e) => {
            alert(e.message)
        })
    }
    const store = async()=>{
        const check = await storage.get("login");
        if (check) {
            history.push("/home")
        }
    }
    useLayoutEffect(()=>{
        store()
    },[])  
    useEffect(()=>{
        const user = collection(db, "users")
        const q = query(user, where("email", "==", email))
        onSnapshot(q, (doc) => {
            localStorage.setItem("id",doc.docs[0].id)
  });
    },[email])  
    return (
        <IonPage style={{
            backgroundColor: "#0D1117",

        }} >
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "3vw",
            }} >

                <IonImg style={{
                }} src={Welcome} />
            </div>
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
                            textAlign: "center",
                            marginBottom:"5vw"
                        }
                    } >
                        <br />
                        Login your Credientials
                        <br />
                        It helps us to Recogonise you
                    </h4>
                </IonText>
            </div>
            <div style={{
            }} >
                <div style={{
                    margin: "5%",
                }} >
                    <IonLabel >
                        <h2 style={{
                            fontWeight: "bold",
                            margin: "5%",
                            color:"white",
                            fontSize:"1.2rem"
                        }} >Email</h2>
                    </IonLabel>
                    <IonInput  value={email} onIonChange={(e) => {
                        setEmail(e.target.value)
                    }} style={{
                        border: "3px solid #818181",
                        borderRadius: "1.2rem",
                        marginBottom: "1.8rem",
                        padding: "1rem",
                        color: "white",
                        fontSize:"1rem"

                    }} type="text" placeholder="foo@bar.com" />
                    <IonLabel>
                        <h2 style={{
                            fontWeight: "bold",
                            margin: "5%",
                            color: "white",
                            fontSize:"1.2rem"
                        }} >Password</h2>
                    </IonLabel>
                    <IonInput value={pass} onIonChange={(e) => {
                        setPass(e.target.value)
                    }} style={{
                        border: "3px solid #818181",
                        borderRadius: "1.2rem",
                        padding: "1rem",
                        color: "white",
                        fontSize:"1rem"
                    }} type="password" placeholder="Do*@****" />
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} >
                <IonButton onClick={() => {
                    onLogin()
                }} color={"tertiary"} size='large' >
                    <h1 style={{
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        padding: "6rem",
                    }} >Login</h1>
                </IonButton>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5pt"
            }} >
                <h6 style={{
                    fontWeight: "lighter",
                    color: "white"

                }} >
                    Dont have an account?
                    <span style={{
                        fontWeight: "bold",
                        padding: "5px",
                        color: "white"
                    }} onClick={() => {
                        history.replace('/signup');
                        
                    }} >
                        Signup
                    </span>
                </h6>
            </div>
        </IonPage>
    )
}

export default Login