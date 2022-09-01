import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonText, IonImg } from '@ionic/react'
import React,{useState} from 'react';
import {app} from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import LoginAnim from "../components/Images/loginGIF.gif";
import logoGoogle from "../components/Images/logo-google.svg"
import Back from "../components/Images/chevron-back-outline.svg"
function Login({history}) {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [cPass,setCPass] = useState("")
    const auth = getAuth();
    const provider = new GoogleAuthProvider()
    const onSignin = () =>{
        createUserWithEmailAndPassword(auth, email, pass).then(()=>{
            alert("Done Succesfully")
        }).catch((e)=>{
            alert(e.message)
        })
    }
    const onGoogleSignup = () =>{
signInWithPopup(auth,provider).then((e)=>{
    console.log(e)
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
                    fontFamily: "sans-serif",
                    // marginTop:"-5px"
                }} ><IonIcon  src={Back} onClick={()=>{
                    history.go(-1)
                }} alt="Logo" style={{
                    // paddingTop:"4rem"
                    display:"inline-block"
                }} />Signup</h1>
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
                        Great To See You Champ!
                        <br />
                        Why Dont you Create an Account
                    </h4>
                </IonText>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop:"-1rem"
            }} >
                <IonButton onClick={()=>{
                    onGoogleSignup()
                }} size='large' fill='outline' color={"medium"} >
                    <h3 style={{ marginRight: "5px" }} >Signup with </h3>
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
                <IonInput onIonChange={(e)=> setEmail(e.target.value)} style={{
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
                <IonInput onIonChange={(e)=>
                    setPass(e.target.value)} style={{
                    border: "3px solid #818181",
                    borderRadius: "1.2rem",
                    padding: "1rem",
                }} type="password" placeholder="Do*@****" />
                <IonLabel>
                    <h2 style={{
                        fontWeight: "bold",
                        margin: "5%"
                    }} >Confirm Password</h2>
                </IonLabel>
                <IonInput onIonChange={(e)=>
                    setCPass(e.target.value)}  style={{
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
                    if(cPass !== pass ){
                        alert("Password Does not Match ")
                    }else{
                        onSignin()
                    }
                }} color={"tertiary"} size='large' >
                    <h1 style={{
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        padding: "6rem",
                    }} >Signup</h1>
                </IonButton>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",

            }} >
                <h6 style={{
                    fontWeight: "lighter",
                }} >
                    Already have an account?
                    <span style={{
                        fontWeight: "bold",
                        padding: "5px"
                    }} onClick={()=>{
                        history.push('/login');
                    }} >
                        Login
                    </span>
                </h6>
            </div>
        </IonContent>
    )
}

export default Login