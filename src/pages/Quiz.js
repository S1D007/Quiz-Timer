import { questions } from './json/questions';
import { IonApp, IonSpinner, IonButtons, IonContent, IonIcon, IonImg, IonPage } from '@ionic/react'
import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import coin from "../components/Images/coin.png"
import { alarmOutline } from "ionicons/icons"
import { UserContext } from '../components/Functions/context';
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../config/firebase'
let backgroundColor = ""
function Quiz() {
    const userDetails = useContext(UserContext)
    const [counter, setCounter] = React.useState(5);
    const [queCount, setQueCount] = useState(0)
    const [bgColor, setBgColor] = useState("white")
    const [que, setQuestions] = useState([])
    const [index, setIndex] = useState()
    const [selected, setSelected] = useState(1)
    const [countCoin, setCountCoin] = useState(<IonSpinner />)
    const id = localStorage.getItem("id")
    const docRef = doc(db, "users", id)
    const counterRef = React.useRef(counter);
    useEffect(() => {
        setCountCoin(userDetails.coins)
    }, [userDetails])

    useLayoutEffect(() => {
        const timeInterval = () => {
            setInterval(() => {
                setCounter((prevCount) => prevCount - 1);
                counterRef.current--;
                if (counterRef.current === 0) {
                    counterRef.current = 5;
                    setCounter(5)
                    setQueCount((e) => e + 1)
                };
            }, 1000);
        }

        timeInterval()
    }, [])
    useEffect(() => {
        if (counter === 0) {
            updateDoc(docRef, {
                coin: countCoin - 1
            })
        }
    }, [counter, docRef, countCoin])
    useLayoutEffect(() => {
        setQuestions(handdleShuffle([...questions[queCount].opt, questions[queCount].a]))
    }, [queCount])
    const handdleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5)
    }
    const questionNumbering = [1, 2, 3, 4, 5, 6]
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
        setCounter(5)
        counterRef.current = 5
        if (optionInArrayOfQuestions === questions[queCount].a) {
            setIndex(indexNumber);
            switch (counter) {
                case 5:
                    updateDoc(docRef, {
                        coin: (countCoin + 5 * 2)
                    })
                    break;
                case 4:
                    updateDoc(docRef, {
                        coin: (countCoin + 4 * 2)
                    })
                    break;
                case 3:
                    updateDoc(docRef, {
                        coin: (countCoin + 3 * 2)
                    })
                    break;
                case 2:
                    updateDoc(docRef, {
                        coin: (countCoin + 2 * 2)
                    })
                    break;
                case 1:
                    updateDoc(docRef, {
                        coin: (countCoin + 1 * 2)
                    })
                    // setPrevCount((e)=>queCount)
                    break;
                case 0:
                    break;
                default:
                    setCountCoin(countCoin)
            }

        }else{
            switch (counter) {
                case 5:
                    updateDoc(docRef, {
                        coin: (countCoin - 5 * 2)
                    })
                    break;
                case 4:
                    updateDoc(docRef, {
                        coin: (countCoin - 4 * 2)
                    })
                    break;
                case 3:
                    updateDoc(docRef, {
                        coin: (countCoin - 3 * 2)
                    })
                    break;
                case 2:
                    updateDoc(docRef, {
                        coin: (countCoin - 2 * 2)
                    })
                    break;
                case 1:
                    updateDoc(docRef, {
                        coin: (countCoin - 1 * 2)
                    })
                    // setPrevCount((e)=>queCount)
                    break;
                    default:
        }}
        setQueCount((e) => e + 1);
    }

    useEffect(()=>{
        userSelectedOption()
    },[])
    return (
        <IonPage style={{
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
                            questionNumbering.map((e) => {
                                return <div key={e} style={{
                                    color: "rgba(0,0,0,0.7)"
                                }} >
                                    <h3 style={{
                                        background: "#D4D4D4",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        paddingTop: "5px",
                                        paddingBottom: "5px",
                                        borderRadius: "50px",
                                        backgroundColor: e !== 1 ? "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)" : "lightblue",
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
                                        <h5 onClick={() => {userSelectedOption(optionInArrayOfQuestions, indexNumber)
                                        }} style={{
                                            fontFamily: "monospace",
                                            // backgroundColor : "yellow",
                                            padding: "10px",
                                            borderRadius: "20px"
                                        }}
                                        
                                         >{optionInArrayOfQuestions}</h5>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </IonApp>
        </IonPage>
    )
}

export default Quiz