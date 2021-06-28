import React,{ useEffect, useState } from 'react';
import { GoMarkGithub } from "react-icons/go";
import { FaStackOverflow,FaUserAlt,FaLinkedinIn } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AiFillMail, AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'
import { satisfies } from 'semver';

const Posts = () => {
  const [ state,setState ] = useState({ loading:true })
  const [ data,setData ] = useState([])
  const [ posts,setPosts ] = useState([])
  const [ modal,setModal ] = useState(false)
  const [ user,setUser ] = useState(null)
  const { loading } = state;
  const color = "black"

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(res => {
      setData(res)
    })
    .finally(() => setState({ loading:false }))
    return () => setData([])
  },[])


  const FetchPosts = (user) => {
    setUser(user)
    setModal(true)
    setState({ ...satisfies,loading:true })
    const id =setTimeout(()=>{
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then(res => res.json())
      .then(res => setPosts(res))
      .catch(error => setState({ ...state,error }))
      .finally(() => setState({ ...state,loading:false }))
      return() => clearTimeout(id)
    },2000)
  }

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
      <div className="container">
        {
          loading && !data[0] ?
            <div className="loader-container">
              <ClipLoader size={100} color={color} />
            </div> :
            React.Children.toArray(
              data.map( user => (
                <div className="user" onClick={()=>FetchPosts(user)}>
                  <section>
                    <div className="input-field">
                      <FaUserAlt className="icon" size={20} color={color} />
                      <p style={{color}}>{user.name}</p>
                    </div>
                    <div className="input-field">
                      <AiFillMail  className="icon" size={20} color={color} />
                      <p style={{color}}>{user.email}</p>
                    </div>
                  </section>
                  <section className="btn" onClick={()=>setUser(user)}>
                    <span>Posts</span>
                    <AiOutlineArrowRight size={15} color={"white"} />
                  </section>
                  <div className="design"></div>
                </div>
              ) )
            )
        }
      </div>
      {
        modal ?
        <div className="overlay">
          <AiOutlineClose 
            size={ window.innerWidth > 800 ? 50 : 40 } 
            onClick={()=> {
              setModal(false)
              setPosts([])
              }} 
            color={"#555"} 
            className="closer" 
            style={{background:"white",borderRadius:50,padding:10}} />
          <div className="parent" >
            <header className="userContent">
              <FiUser size={ window.innerWidth > 800 ? 50 : 40 }  color="white" style={{background:"#555",borderRadius:50,padding:10}} />
              <div>
                <h3 style={{color}}>{user.name}</h3>
                <h4 style={{color}}>{user.email}</h4>
              </div>
            </header>
            <div className="container">
              {
                loading || !posts[0] ?
                  <div className="loader-container">
                    <ClipLoader size={100} color={color} />
                  </div> :
                  React.Children.toArray(
                    posts.map( post => (
                      <div className="post">
                        <h4 style={{color}}>{post.title}</h4>
                        <p style={{color}}>{post.body}</p>
                      </div>
                    ) )
                  )
              }
            </div>
          </div>
        </div>:null
      }
    </div>
  );
}

export default Posts;
