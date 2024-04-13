import React, { useState } from 'react'

import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/login.css'

import loginImg from '../assets/images/login.jpg'
import userIcon from '../assets/images/user.png'

const Login = () => {
  // const [credentials, setCredentials] = useState({
  //   email: undefined,
  //   password: undefined,
  // })
  const [username, setUsername] = useState('Username')
  const [password, setPassword] = useState('Password')
  // const handleChange = (e) => {
  //   setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  // }
  const handleClick = (e) => {
    e.preventDefault()
  }
  const loginFunc = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        console.log('Logged in successfully')
        window.location.href = '/loginSuccess'
        setUsername('')
        setPassword('')
      } else {
        alert('Failed to login')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed')
    }
  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="11" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    onClick={loginFunc}>
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account?
                  <Link to="/register">Register now!</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
