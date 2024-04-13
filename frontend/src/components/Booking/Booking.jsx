import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import '../Booking/booking.css'

const Booking = () => {
  const [name, setName] = useState('Name')
  const [numberOfPeople, setNumberOfPeople] = useState('1')
  const [phoneNumer, setPhoneNumber] = useState('Your phone number here')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')

  const submitTrip = async () => {
    try {
      const response = await fetch('http://localhost:3006/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, numberOfPeople, phoneNumer, email, date }),
      })
      console.log('Frontend after fetch')
      if (response.ok) {
        console.log('Trip confirmed successfully')
        window.location.href = '/tripConfirmed'
        setName('')
        setNumberOfPeople('1')
        setPhoneNumber('')
        setEmail('')
        setDate('')
        // alert('Trip confirmed')
      } else {
        console.log('Failed to confirm trip')
      }
    } catch (error) {
      console.error('Trip confirm error:', error)
      alert('Trip confirm failed')
    }
  }
  return (
    <div className="booking-form">
      <h3>Join the Trip</h3>
      <Form
      // onSubmit={handleSubmit}
      >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="numberOfPeople">Number of People</Label>
          <Input
            type="number"
            name="numberOfPeople"
            id="numberOfPeople"
            min="1"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={phoneNumer}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="date">Select Date</Label>
          <Input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>
        <button
          type="submit"
          className="booking__btn btn"
          onClick={submitTrip}
          style={{ background: 'var(--secondary-color)', color: 'white' }}>
          Confirm Your Trip
        </button>
      </Form>
    </div>
  )
}

export default Booking
