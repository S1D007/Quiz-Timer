import React from "react";
import {app} from "../../config/firebase" 
import { getAuth, onAuthStateChanged } from "firebase/auth";
const EmailContext = React.createContext()
const UserNameProvider = React.createContext()
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

export  {EmailContext,EmailProvider,UserNameProvider}