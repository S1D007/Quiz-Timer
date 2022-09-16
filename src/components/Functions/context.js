import React, { useEffect, useLayoutEffect, useState } from "react";
import { app, db } from "../../config/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Storage } from "@ionic/storage"
import { getDocs, doc, collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { IonSpinner } from "@ionic/react";
const EmailContext = React.createContext()
const UserContext = React.createContext()
const EmailProvider = ({ children }) => {
  const [email, setEmail] = React.useState("")
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setEmail(user?.email)
  })
  return <EmailContext.Provider value={email} >
    {children}
  </EmailContext.Provider>

}
const storage = new Storage();
storage.create();
const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("abc@gmaill.com")
  const [phone, setPhone] = useState("");
  const [cattegories, setCattegories] = useState("")
  const [coins, setCoins] = useState(<IonSpinner  />)
  const [id, setID] = useState()
  const user = collection(db, "users")
  // getData()
  const getData = async () => {
    const data = await storage.get("email");
    setEmail(data);
  }
  useEffect(()=>{
  getData()
  const q = query(user, where("email", "==", email))
  onSnapshot(q, (doc) => {
    doc.docs.map((e) => {
      setName(e.data().name)
      setCoins(e.data().coin)
      setCattegories(e.data().cattegories)
      setName(e.data().name)
      setPhone(e.data().phone)
      setID(e.id)
    });
  });
  // setCattegories()
},[])
localStorage.setItem("id",id)
  return <UserContext.Provider value={{ name: name, phone: phone, coins: coins, cattegories: cattegories, email: email }} >
    {children}
  </UserContext.Provider>

}

export { EmailContext, EmailProvider, UserContext, UserProvider }