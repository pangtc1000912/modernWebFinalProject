import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/login.css'

import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

const Register = () => {
  // const [credentials, setCredentials] = useState({
  //   userName: '',
  //   email: '',
  //   password: '',
  //   province: '',
  // })
  const [username, setUsername] = useState('Username')
  const [password, setPassword] = useState('Password')
  const [email, setEmail] = useState('Email')
  const [province, setProvince] = useState('')

  const [userNameError, setUserNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Northwest Territories',
    'Nunavut',
    'Yukon',
  ]

  const validate = () => {
    let valid = true

    if (!username.trim()) {
      setUserNameError('Username is required')
      valid = false
    } else {
      setUserNameError('')
    }

    if (!email.trim()) {
      setEmailError('Email is required')
      valid = false
    } else if (!isValidEmail(email.trim())) {
      setEmailError('Please enter a valid email address')
      valid = false
    } else {
      setEmailError('')
    }

    if (!password.trim()) {
      setPasswordError('Password is required')
      valid = false
    } else {
      setPasswordError('')
    }

    return valid
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const register = async () => {
    if (!validate()) return

    try {
      console.log('Frontend request initiated')
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, province }),
      })
      console.log('Frontend after fetch')
      if (response.ok) {
        console.log('User registered successfully')
        window.location.href = '/registerSuccess'
        setUsername('')
        setPassword('')
        setEmail('')
      } else {
        console.log('Failed to register user')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed')
    }
  }

  // const handleChange = (e) => {
  //   setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  // }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="11" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form
                // action="/register"
                // method="POST"
                >
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {userNameError && (
                      <span style={{ color: 'red' }}>{userNameError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <span style={{ color: 'red' }}>{emailError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <span style={{ color: 'red' }}>{passwordError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <select
                      id="province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}>
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="button"
                    onClick={register}>
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login now!</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register
