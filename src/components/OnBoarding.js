import React, { useState, useLayoutEffect } from 'react';
import { Storage } from "@ionic/storage";
import { Redirect } from 'react-router-dom';
import { IonSlides, IonSlide, IonContent, IonImg, IonButton, IonText, IonPage } from '@ionic/react';
import onBoarding1 from "./Images/onBoarding1.svg"
import onBoarding2 from "./Images/onBoarding2.svg"
import onBoarding3 from "./Images/onBoarding3.svg"
// Optional parameters to pass to the swiper instance.
// See https://swiperjs.com/swiper-api for valid options.
const slideOpts = {
    on: {
        beforeInit() {
            const swiper = this;
            swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
            swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParams = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: true,
            };
            swiper.params = Object.assign(swiper.params, overwriteParams);
            swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
        },
        setTranslate() {
            const swiper = this;
            const { $, slides, rtlTranslate: rtl } = swiper;
            for (let i = 0; i < slides.length; i += 1) {
                const $slideEl = slides.eq(i);
                let progress = $slideEl[0].progress;
                if (swiper.params.flipEffect.limitRotation) {
                    progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                }
                const offset$$1 = $slideEl[0].swiperSlideOffset;
                const rotate = -180 * progress;
                let rotateY = rotate;
                let rotateX = 0;
                let tx = -offset$$1;
                let ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                    rotateX = -rotateY;
                    rotateY = 0;
                } else if (rtl) {
                    rotateY = -rotateY;
                }

                $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

                if (swiper.params.flipEffect.slideShadows) {

                }
                $slideEl
                    .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            }
        },
        setTransition(duration) {
            const swiper = this;
            const { slides, activeIndex, $wrapperEl } = swiper;
            slides
                .transition(duration)
            //   .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            //   .transition(duration);
            if (swiper.params.virtualTranslate && duration !== 0) {
                let eventTriggered = false;
                // eslint-disable-next-line
                slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
                    if (eventTriggered) return;
                    if (!swiper || swiper.destroyed) return;

                    eventTriggered = true;
                    swiper.animating = false;
                    const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                    for (let i = 0; i < triggerEvents.length; i += 1) {
                        $wrapperEl.trigger(triggerEvents[i]);
                    }
                });
            }
        }
    }
};

const OnBoarding = () => {
    const [onBoardingHasEndedInformation, setonBoardingHasEndedInformation] = useState(null)
    const onClickHanddler = async () => {
        const storage = new Storage();
        await storage.create();
        await storage.set("onBoardingHasEnded", true)
        const onBoardingHasEnded = await storage.get("onBoardingHasEnded");
        if (onBoardingHasEnded === true) {
            setonBoardingHasEndedInformation(true)
        } else {
            setonBoardingHasEndedInformation(false)
        }
    }
    useLayoutEffect(() => {
        //  onClickHanddler()   
    }, [])
    // Testing
    // const func = async () => {
    //     const storage = new Storage();
    //     await storage.create();
    //     const onBoardingHasEnded = await storage.get("onBoardingHasEnded");
    //     console.log(onBoardingHasEnded);
    // }
    // func()
    return onBoardingHasEndedInformation === true ? <Redirect from='/' to="/login" /> : (
            <IonPage style={{
                height:"250vw",
                maxHeight: '300vw',
                margin:"0 auto",
                marginTop: '10vh'
            }} >
        <IonContent style={{
            maxWidth: '100%',
            maxHeight: '100%',
        }} >
                <IonSlides className='' pager={true} style={{
                    margin: "0.8rem",
                    padding: "0.8rem",

                    // display: "flex",
                }} options={slideOpts}>
                    <IonSlide style={{
                        display: "block",
                    }} >
                        <IonImg style={{
                            height: "15rem",
                            maxWidth: "20rem",
                            marginTop: "0.5rem"
                        }} src={onBoarding1} />
                        <h1 style={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            marginTop: "4rem",
                            marginBottom: "1.5rem"
                        }} >Test Your Knowledge <span
                            style={{
                                fontSize: "1rem",
                                color: "#A4BBF1",
                                marginTop: "1.5rem",
                                display: "inline-block",
                                fonrWeight: "light"
                            }}
                        >There are hundreds of Category to Choose From</span></h1>
                    </IonSlide>
                    <IonSlide style={{
                        display: "block"
                    }} >
                        <IonImg style={{
                            height: "15rem",
                            maxWidth: "20rem",
                            marginTop: "1.5rem"
                        }} src={onBoarding2} />
                        <h1 style={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            marginTop: "2rem",
                            marginBottom: "1.5rem",
                        }} >Earn Coins for Games<span style={{
                            color: "#FFFFB6",
                            marginTop: "2rem",
                            display: "inline-block",
                            fonrWeight: "light",
                            fontSize: "1rem"
                        }}>
                                In-Game Coins are So Usefull While You play Games
                            </span> </h1>
                    </IonSlide>
                    <IonSlide style={{
                        display: "block"
                    }} >
                        <IonImg style={{
                            height: "15rem",
                            maxWidth: "20rem",
                            marginTop: "1.5rem"
                        }} src={onBoarding3} />
                        <h1 style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginTop: "60px",
                            marginBottom: "30px"
                        }} >Play the Most Loving Quiz Game<span style={{
                            display: "inline-block",
                            backgroundColor: "#C9FFB6",
                            color: "black",
                            borderRadius: "40px",
                            padding: "10px",
                            // marginTop:"10px",
                            fontFamily: "Roboto",
                            fontSize: "50px",
                            fontWeight: "bold"
                        }}>Quiz Timer</span>
                            <IonButton onClick={onClickHanddler} color={"success"} >
                                <IonText>
                                    <h3>Woohoo!</h3>
                                </IonText>
                            </IonButton>
                        </h1>
                    </IonSlide>
                </IonSlides>
        </IonContent>
            </IonPage>
    )
};

export default OnBoarding