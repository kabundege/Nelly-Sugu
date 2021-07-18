import AudioComponent from "../components/audio-card"
import React, { useEffect, useState } from 'react'
import { getHomeContent } from '../API';
import { ClipLoader } from 'react-spinners';
import NetworkError from "../components/NetworkError";

const HomeView = () => {
    const [ data,setData ] = useState([])
    const randomBg = Math.floor(Math.random()*0)
    
    useEffect(()=>{
        Fetcher()
        return () => setData([])
    },[])

    const Fetcher = () => {
        setData([])
        getHomeContent()
        .then(res => {
            setData(res.collection)
        }).catch(()=> setData(null))
    }

    return(
    <>
        <h1>Recommeded</h1>
        <div className="audio-container">
            {
                !data ?
                    <NetworkError retry={Fetcher} />:
                    data[0] ?
                        React.Children.toArray(
                            data.map( (one,index) => <AudioComponent one={one} index={index} randomBg={randomBg} /> )
                        )  :
                    <div className="loader-container">
                        <ClipLoader size={100} color={"grey"} />
                    </div> 
            }
            <div style={{padding:"3em 0"}}></div>
        </div>
    </>
)}

export default HomeView
