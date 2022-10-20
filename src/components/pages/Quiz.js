// import { questions } from './json/questions';
import { IonApp, IonSpinner, IonIcon, IonImg, IonPage, useIonAlert, useIonToast } from '@ionic/react'
import React, { useCallback, useEffect, useState } from 'react'
import coin from "../Images/coin.png"
import { alarmOutline } from "ionicons/icons"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import "./css/Quiz.css"
function Quiz({ history }) {
    const [counter, setCounter] = React.useState(5);
    const [queCount, setQueCount] = useState(0)
    const [bgColor, setBgColor] = useState("white")
    const [que, setOptions] = useState([])
    const [selected, setSelected] = useState(false)
    const [bgAnswer, setBgAnswer] = useState("")
    const [index, setIndex] = useState()
    const [stop, setStop] = useState(false)
    const [queIndex, setQueIndex] = useState()
    const [questionNumbering, setQuestionNumbering] = useState([])
    const [countCoin, setCountCoin] = useState(<IonSpinner />)
    const [presentAlert] = useIonAlert();
    const [coinValue, setCoinVaule] = useState(0)
    console.log(coinValue)
    const [questionsFromBackend, setQuestionsFromBackend] = useState([])
    useEffect(() => {
        setQuestionsFromBackend(JSON.parse(localStorage.getItem("question")))
    }, [])
    const id = localStorage.getItem("id")
    const docRef = doc(db, "users", id)
    useEffect(() => {
        const doooc = async () => {
            const docum = doc(db, "users", id)
            const ref = await getDoc(docum)
            setCountCoin(ref.data().coin)
        }
        doooc()
    }, [id, queCount])
    const counterRef = React.useRef(counter);
    const number = localStorage.getItem("queNumber")
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCount) => prevCount - 1);
            counterRef.current--;
            if (counterRef.current === 0) {
                counterRef.current = 5;
                setCounter(5)
                setQueCount((e) => e + 1)
                setBgAnswer("")
                setSelected(false)
            };
            if (stop === true) {
                clearInterval(interval)
            }
        }, 1000);
    }, [stop])

    const [present] = useIonToast();


    const presentToast = (msg, color) => {
        present({
            message: msg,
            duration: 2000,
            position: 'bottom',
            color: color
        });
    };

    useEffect(() => {
        setOptions(handdleShuffle([questionsFromBackend[queCount]?.options.flat(), questionsFromBackend[queCount]?.correctAnswer].flat()))
    }, [queCount, questionsFromBackend])
    const handdleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        switch (number) {
            case "1":
                setQuestionNumbering([1])
                break;
            case "2":
                setQuestionNumbering([1, 2])
                break;
            case "3":
                setQuestionNumbering([1, 2, 3])
                break;
            case "4":
                setQuestionNumbering([1, 2, 3, 4])
                break;
            case "5":
                setQuestionNumbering([1, 2, 3, 4, 5])
                break;
            case "6":
                setQuestionNumbering([1, 2, 3, 4, 5, 6])
                break;
            case "7":
                setQuestionNumbering([1, 2, 3, 4, 5, 6, 7])
                break;
            case "8":
                setQuestionNumbering([1, 2, 3, 4, 5, 6, 7, 8])
                break;
            case "9":
                setQuestionNumbering([1, 2, 3, 4, 5, 6, 7, 8, 9])
                break;
            case "10":
                setQuestionNumbering([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                break;
            default:

        }
    }, [number])

    useEffect(() => {
        setQueIndex((e) => questionNumbering[queCount] - 1)
    }, [queCount, questionNumbering])

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
        if (optionInArrayOfQuestions === questionsFromBackend[queCount].correctAnswer) {
            switch (counter) {
                case 5:
                    presentToast("Answered in 5 seconds", "success")
                    updateDoc(docRef, {
                        coin: (countCoin + 5 * 2)
                    })
                    setCoinVaule((e) => e + 5 * 2)
                    break;
                case 4:
                    presentToast("Answered in 4 seconds", "success")
                    updateDoc(docRef, {
                        coin: (countCoin + 4 * 2)
                    })
                    setCoinVaule((e) => e + 4 * 2)
                    break;
                case 3:
                    presentToast("Answered in 3 seconds", "success")
                    updateDoc(docRef, {
                        coin: (countCoin + 3 * 2)
                    })
                    setCoinVaule((e) => e + 3 * 2)
                    break;
                case 2:
                    presentToast("Answered in 2 seconds", "success")
                    updateDoc(docRef, {
                        coin: (countCoin + 2 * 2)
                    })
                    setCoinVaule((e) => e + 2 * 2)
                    break;
                case 1:
                    presentToast("Answered in 1 seconds", "success")
                    updateDoc(docRef, {
                        coin: (countCoin + 1 * 2)
                    })
                    setCoinVaule((e) => e + 1 * 2)
                    break;
                case 0:
                    break;
                default:
                    setCountCoin(countCoin)
            }}
        
        }


    // console.log(questionsFromBackend[6]?.question)

    const handdleSelect = (i) => {
        if (i === questionsFromBackend[queCount].correctAnswer) {
            setSelected(true)
            setBgAnswer("correct")
        } else {
            setBgAnswer("wrong")
            setSelected(true)
        }
    }

    useEffect(() => {
        if ((queCount).toString() === number) {
            setStop(true)
            presentAlert({
                header: 'Great! Well Done',
                cssClass: "loader",
                buttons: [
                    {
                        text: 'Go Back Home',
                        role: 'confirm',
                        handler: () => {history.replace("/home")
                        const lastBalance = localStorage.getItem('coinsForHistory')
                        const email =  localStorage.getItem("emailOfUser")
                        fetch(`http://backquery.online:1111/coin-history?coins=${coinValue}&lastBalance=${lastBalance}&email=${email}`).then((e)=>{
                            console.log("Done")
                        })
                    }
                        ,
                    }
                ],
            })
        }
    }, [number, queCount, presentAlert, history])

    return ("Something went wrong" && <IonPage style={{
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
                        questionNumbering.map((e, i) => {
                            return <div key={e} style={{
                                color: "rgba(0,0,0,0.7)"
                            }} >
                                <h3 style={{
                                    backgroundColor: i === queIndex ? "#2EA7B8" : "#D4D4D4",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    paddingTop: "3px",
                                    paddingBottom: "3px",
                                    borderRadius: "50px",
                                    margin: "1px",
                                    marginTop: "40px"
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
                    }} >{questionsFromBackend[queCount]?.question}</h3>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
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
                                        disabled={selected === true ? true : false}
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