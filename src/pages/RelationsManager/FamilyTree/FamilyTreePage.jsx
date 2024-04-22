import React from "react"
import Lottie from 'react-lottie'
import animationData from '../../../assets/lottie/family_2.json'

export default function FamilyTreePage(){
    const defaultOptions = {
        loop:true,
        autoplay:true,
        animationData: animationData,
        rendererSettings:{
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    return <div style={{position:'absolute'}}>
    <Lottie options={defaultOptions} style={{position:'relative',zindex:'0',height:'90vh',width:'90vw'}} ></Lottie>
    <div style={{position:'relative',height:'20rem',width:'20rem',backgroundColor:'red'}}></div></div>

}