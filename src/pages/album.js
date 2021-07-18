import React,{ useEffect, useState } from 'react';
import { GoMarkGithub } from "react-icons/go";
import { FaStackOverflow,FaLinkedinIn } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { ClipLoader } from 'react-spinners'
import { AiFillCloseCircle } from 'react-icons/ai'

const App = () => {
  const [ state,setState ] = useState({ loading:false })
  const [ results,setResults ] = useState([])
  const [ query,setQuery ] = useState("")
  const { loading } = state;
  const color = "black"

  useEffect(()=>{
    if(query){
        setState({ loading:true })
        setResults([])
        fetch(`https://nelly-sugu-backend.herokuapp.com/photos/${query}`)
        .then(res => res.json())
        .then(res =>  {
            if(res.status === 200 ){
              setResults(res.data)
            }
        })
        .finally(()=> setState({ loading:false }))
    }
  },[query])

  return (
    <div className="App" >
      <header>
        <h1 className="brand" style={{ color }} >Nelly Sugu</h1>
        <section>
          <FaLinkedinIn onClick={()=>window.open("https://www.linkedin.com/in/christophe-kwizera-081123190/")} size={ window.innerWidth > 800 ? 30 : 20 } className="icon" />
          <GoMarkGithub onClick={()=>window.open("//github.com/kabundege")} size={ window.innerWidth > 800 ? 25 : 20 }  className="icon" />
          <FaStackOverflow onClick={()=>window.open("https://stackoverflow.com/users/13124495/christopher?tab=profile")} size={window.innerWidth > 800 ? 30 : 20 }  className="icon" />
        </section>
      </header>
      <div className="Search-field">
          <FiSearch size={30} color={"grey"} />
          <input
            onChange={(ev)=>setQuery(ev.target.value)}
            value={query}
            placeholder="Search"
            min={0}
            type="number"
          />
          {
            query &&
            <AiFillCloseCircle style={{cursor:"pointer",flex:.1}} size={30} color={"#777"} onClick={()=>setQuery("")} />
          }
      </div>
      <div className="container">
        {
            loading ?
                <div className="loader-container">
                    <ClipLoader size={100} color={color} />
                </div> 
                : query ?
                    !results[0] ?
                        <div className="not-found">
                            <p> Album <strong>{query}</strong> was Not Fount </p>
                        </div> : 
                        React.Children.toArray(
                            results.map( one => (
                                <div className='photo-wrapper'>
                                    <img src={one.thumbnailUrl} alt="thumbnailUrl" />
                                    <h3> {one.title}</h3>
                                </div>
                            ))
                        ): null
        }
      </div>
    </div>
  );
}

export default App;
