import { IonIcon, IonInput, IonItem, IonPage, IonText, IonList, IonSelect, IonSelectOption, IonButton, IonImg, IonApp, IonSpinner } from '@ionic/react';
import { call, man, mail, share } from "ionicons/icons"
import React, { useEffect, useState, } from 'react'
import ProfileImg from "../Images/profile.gif"
import { Storage } from '@ionic/storage';
import { db } from "../../config/firebase"
import { collection, addDoc, Timestamp, onSnapshot, where, query, doc, updateDoc } from 'firebase/firestore'
let category = [
  {
    id: 1,
    name: 'General Knowledge',
  },
  {
    id: 2,
    name: 'Science & Nature',
  },
  {
    id: 3,
    name: 'Science: Computers',
  },
  {
    id: 4,
    name: 'Science: Mathematics',
  },
  {
    id: 5,
    name: 'Mythology',
  },
  {
    id: 6,
    name: 'Sports',
  },
  {
    id: 7,
    name: 'Geography',
  },
  {
    id: 8,
    name: 'History',
  },
  {
    id: 9,
    name: 'Politics',
  },
  {
    id: 10,
    name: 'Animals',
  },
  {
    id: 11,
    name: 'Vehicles',
  },
  {
    id: 12,
    name: 'Entertainment: Comics',
  },
  {
    id: 13,
    name: 'Science: Gadgets',
  },
  {
    id: 14,
    name: 'Entertainment: Japanese Anime & Manga',
  },
  {
    id: 15,
    name: 'Entertainment: Cartoon & Animations',
  },
];

localStorage.setItem("categories", JSON.stringify(category))

const compareWith = (o1, o2) => {
  if (!o1 || !o2) {
    return o1 === o2;
  }

  if (Array.isArray(o2)) {
    return o2.some((o) => o.id === o1.id);
  }

  return o1.id === o2.id;
};
const Profile = ({ history }) => {
  const [currentCategory, setCurrentCategory] = useState([]);
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState("")
  const [referCoin, setReferCoin] = useState(0)
  const [referID, setReferID] = useState("")
  const [load, setLoad] = useState(false)
  const [name, setName] = useState(null)
  localStorage.setItem("name", name)
  localStorage.setItem("phone", phone)
  const email = localStorage.getItem("emailOfUser")

  // console.log(emailOfRefer)
useEffect(()=>{
  if(code){
    const emailOfRefer = atob(code)
    const user = collection(db, "users")
    const qE = query(user, where("email", "==", emailOfRefer))
    onSnapshot(qE, (doc) => {
      //  setReferID(doc.docs.id)
      setReferID(doc.docs[0].id)
      setReferCoin(doc.docs[0].data().coin)
    })
  }
})
console.log(referCoin,referID)
  const id = localStorage.getItem("id")
  // console.log(referID,referCoin)
  const onClickHanddler = async () => {
    setLoad(true)
    if (code) {
      const emailOfRefer = atob(code)
      const userRef = doc(db, "users", id)
      await updateDoc(userRef, {
        coin: 150
      })
      fetch(`http://backquery.online:1111/coin-history?coins=50&lastBalance=${100}&email=${email}`).then((e) => {
        console.log("Done")
      })
      const docRef = doc(db, "users", referID)
      console.log(docRef)
      fetch(`http://backquery.online:1111/coin-history?coins=50&lastBalance=${referCoin}&email=${emailOfRefer}`).then((e) => {
      console.log("Done")
    })
      await updateDoc(docRef, {
        coin: referCoin + 50
      })
      
    }
    
    try {
      await addDoc(collection(db, 'users'), {
        categories: currentCategory,
        email: email,
        phone: phone,
        name: name,
        coin: 100,
        refer: code !== "" ? true : false,
        created: Timestamp.now()
      })


    } catch (err) {
      alert(err)
    }

    history.replace("/login")
  }
  useEffect(() => {
    const user = collection(db, "users")
    const q = query(user, where("email", "==", email))
    onSnapshot(q, (doc) => {
      localStorage.setItem("id", doc.docs[0].id)
    });
  }, [email])

  return (
    <IonPage class='profile' style={{
      backgroundColor: "#fff",
      padding: "5%",
      color: "black"
    }} >
      <IonApp class='profile' style={{
        backgroundColor: "#fff",
        padding: "5%",
        color: "black"
      }}  >
        <div  >
          <div >
            <IonText style={{
            }} color={"#fff"} >
              <h1 style={{
                textAlign: "center",
                fontSize: "3rem",
                fontFamily: "sans-serif",
                fontWeight: "bold"
              }}  >Profile</h1>
            </IonText>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
          }} >
            <IonImg style={{
              width: "40vw"
            }} src={ProfileImg} />

          </div>
          <div>
            <IonInput value={name} onIonChange={(e) => setName(e.target.value)} style={{
              border: "2px solid #2f2f2f",
              color: "black",
              padding: "1rem",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              marginBottom: "20px",
              marginTop: "40px",
              boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
            }} type="text" placeholder="Whats Your Name?" >
              <IonItem slot='start' style={{
                backgroundColor: "#0D1117"
              }} position='floating' >
                <IonIcon icon={man} />
              </IonItem>
            </IonInput>

            <IonInput value={phone} onIonChange={(e) => setPhone(e.target.value)} style={{
              border: "2px solid #2f2f2f",
              color: "black",
              padding: "1rem",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
            }} type="number" placeholder="Enter Your 10 Digit Phone Number" >
              <IonItem slot='start' style={{
                backgroundColor: "#fff"
              }} position='floating' >
                <IonIcon icon={call} />
              </IonItem>
            </IonInput>
          </div>
          <div>
            <IonInput style={{
              border: "2px solid #2f2f2f",
              color: "black",
              padding: "1rem",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              marginTop: "20px",
              boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
            }} type="text" disabled={true} value={email} >
              <IonItem slot='start' style={{
                backgroundColor: "#0D1117"
              }} position='floating' >
                <IonIcon icon={mail} />
              </IonItem>
            </IonInput>
          </div>
          <div>
            <IonInput style={{
              border: "2px solid #2f2f2f",
              color: "black",
              padding: "1rem",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              marginTop: "20px",
              boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
            }} type="text" onIonChange={(e) => setCode(e.detail.value)} placeholder="Refer Code" value={code} >
              <IonItem slot='start' style={{
                backgroundColor: "#0D1117"
              }} position='floating' >
                <IonIcon icon={share} />
              </IonItem>
            </IonInput>
          </div>
          <div style={{
            marginTop: "5vw",
            marginBottom: "5vw"
          }} >
            <h2 style={{
              fontFamily: "monospace",
              fontSize: "2rem",
              textAlign: "center",
            }} >
              Choose Category
            </h2>
            <IonList style={{
              border: "2px solid black",
              borderRadius: "50px",
            }} >
              <IonItem
                style={{
                  borderRadius: "50px",
                }} class='ionItem' >
                <IonSelect style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }} compareWith={compareWith} onIonChange={(ev) => {
                  setCurrentCategory(ev.detail.value)
                }}
                  placeholder="Select the Multiple Category" multiple={true}>
                  {category.map((e) => (
                    <IonSelectOption key={e.id} value={e}>
                      {e.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center",
        }} >
          <IonButton onClick={() => {
            onClickHanddler()
          }} style={{
            position: "fixed",
            bottom: "0",
          }} color={"success"} >
            <h1 color='dark' style={{
              margin: "5%",
              padding: "50px"
            }} >{load?<IonSpinner/>:"Let's Go"}</h1>
          </IonButton>
        </div>
      </IonApp>
    </IonPage>
  )
}

export default Profile