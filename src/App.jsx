import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import './App.css'
import AuthButtons from './components/AuthButtons'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './components/Profile'

function App() {
  const {isAuthenticated} = useAuth0()

  return (
    <>
      <div>
        <a>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/446.png" className="logo" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/674.png" className="logo" />
        </a>
      </div>
      <h1>Pokemon Eat!</h1>
      <AuthButtons/>
      {isAuthenticated && <Profile/>}
    </>
  )
}

export default App
