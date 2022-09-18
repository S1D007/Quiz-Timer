import React, { useEffect, useLayoutEffect, useState } from "react";
import { app, db } from "../../config/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Storage } from "@ionic/storage"
import { getDocs, doc, collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { IonSpinner } from "@ionic/react";
import { querystring } from "@firebase/util";
const EmailContext = React.createContext()
const UserContext = React.createContext()
const EmailProvider = ({ children }) => {
  const [email, setEmail] = React.useState("")
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setEmail(user?.email)
    localStorage.setItem("emailOfUser",email)
  })
  return <EmailContext.Provider value={email} >
    {children}
  </EmailContext.Provider>

}
const storage = new Storage();
storage.create();
// const UserProvider = ({ children }) => {
  const UserProvider = ({ children }) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setEmail(user?.email)
    })
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("");
    const [cattegories,setCattegories] = useState("")
    const [coins,setCoins] = useState(<IonSpinner></IonSpinner>)
    const user = collection(db, "users")
    const q = query(user, where("email", "==", email?email:""))
    const getDetailsOfUsers = async()=>{
      const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setName(doc.data().name)
      setPhone(doc.data().phone)
      setCoins(doc.data().coin)
      setCattegories(doc.data().cattegories)
    });
    }
    useEffect(()=>{
      getDetailsOfUsers()
    })
  // setCattegories()
  return <UserContext.Provider value={{ name: name, phone: phone, coins: coins, cattegories: cattegories, email: email }} >
    {children}
  </UserContext.Provider>

}

export { EmailContext, EmailProvider, UserContext, UserProvider }