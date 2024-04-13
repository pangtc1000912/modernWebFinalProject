import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const LoginSuccess = () => {
  return (
    <section>
      <Container>
        <div style={{ textAlign: 'center' }}>
          <h4>Logged in successfully.</h4>
          <h4>
            <Link to="/home">Now let's start hiking.</Link>
          </h4>
        </div>
      </Container>
    </section>
  )
}

export default LoginSuccess
