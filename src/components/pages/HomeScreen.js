import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonPage, IonSelect, IonSelectOption, useIonAlert, IonTitle, IonToolbar, useIonRouter, IonSpinner } from '@ionic/react'
import { App } from '@capacitor/app';
import React, { useCallback, useEffect, useState } from 'react'
import coin from "../Images/coin.png"
import { menu } from "ionicons/icons"
import { person, basketball, list, powerSharp, share } from "ionicons/icons"
import axios from "axios"
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getAuth, signOut } from "firebase/auth";
import { Storage } from '@ionic/storage';
function HomeScreen({ history }) {
  const [spinner, setSpinner] = useState(false)
  const [numb, setNumber] = useState(1)
  const [coinVAl, setCoinVAL] = useState(<IonSpinner />)
  const [cat, setCat] = useState([])
  const [minusCoin, setMinusCoin] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currCategory, setCurrCategory] = useState('')
  const [currLevel, setLevel] = useState()
  const [presentAlert] = useIonAlert();
  const [disabled, setDisabled] = useState(false)
  const ionRouter = useIonRouter();
  const auth = getAuth();
  const storage = new Storage();
  storage.create();
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        presentAlert({
          header: 'Do you really want to Exit ?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                history.push("/home")
              },
            },
            {
              text: 'Yes',
              role: 'confirm',
              handler: () => {
                App.exitApp()
              },
            },
          ],
        })
      }
    });
  });
  const id = localStorage.getItem("id")
  const docRef = doc(db, "users", id)
  const handdleClick = () => {
    setSpinner(true)
    setLoading(true)
    setDisabled(true)
    if (currCategory === "random") {
      const url = `http://backquery.online:1111/get-questions?limit=${numb}`
      try {
        axios.get(url).then(response => {
          localStorage.setItem('question', JSON.stringify(response.data.data))
          console.log(response.data)
          setLoading(false)
        }).catch((e) => {
          alert(e)
        })
      } catch (e) {
        alert(e)
      }
    } else {
      getQuestionsFromBackend()
    }
  }

  if (!loading) {
    history.push("/quizScreen")

    if (currLevel === "Hard") {
      updateDoc(docRef, {
        coin: coinVAl - 15
      })
      localStorage.setItem("coinsForHistory", coinVAl - 15)
    } else if (currLevel === "Medium") {
      updateDoc(docRef, {
        coin: coinVAl - 10
      })
      localStorage.setItem("coinsForHistory", coinVAl - 10)
    } else if (currLevel === "Easy") {
      updateDoc(docRef, {
        coin: coinVAl - 5
      })
      localStorage.setItem("coinsForHistory", coinVAl - 5)
    }
  }
  const getDocumentFromFirebase = useCallback(async () => {
    const docum = doc(db, "users", id)
    const ref = await getDoc(docum)
    setCoinVAL(ref.data().coin)
    setCat(ref.data().categories)
    localStorage.setItem("Name", ref.data().name)
  }, [id])
  useEffect(() => {
    getDocumentFromFirebase()
  }, [])
  const getQuestionsFromBackend = () => {
    const email = localStorage.getItem("emailOfUser")
    const url = `http://backquery.online:1111/get-question-with-params?category=${currCategory}&level=${currLevel.toLowerCase()}&limit=${numb}&email=${email}`
    try {
      axios.get(url).then(response => {
        localStorage.setItem('question', JSON.stringify(response.data))
        console.log(response.data)
        setLoading(false)
      }).catch((e) => {
        alert(e)
      })
    } catch (e) {
      alert(e)
    }
  }
  useEffect(() => {
    localStorage.setItem("queNumber", numb)
  }, [numb])
  useEffect(() => {
    localStorage.setItem("coinsForHistory", coinVAl)
  }, [coinVAl])
  const minus = useCallback((e) => setNumber(numb - 1), [numb])
  const plus = useCallback((e) => setNumber(numb + 1), [numb])
  const setCategory = useCallback((e) => {
    setCurrCategory(e.detail.value)
  }, [])

  // switch(coinVAl){
  //   case 
  // }

  useEffect(() => {
    if (coinVAl < 10) {
      setDisabled(true)
    }
  }, [coinVAl])

  return (
    <IonPage
      style={{
        backgroundColor: "#0D1117",
        color: "white"
      }} >
      <IonApp fullscreen={true} style={{
        backgroundColor: "#0D1117",
        color: "white",
      }} >

        <IonMenu color={"dark"} content-id="main-content">
          <IonHeader color={"dark"} >
            <IonToolbar color='dark'>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent color={"dark"} >
            <IonList>
              <IonListHeader>
                Account
              </IonListHeader>
              <IonMenuToggle auto-hide="false">
                <IonItem button>
                  <IonIcon slot="" name='home'></IonIcon>
                  <IonLabel onClick={() => history.push("/updateProfile")} >
                    <IonIcon icon={person} style={{
                      paddingRight: "10px"
                    }} ></IonIcon>
                    Profile
                  </IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon slot="" name='home'></IonIcon>
                  <IonLabel onClick={() => {
                    history.push("/practice")
                    localStorage.setItem("coins", 100)
                  }} >
                    <IonIcon icon={basketball} style={{
                      paddingRight: "10px"
                    }} ></IonIcon>
                    Practice
                  </IonLabel>
                </IonItem>

                <IonItem button>
                  <IonIcon slot="" name='home'></IonIcon>
                  <IonLabel onClick={() => {
                    history.push("/coinsPage")
                  }} >
                    <IonIcon icon={list} style={{
                      paddingRight: "10px"
                    }} ></IonIcon>
                    Coins History
                  </IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon slot="" name='home'></IonIcon>
                  <IonLabel onClick={() => {
                    history.push("/refer")
                  }} >
                    <IonIcon icon={share} style={{
                      paddingRight: "10px"
                    }} ></IonIcon>
                    Refer & Earn
                  </IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon slot="" name='home'></IonIcon>
                  <IonLabel onClick={() => {
                    signOut(auth).then(async () => {
                      // Sign-out successful.
                      history.replace("/login")
                      localStorage.clear()
                      await storage.clear()
                    }).catch((error) => {
                      // An error happened.
                    });
                  }} >
                    <IonIcon onClick={() => {

                    }} icon={powerSharp} style={{
                      paddingRight: "10px"
                    }} ></IonIcon>
                    Logout
                  </IonLabel>
                </IonItem>

              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <div style={{
          backgroundColor: "#0D1117"
        }} className="ion-page" id="main-content">
          <IonHeader style={{
            backgroundColor: "#0D1117"
          }} >
            <IonToolbar style={{
              backgroundColor: "#0D1117"
            }} >
              <IonButtons slot="start">
                <IonMenuToggle>
                  <IonButton>
                    <IonIcon slot="icon-only" icon={menu}></IonIcon>
                  </IonButton>
                </IonMenuToggle>
              </IonButtons>
              <IonTitle alignItems={"center"} >Quiz Home</IonTitle>
            </IonToolbar>
          </IonHeader>
        </div>
        <div style={{
          background: " linear-gradient(to right, #b993d6, #8ca6db)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          width: "150px",
          height: "60px",
          color: "#000",
          margin: "0 auto",
          // padding:"1%",
          borderRadius: "20px",
          marginTop: "100px",
          // borderBottomRightRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: "-10px",
          zIndex: -1
        }} >
          <IonImg style={{
            width: "50px",
            marginLeft: "10px"
            // display:"inline-block",
          }} src={coin} />
          <span onClick={() => {
            console.log("Hi")
          }} style={{
            // marginTop:"50px",
            marginRight: "15px",
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: "monospace",
          }} >{coinVAl}</span>
        </div>
        <div style={{
          // display: "flex",
          position: "relative",
          top: "35px",
          // bottom:"500",
          left: 20
        }} >

        </div>
        <div className='shadow' style={{
          position: "relative",
          backgroundColor: "#fff",
          left: 0,
          top: 25,
          height: "100%",
          width: "100%",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          padding: "0.5rem"
        }} >
          <div style={{
            height: "100%",
            width: "100%",
            border: "2px dashed dahhed",
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
            boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
            backgroundColor: "#fff",
            color: "#000"
          }} >
            <div style={{
              marginTop: "20px",
              padding: "30px"
            }} >
              <IonList style={{
                borderRadius: "50px",

              }} >
                <IonItem>
                  <IonSelect disabled={disabled} interface="action-sheet" onIonChange={setCategory} placeholder="Choose a Category">
                    <IonSelectOption value="random" >
                      Random
                    </IonSelectOption>
                    {
                      cat?.map((e) => {
                        return <IonSelectOption key={e.id} value={e.name} >
                          {e.name}
                        </IonSelectOption>
                      })
                    }
                  </IonSelect>
                </IonItem>
              </IonList>
            </div>
            <div style={{
              padding: "30px",
              marginTop: "-50px"
            }} >
              <IonList style={{
                borderRadius: "50px",

              }} >
                <IonItem >
                  <IonSelect disabled={disabled} interface="action-sheet" placeholder="Level" onIonChange={(e) => {
                    setLevel(e.detail.value)
                  }}
                  >
                    <IonSelectOption value="Easy">Easy</IonSelectOption>
                    <IonSelectOption value="Medium">Medium</IonSelectOption>
                    <IonSelectOption value="Hard">Hard</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            </div>
            <div style={{
              display: 'flex',
              padding: "80px",
              marginTop: "-60px"
            }} >

              {/* <h1>Numbers of Questions</h1> */}
              <IonButton disabled={disabled || numb === 1 ? true : false} onClick={minus} color="danger" >-</IonButton>
              <IonInput type='number' style={{
                marginTop: "-15px"
              }} value={numb} disabled={true} color="dark" />
              <IonButton disabled={disabled || numb === 10 ? true : false} onClick={plus}
                color="success" >+</IonButton>
            </div>
            <div style={{
              marginTop: "-80px",
              display: "flex",
              justifyContent: "center",
            }} >
              <IonButton disabled={disabled} onClick={() => handdleClick()
              } color={"success"} >
                <h1 color='dark' style={{
                  margin: "50px",
                  color: "#000"
                }} >{spinner ? <IonSpinner /> : "Start"}</h1>
              </IonButton>
            </div>
          </div>
        </div>
        {/* <IonApp> */}

      </IonApp>
    </IonPage>
  )
}

export default HomeScreen