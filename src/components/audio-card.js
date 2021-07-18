import React, { useEffect, useState,createRef, useContext } from 'react'
import { BsFillPlayFill,BsFillPauseFill } from "react-icons/bs";
import { motion } from 'framer-motion'
import { StoreContext } from '../config/store'
import { FaAngellist } from 'react-icons/fa';

const { ColorThief } = window;

const AudioComponent = ({one,index,randomBg}) => {
    const imgRef = createRef()
    const profileRef = createRef()
    const { nowPlaying,handlerContext } = useContext(StoreContext)
    const [ playing,setPlay ] = useState(false)
    const [ bgColor,setBg ] = useState("")

    const AudioVariants = {
        hidden: { 
          y: '-5vh' 
        },
        visible: {
          y: 0,
          transition: { 
              type: 'spring', 
              stiffness: 120,
              delay: index/80,
            }
        } 
    }
      
    useEffect(()=>{
        loadImages()
        if( one.id !== nowPlaying.id) setPlay(false)
        else setPlay(true)
    },[imgRef,one,profileRef,playing,nowPlaying])

    const loadImages = () => {
        const colorThief = new ColorThief();
        const img = new Image();
        img.src = one.artwork_url;
        img.crossOrigin = "Anonymous";
        img.onload = e => {
            const res = colorThief.getPalette(img)
            setBg(`rgb(${res[randomBg][0]},${res[randomBg][1]},${res[randomBg][2]})`)
            if(imgRef.current){
                imgRef.current.src = img.src;
            }
        }
    }

    const playerHandler = () => {
        handlerContext('nowPlaying',one)
    }

    return (
        <motion.div 
            variants={AudioVariants}
            className="audio-wrapper"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={()=>playerHandler()}
        >
            <div className="avatar" style={{background:bgColor}}>
                <img ref={imgRef} alt="" src={one.artwork_url} />
                <FaAngellist  
                size={50} 
                className="brand" 
                />
            </div>
            <div className="user">
                <img ref={profileRef} alt="" src={one.user.avatar_url} />
                <div className="user-content">
                    <h5>{one.user.username}</h5>
                    <p>{ one.user.country || one.user.city || "SoundCloud" }</p>
                </div>
            </div>
            <div className="content">
                <section>
                    <span></span>
                    {
                        playing ?
                        <BsFillPauseFill size={30} color="white" />:
                        <BsFillPlayFill size={30} color="white" />
                    }
                </section>
                <div className="content-text">
                    <h3>{one.genre || "Private"}</h3>
                    <p>{one.title}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default AudioComponent
