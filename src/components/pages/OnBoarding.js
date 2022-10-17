import React, { useState, useLayoutEffect } from 'react';
import { Storage } from "@ionic/storage";
import { IonSlides, IonSlide, IonImg, IonButton, IonText, useIonLoading, IonRouterOutlet } from '@ionic/react';
import onBoarding1 from "../Images/onBoarding1.svg"
import onBoarding2 from "../Images/onBoarding2.svg"
import onBoarding3 from "../Images/onBoarding3.svg"
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
            if (swiper.params.virtualTranslate && duration !== 0) {
                let eventTriggered = false;
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

const OnBoarding = ({ history }) => {
    const storage = new Storage();
    storage.create();
    const onClickHanddler = async()=>{
        localStorage.setItem("OnBoardingEnded",true)
        history.replace("/login")
    }
    const [present, dismiss] = useIonLoading();

    const store = async()=>{
        present({
            message: `Loading ....`,
            duration: 100,
            spinner: 'circles',
            animated:true,
            cssClass:"loader",
          })
        const check2 = localStorage.getItem("login")
        if (check2) {
            history.replace("/home")
        }
    }
    useLayoutEffect(()=>{
        store()
    },[])

    return  (
        <IonRouterOutlet  style={{
            backgroundColor: "#0D1117"
        }} >
            <div style={{
            }} >
                <IonSlides className='' pager={true} style={{
                    margin: "0.1rem",
                    padding: "2rem",
                    display: "flex",
                    alignItems: "center",
                    marginTop:"20pt"
                }} options={slideOpts}>
                    <IonSlide style={{
                        display: "block",
                        justifyContent: "center"
                    }} >
                        <IonImg style={{
                            height: "15rem",
                            maxWidth: "20rem",
                            marginTop: "2rem",
                            marginBottom:"1.5rem "
                        }} src={onBoarding1} />
                        <IonText color={"secondary"} style={{
                            fontSize: "10vw",
                            fontWeight: "bold",
                        }} >Test Your Knowledge <span
                            style={{
                                fontSize: "1.2rem",
                                color: "#A4BBF1",
                                marginTop: "1.5rem",
                                display: "inline-block",
                                fonrWeight: "light"
                            }}
                        >There are hundreds of Category to Choose From</span></IonText>
                    </IonSlide>
                    <IonSlide style={{
                        display: "block"
                    }} >
                        <IonImg style={{
                            height: "15rem",
                            maxWidth: "20rem",
                            marginTop: "2rem",
                            marginBottom:"1.5rem"
                        }} src={onBoarding2} />
                        <IonText color={"warning"} style={{
                            // color:"white",
                            fontSize: "10vw",
                            fontWeight: "bold",
                            marginTop: "2rem",
                            marginBottom: "1.5rem",
                        }} >Earn Coins for Games you play<span style={{
                            color: "#FFFFB6",
                            marginTop: "2rem",
                            display: "inline-block",
                            fonrWeight: "light",
                            fontSize: "5vw",
                        }}>
                                In-Game Coins can be usefull to redeem Rewards
                            </span> </IonText>
                    </IonSlide>
                    <IonSlide style={{
                        display: "block"
                    }} >
                        <IonImg style={{
                            height: "15rem",
                            maxWidth: "20rem",
                            marginTop: "1rem",
                            marginBottom:"1.5rem "
                        }} src={onBoarding3} />
                        <IonText color={"success"} style={{
                            // color:"white",
                            fontSize: "8vw",
                            fontWeight: "bold",
                            marginBottom: "30px"
                        }} >Play the Most Loving Quiz Game<span style={{
                            display: "block",
                            backgroundColor: "#C9FFB6",
                            color: "black",
                            borderRadius: "40px",
                            padding: "2vw",
                            // marginTop:"10px",
                            fontFamily: "Roboto",
                            fontSize: "50px",
                            fontWeight: "bold"
                        }}>Quiz Timer</span>
                            <IonButton style={{
                                marginTop: "50px",
                                marginBottom: "50pt"
                            }} size='large' onClick={onClickHanddler} color={"success"} >
                                <IonText>
                                    <h3 style={{
                                        color: "black",
                                        padding: "50pt",
                                    }} >Woohoo!</h3>
                                </IonText>
                            </IonButton>
                        </IonText>
                    </IonSlide>
                </IonSlides>
            </div>
        </IonRouterOutlet>
    )
};

export default OnBoarding