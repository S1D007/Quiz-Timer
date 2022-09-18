import { questions } from './json/questions';
import { IonApp, IonSpinner, IonButtons, IonContent, IonIcon, IonImg, IonPage, IonButton, useIonAlert, IonModal, useIonToast } from '@ionic/react'
import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import coin from "../components/Images/coin.png"
import { alarmOutline } from "ionicons/icons"
import { UserContext } from '../components/Functions/context';
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../config/firebase'
import "./css/Quiz.css"
import { Redirect } from 'react-router';
import HomeScreen from './HomeScreen';
function Quiz({history}) {
    const userDetails = useContext(UserContext)
    const [counter, setCounter] = React.useState(5);
    const [queCount, setQueCount] = useState(0)
    const [bgColor, setBgColor] = useState("white")
    const [que, setQuestions] = useState([])
    const [selected, setSelected] = useState(false)
    const [bgAnswer, setBgAnswer] = useState("")
    const [index, setIndex] = useState()
    const [queIndex,setQueIndex] = useState()
    const [message,setMessage] = useState("")
    const [countCoin, setCountCoin] = useState(<IonSpinner />)
    const [presentAlert] = useIonAlert();
    const id = localStorage.getItem("id")
    const docRef = doc(db, "users", id)
    const counterRef = React.useRef(counter);
    useEffect(() => {
        setCountCoin(userDetails.coins)
    }, [userDetails])
    const timeInterval = () => {
        const interval = setInterval(() => {
            setCounter((prevCount) => prevCount - 1);
            counterRef.current--;
            if (counterRef.current === 0) {
                updateDoc(docRef, {
                    coin: (countCoin - 1)
                })
                counterRef.current = 5;
                setCounter(5)
                setQueCount((e) => e + 1)
                setBgAnswer("")
                setSelected(false)
            };}, 1000);
    }
    useLayoutEffect(() => {
        const timeInterval = () => {
            const interval = setInterval(() => {
                setCounter((prevCount) => prevCount - 1);
                counterRef.current--;
                if (counterRef.current === 0) {
                    counterRef.current = 5;
                    setCounter(5)
                    setQueCount((e) => e + 1)
                    setBgAnswer("")
                    setSelected(false)
                };}, 1000);
        }
        timeInterval()
    }, [])

    const [present] = useIonToast();

  const presentToast = (msg,color) => {
    present({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color:color
    });
  };
    useLayoutEffect(() => {
        setQuestions(handdleShuffle([...questions[queCount].opt, questions[queCount].a]))
    }, [queCount])
    const handdleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5)
    }
    const questionNumbering = [1, 2, 3, 4, 5, 6]
    
    useEffect(()=>{
        setQueIndex((e)=>questionNumbering[queCount]-1)
    },[queCount])
    console.log("->"+queCount);
    console.log("=>"+queIndex);
    useEffect(() => {
        switch (counter) {
            case 5:
                setBgColor("#b9ffab");
                break;
            case 4:
                setBgColor("#fcffab");
                break;
            case 3:
                setBgColor("#abffcf");
                break;
            case 2:
                setBgColor("#cdabff");
                break;
            case 1:
                setBgColor("#ffabab");
                break;
            case 0:
                setBgColor("#f54242");
                break;
            default:
                setBgColor("#fff")
        }
    }, [counter])
    const userSelectedOption = (optionInArrayOfQuestions, indexNumber) => {
        setIndex(indexNumber);
        if (optionInArrayOfQuestions === questions[queCount].a) {
            
            switch (counter) {
                case 5:
                    updateDoc(docRef, {
                        coin: (countCoin + 5 * 2)
                    })
                    presentToast("Answered in 5 seconds","success")
                    break;
                    case 4:
                        presentToast("Answered in 4 seconds","success")
                        updateDoc(docRef, {
                            coin: (countCoin + 4 * 2)
                        })
                        break;
                        case 3:
                            presentToast("Answered in 3 seconds","success")
                            updateDoc(docRef, {
                                coin: (countCoin + 3 * 2)
                            })
                            break;
                            case 2:
                    presentToast("Answered in 2 seconds","success")
                    updateDoc(docRef, {
                        coin: (countCoin + 2 * 2)
                    })
                    break;
                    case 1:
                    presentToast("Answered in 1 seconds","success")
                    updateDoc(docRef, {
                        coin: (countCoin + 1 * 2)
                    })
                    break;
                case 0:
                    break;
                default:
                    setCountCoin(countCoin)
            }

        } else {
            
            switch (counter) {
                case 5:
                    presentToast(`Wrong Answer, '${5 * 2} points minus'`,"danger")
                    updateDoc(docRef, {
                        coin: (countCoin - 5 * 2)
                    })
                    break;
                case 4:
                    presentToast(`Wrong Answer, '${(4 * 2)}' points minus`,"danger")
                    updateDoc(docRef, {
                        coin: (countCoin - 4 * 2)
                    })
                    break;
                case 3:
                    presentToast(`Wrong Answer, '${3 * 2} points minus'`,"danger")
                    updateDoc(docRef, {
                        coin: (countCoin - 3 * 2)
                    })
                    break;
                case 2:
                    presentToast(`Wrong Answer, '${ 4 * 2} points minus'`,"danger")
                    updateDoc(docRef, {
                        coin: (countCoin - 2 * 2)
                    })
                    break;
                case 1:
                    presentToast(`Wrong Answer, '${5 * 2} points minus'`,"danger")
                    updateDoc(docRef, {
                        coin: (countCoin - 1 * 2)
                    })
                    // setPrevCount((e)=>queCount)
                    break;
                default:
            }
        }
        
    }

    const handdleSelect = (i) => {if (i === questions[queCount].a) {
        setSelected(true)
            setBgAnswer("correct")
        }else{
            setBgAnswer("wrong")
            setSelected(true)
        }
    }
    // console.log({
    //     queCount,
    //     que:que.length
    // });
    useEffect(()=>{
        if(queCount > que.length){
            presentAlert({
                header: 'Great! Well Done',
            buttons: [
              {
                text: 'Go Back Home',
                role: 'confirm',
                handler: () => {
                  history.push("/home")
                },
                    }
                ],
              })
        }
    },[que.length,queCount,history,presentAlert])
    return(<IonPage style={{
            backgroundColor: "#0D1117",
        }} >
            <IonApp style={{
                backgroundColor: "#0D1117",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "30px"
                }} >
                    <IonImg style={{
                        width: "50px",
                        marginLeft: "10px"
                        // display:"inline-block",
                    }} src={coin} />
                    <span style={{
                        // marginTop:"50px",
                        marginRight: "15px",
                        color: "#fff",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        fontFamily: "monospace",
                    }} >{countCoin}</span>
                    <div style={{
                        width: "102px",
                        height: "34px",
                        left: "137px",
                        top: "50px",
                        borderRadius: "10px",
                        color: `black`,
                        backgroundColor: `${bgColor}`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }} >
                        <IonIcon size='large' icon={alarmOutline} />
                        <h1 style={{
                            fontFamily: "monospace",
                            fontWeight: "400",
                            fontSize: "30px",
                            marginBottom: "18px",
                            marginLeft: "20px"
                        }} > {counter}</h1>
                    </div>
                </div>

                <div style={{
                    width: "100%",
                    height: "85vh",
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 0,
                    borderTopLeftRadius: "50px",
                    borderTopRightRadius: "50px",
                    color: "black"
                }} >
                    <div style={{
                        padding: "150px",
                        marginTop: "-140px"
                    }} >
                        <hr color='#0D1117' style={{
                            fontSize: "5px",
                            padding: "2px",
                            borderRadius: "50px"
                        }} />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-evenly", alignContent: "center", margin: "40px", marginTop: "-150px" }} >
                        {
                            questionNumbering.map((e,i) => {
                                return <div key={e} style={{
                                    color: "rgba(0,0,0,0.7)"
                                }} >
                                    <h3 style={{
                                        backgroundColor: i === queIndex?"#2EA7B8":"#D4D4D4",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        paddingTop: "3px",
                                        paddingBottom: "3px",
                                        borderRadius: "50px",
                                    }} >{e}</h3>
                                </div>
                            })
                        }
                    </div>
                    <div style={{
                        margin: "5%",
                    }} >
                        <h3 style={{
                            fontWeight: "bold"
                        }} >{questions[queCount].q}</h3>
                        <div style={{
                            display: "table-row",
                            justifyContent: "space-between",
                            alignSelf: "auto"
                        }} >
                            {que.map((optionInArrayOfQuestions, indexNumber) => {
                                return <div key={indexNumber} style={{
                                    display: "inline-flex"
                                }} >
                                    <div style={{
                                        marginRight: "10px"
                                    }} >
                                        <h4 style={{
                                            background: "#D4D4D4",
                                            paddingLeft: "15px",
                                            paddingRight: "15px",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            borderRadius: "50px",
                                            backgroundColor: optionInArrayOfQuestions !== 1 ? "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)" : "lightblue",
                                        }} >{indexNumber + 1}</h4>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignContent: "center",
                                        alignItems: "center",
                                        fontFamily: "monospace"
                                    }} >
                                        <button onClick={() => {
                                            userSelectedOption(optionInArrayOfQuestions, indexNumber)
                                            handdleSelect(optionInArrayOfQuestions)
                                        }} 
                                        disabled={selected === true?true:false}
                                        style={{
                                            fontFamily: "monospace",
                                            padding: "10px",
                                            borderRadius: "20px",
                                            fontSize: "18px",
                                            // backgroundColor:"wheat"
                                        }}
                                            className={indexNumber === index ? bgAnswer : ""}
                                        >{optionInArrayOfQuestions}</button>
                                    </div>
                                </div>
                            })}
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "50px"
                            }} >
                            </div>
                        </div>
                    </div>
                </div>
            </IonApp>
        </IonPage>
    )
}

export default Quiz