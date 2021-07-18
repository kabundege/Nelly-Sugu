import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getAudioLink } from '../API';
import { GiNextButton,GiPreviousButton,GiPlayButton,GiPauseButton, GiHeartBeats } from 'react-icons/gi'
import { StoreContext } from '../config/store';
import { MdOpenInNew } from 'react-icons/md';

const HotKeys = (player,callbacks,ReadyToPlay) => {
            
    var togglePlay = function () {
            if (player.paused) {
                player.play();
                callbacks.setPlay(true);
            } else {
                player.pause();
                callbacks.setPlay(false);
            }
        },
        toggleMute = function () {
            player.muted = !player.muted;
        },
        toggleFullScreen = function () {
            if (player.presentationMode = 'fullscreen') {
                player.presentationMode = 'inline';
            }  else {
                player.presentationMode = 'fullscreen';
            }
        },
        rewind = function () {
            player.currentTime -= 5;
        },
        forward = function () {
            player.currentTime += 5;
        },
        increaseVolume = function () {
            player.volume = Math.min(player.volume + 0.05, 1);
        },
        decreaseVolume = function () {
            player.volume = Math.max(player.volume - 0.05, 0);
        },
        preventStandardHotKeyActions = function (event) {
            event.stopPropagation();
            event.preventDefault();
            return false;
        },
        charCodeMap = {
            32: togglePlay,         // spacebar
            37: rewind,             // left
            38: increaseVolume,     // up
            39: forward,            // right
            40: decreaseVolume,     // down
            70: toggleFullScreen,   // f
            77: toggleMute,         // m
        },
        processKeyEvent = function (event) {
            var action;

            if (!event) {
                event = window.event;
            }

            action = charCodeMap[event.keyCode];

            if (action && !event.altKey && !event.ctrlKey && !event.shiftKey ) {
                if(ReadyToPlay)action();
                console.log(' a key was pressed');
                return preventStandardHotKeyActions(event);
            }
        },
        load = function () {
            document.addEventListener('keydown', processKeyEvent);
        };

    load();
}


const Variants = {
    hidden: { 
      x: '-100vw' 
    },
    visible: {
      x: 0,
      transition: { 
          type: 'spring', 
          stiffness: 120,
        }
    } 
}


const Player = () => {
    const [ readyToPlay,setReadyState ] = useState(false)
    const { nowPlaying } = useContext(StoreContext)
    const [ track,setTrack ] = useState({user:{}})
    const [ progress,setProgress ] = useState(0)
    const [ playing,setPlay ] = useState(false)
    const [ buffered,setBuffer ] = useState(0)
    const audioRef = useRef();
    const { 
        stream_url,
        artwork_url,
        genre,
        title,
        user:{
            city,username
        }
    } = track;

    const fadeIn = (UserVolume) => {
        const baseVolume = 0.02;
        const dif = UserVolume/baseVolume;
        audioRef.current.volume = baseVolume;

        for(let i=0; i<dif;i++){
            const id = setTimeout(()=>{
                audioRef.current.volume = Math.min( audioRef.current.volume + baseVolume , 1);
                clearTimeout(id)
            },1000*i)
        }

    }

    const fadeOut = (UserVolume) => {
        const baseVolume = 0.02;
        const dif = UserVolume/baseVolume;
        audioRef.current.volume = baseVolume;

        for(let i=0; i<dif;i++){
            const id = setTimeout(()=>{
                audioRef.current.volume = Math.max(audioRef.current.volume -  baseVolume, 0);
                clearTimeout(id)
            },1000*i)
        }
    }

    useEffect(()=>{
        if(audioRef.current ){
            if(!track.stream_url){
                setTrack(nowPlaying)
            }else{
                togglePlay().then(()=>{
                    setReadyState(false)
                    setTrack(nowPlaying)
                    setPlay(false)
                    setProgress(0)
                    setBuffer(0)
                })
            }
            HotKeys(audioRef.current,{ setPlay },readyToPlay)
        }
        otherEvents()
        return () => audioRef.current.src = ""
    },[nowPlaying.uri])

    const otherEvents = () => {
        audioRef.current.onprogress = (e) => {
            if(!readyToPlay){
                setReadyState(true);
            }
            let loaded = 0,played=0;
            if(track.buffered)
            loaded = parseInt(100 * audioRef.current.buffered.end(0) / audioRef.current.duration) ;
            played = parseInt(100 * audioRef.current.currentTime / audioRef.current.duration) ;
            //
            if(loaded !== buffered)setBuffer(loaded)
            if(played !== progress)setProgress(played)
        }
    }

    const togglePlay = async () => {
        if(readyToPlay){

            const UserVolume = audioRef.current.volume;
            const baseVolume = 0.02;
            const dif = UserVolume/baseVolume;
            
            if(playing) {
                fadeOut(UserVolume)
                const id = setTimeout(()=>{
                    audioRef.current.pause()
                    audioRef.current.volume = UserVolume
                    clearTimeout(id)
                },1000 * dif)
            }else{

                audioRef.current.volume = baseVolume;
                audioRef.current.play()
                fadeIn(UserVolume)
            }
            
            setPlay(!playing)
        }
    }
    
    return(
        <>
            <div className="player-avatar">
                <img src={artwork_url} alt="" className={`orbit ${ !playing ? "paused" : "" } `} />
            </div>
            <motion.div variants={Variants} className='player'>
            <audio ref={audioRef} src={getAudioLink(stream_url)} />
            <div className="content">
                <h3 >{title}</h3>
                <p>
                    { username || city || "SouncCloud" } 
                    <span style={{margin:"0 .2em"}}>&bull;</span> 
                    { genre || "Private" }
                </p>
            </div>
            <div className="controls">
                <GiPreviousButton size={20} className="control" />
                {
                    readyToPlay?
                        !playing  ?
                        <GiPlayButton 
                            onClick={()=>togglePlay()} 
                            size={20} className="control"/>:
                        <GiPauseButton
                            onClick={()=>togglePlay()} 
                            size={20} className="control"/>:
                        <GiHeartBeats />
                    
                }
                <GiNextButton size={20} className="control"/>
            </div>
            <div className="progress-wrapper">
                <div className="progress-bar" >
                    <div 
                        className="progress" 
                        style={{width:progress}} 
                    />
                        
                    <div
                        className="metadata"
                        style={{width:buffered}} 
                    />
                </div>
            </div>
            <MdOpenInNew size={30} color="#222" />
        </motion.div>
        </>
    )
}

export default Player;