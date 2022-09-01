import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonText, IonImg } from '@ionic/react'
import {Redirect} from 'react-router-dom';
import {app} from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Storage} from "@ionic/storage"
import React,{useState} from 'react';
// import LoginAnim from "../components/Images/loginGIF.gif";
import logoGoogle from "../components/Images/logo-google.svg"
const store = new Storage();

function Login({history}) {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const auth = getAuth();
    const onLogin = () =>{
        signInWithEmailAndPassword(auth, email, pass).then(()=>{
            alert("Done Succesfully")
        }).catch((e)=>{
            alert(e.message)
        })
    }
    return (
        <IonContent style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }} >
       
            <IonText>
                <h1 style={{
                    fontWeight: "bold",
                    margin: "5%",
                    fontSize: "2rem",
                    fontFamily: "arial"
                }} >Login</h1>
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
                            fontSize: "1rem",
                            marginBottom: "2rem",
                            textAlign: "center"
                        }
                    } >
                        Welcome Back Hero!
                        <br />
                        Please Enter your Credientials
                    </h4>
                </IonText>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} >
                <IonButton size='large' fill='outline' color={"medium"} >
                    <h3 style={{ marginRight: "5px" }} >Login with </h3>
                    <IonIcon src={logoGoogle}></IonIcon>
                </IonButton>
            </div>
            <div style={{
            }} >
            <div style={{
                margin: "5%",
                maxWidth:"1000px",
            }} >
                <IonLabel >
                    <h2 style={{
                        fontWeight: "bold",
                        margin: "5%"
                    }} >Email</h2>
                </IonLabel>
                <IonInput  value={email} onIonChange={(e)=>{
                    setEmail(e.target.value)
                }} style={{
                    border: "3px solid #818181",
                    borderRadius: "1.2rem",
                    marginBottom: "1.8rem",
                    padding: "1rem",
                }} type="text" placeholder="foo@bar.com" />
                <IonLabel>
                    <h2 style={{
                        fontWeight: "bold",
                        margin: "5%"
                    }} >Password</h2>
                </IonLabel>
                <IonInput  value={pass} onIonChange={(e)=>{
                    setPass(e.target.value)
                }} style={{
                    border: "3px solid #818181",
                    borderRadius: "1.2rem",
                    padding: "1rem",
                }} type="password" placeholder="Do*@****" />
            </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} >
                <IonButton onClick={()=>{
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

            }} >
                <h6 style={{
                    fontWeight: "lighter",
                }} >
                    Dont have an account?
                    <span style={{
                        fontWeight: "bold",
                        padding: "5px"
                    }} onClick={()=>{
                        history.push('/signup');
                    }} >
                        Signup
                    </span>
                </h6>
            </div>
        </IonContent>
    )
}

export default Login