import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import './App.css'
import AuthButtons from './components/AuthButtons'
import { BrowserRouter as Router,Route,Routes ,Outlet} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Pokedex from './components/Pokedex'
import MyReviews from './components/MyReviews'
import Restaurants from './components/Restaurants'
import RestaurantDetails from './components/RestaurantDetails'
import CreateReview from './components/CreateReview'


function App() {
  const {isAuthenticated} = useAuth0()

  return (
    <Router>
      <div className="app-container">
        <div className="header">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/446.png" className="logo" />
          <h1>Pokemon Eat!</h1>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/674.png" className="logo" />
          
        </div>
        <div><AuthButtons/></div>

        {isAuthenticated && (
          <>
          <Navbar/>
          <div className="content">
          <Routes>
  <Route path="/" element={<Profile />} />
  <Route path="/pokedex" element={<Pokedex />} />
  <Route path="/reviews" element={<Outlet />}>
    <Route index element={<MyReviews />} />
    <Route path="create/:restaurantId" element={<CreateReview />} />
  </Route>
  <Route path="/restaurants" element={<Outlet />}>
    <Route index element={<Restaurants />} />
    <Route path=":id" element={<RestaurantDetails />} />
  </Route>
</Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  )
}

export default App
