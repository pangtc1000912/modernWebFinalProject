import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const RegisterSuccess = () => {
  return (
    <section>
      <Container>
        <div style={{ textAlign: 'center' }}>
          <h4>Thank you for registering with us.</h4>
          <h4>
            <Link to="/login">Now you can login.</Link>
          </h4>
        </div>
      </Container>
    </section>
  )
}

export default RegisterSuccess
