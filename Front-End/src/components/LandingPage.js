import React from 'react'
import "./LandingPage.css"
import choreTracker from "../assets/images/washing-dishes.jpg";


const LandingPage = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          Logo
        </div>
        <div className="avatar">
          <p> sign-in / sign-up</p>
        </div>
      </nav>
      <main>
      <h1 className ="title"> 
        The Landing Page
        </h1>
        <section className="hero__image">
          <img src={choreTracker} alt=""/>
        </section>
        <section className= "cards__section">
          

        </section>
      </main>
     
    </div>
  )
}

export default LandingPage
