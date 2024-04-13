import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './../pages/Home'
import Tours from './../pages/Tours'
import TourDetails from './../pages/TourDetails'
import Login from './../pages/Login'
import Register from './../pages/Register'
import RegisterSuccess from '../pages/registerSuccess'
import LoginSuccess from '../pages/loginSuccess'
import NotFound from './../pages/NotFound'
import TripConfirmed from '../pages/TripConfirmed'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/trips' element={<Tours />} />
      <Route path='/trips/:id' element={<TourDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/registerSuccess' element={<RegisterSuccess />} />
      <Route path='/loginSuccess' element={<LoginSuccess />} />
      <Route path='/tripConfirmed' element={<TripConfirmed />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routers