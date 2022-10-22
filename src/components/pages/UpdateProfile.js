import { IonButton, IonInput, IonLabel, IonText, IonPage, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonApp, IonChip } from '@ionic/react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, updatePassword } from "firebase/auth";
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import Back from "../Images/chevron-back-outline.svg"
function UpdateProfile({ history }) {
  const [userInfo, setUserInfo] = useState({
    name: null,
    phone: null
  })

  const [placeholderInfo, setPlaceholderInfo] = useState({
    name: "",
    phone: ""
  })

  const [password, setPassword] = useState([])

  const [categoryFromFirebase,setCategoryFromFirebase] = useState([])
  const id = localStorage.getItem("id")
  const docRef = doc(db, "users", id)
  useEffect(() => {
    const docRefe = doc(db, "users", id)
    getDoc(docRefe).then((e) => {
      setPlaceholderInfo({ ...placeholderInfo, name: e.data().name, phone: e.data().phone })
      setCategoryFromFirebase(e.data().categories)
    })
    // console.log("This is UpdateProfile")
  }, [placeholderInfo, id])

  const handleUpdateUser = () => {
    if (userInfo.name && userInfo.phone !== null) {
      updateDoc(docRef, {
        phone: userInfo.phone,
        name: userInfo.name
      })
    } else {
      alert("Please add new Information to Update")
    }
  }

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


  const compareWith = (o1, o2) => {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1.id === o2.id;
  };

  const auth = getAuth();

  const user = auth.currentUser;

// console.log(categoryFromFirebase?.forEach((e)=>{
//   return e.name
// }))


  return (
    <IonPage style={{
      backgroundColor: "#0D1117",
    }}>
      <IonApp style={{
        backgroundColor: "#0D1117",
      }}>
        <IonText>

          <h1 style={{
            fontWeight: "bold",
            margin: "5%",
            fontSize: "2rem",
            fontFamily: "sans-serif",
            color: "white"
          }} ><IonIcon src={Back} onClick={() => {
            history.replace("/home")
          }} alt="Logo" style={{
            display: "inline-block",
            color: "white"
          }} /></h1>
        </IonText>
        <div style={{
          height: "10px"
        }}>
          <h3 style={{
            textAlign: "center",
            fontSize: "20px",
            fontFamily: "sans-serif",
            color: "#fff",
            marginTop: "-45px"
          }} >Edit Profile</h3>

        </div>
        {/* <div style={{
          marginTop:"-20px"
        }} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,160L80,138.7C160,117,320,75,480,90.7C640,107,800,181,960,186.7C1120,192,1280,128,1360,96L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        </div> */}
        <div style={{
          backgroundColor: "#fff",
          height: "100vh",
          marginTop: "-20px",
          color: "#0d0d0d",
          borderRadius:"40px",
          padding:"1%"
        }} >
          <div style={{
            padding:"20px"
          }} >
            <IonLabel>Name</IonLabel>
            <IonInput value={userInfo.name} onIonChange={(e) => {
              setUserInfo(
                { ...userInfo, name: e.target.value }
              )
            }} style={{
              border: "2px solid #A9A9A9",
              width: "90%",
              paddingLeft: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }} placeholder={placeholderInfo.name} />
          </div>
          <div style={{
            paddingLeft: "25px"
          }} >
            <IonLabel>Phone</IonLabel>
            <IonInput placeholder={placeholderInfo.phone} value={userInfo.phone} onIonChange={(e) => {
              setUserInfo(
                { ...userInfo, phone: e.target.value }
              )
            }} type="number" style={{
              border: "2px solid #A9A9A9",
              width: "90%",
              paddingLeft: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }} />
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} >
            <IonButton onClick={() => { handleUpdateUser() }} style={{
              width: '150px'
            }} color={"dark"} ><IonText color={"success"} >Update</IonText></IonButton>
          </div>
          <div style={{
            paddingLeft: "25px"
          }} >
            <IonLabel>Email</IonLabel>
            <IonInput disabled={true} value={localStorage.getItem("emailOfUser")} style={{
              border: "2px solid #A9A9A9",
              width: "90%",
              paddingLeft: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }} />
          </div>
          <div style={{
            paddingLeft: "25px"
          }} >
            <IonLabel>Password</IonLabel>
            <IonInput type={"password"} value={password} onIonChange={(e) => {
              setPassword(e.target.value)
            }} style={{
              border: "2px solid #A9A9A9",
              width: "90%",
              paddingLeft: "10px",
              marginTop: "10px",
              marginBottom: "20px",
              borderRadius: "8px"
            }} />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} >
            <IonButton onClick={() => {
              updatePassword(user,password).then(() => {
                alert("Password Changed Succesfully")
              }).catch((error) => {
                alert(error.message)
              });
            }} style={{
              width: '250px'
            }} color={"dark"} ><IonText color={"primary"} >Update Password</IonText></IonButton>
          </div>
          <div style={{
            margin: "10px",
            marginBottom:"-30px",
            padding: "20px",
            background:"#0d0d0d",
            borderRadius:"40px"
          }} >
          {
            categoryFromFirebase.map((e)=>{
              return <IonChip color={"light"} >
                {e.name}
              </IonChip>
            })
          }
          </div>
          <div style={{
            marginTop: "10px",
            padding: "30px"
          }} >
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
                  updateDoc(docRef, {
                    categories: ev.detail.value,
                  })
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
      </IonApp>
    </IonPage>
  )
}

export default UpdateProfile