import React from 'react'
import '../styles/home.css'

import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img.png'
import Subtitle from './../shared/Subtitle'

import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'

const Home = () => {
  return (
    <>
      <div>
        <Container style={{ marginTop: '30px' }}>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle
                    subtitle={'Make friends who love nature just like you'}
                  />
                </div>
                <h1>
                  New adventure <span className="highlight">awaits!</span>
                </h1>
                <p>
                  Join one of our trips to make new friends and create new
                  memories! We have more than 4 trails to choose from every
                  week, all trips are taken in Ontario.
                </p>
              </div>
            </Col>
            <Col lg="6">
              <div className="hero_img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container style={{ marginTop: '10px' }}>
          <Row>
            <Col lg="6" className="mb-5">
              <h2 className="featured_tour-title">
                <span className="highlight">Explore</span>
              </h2>
              <h2 className="featured_tour-title">Our most popular trips</h2>
            </Col>
          </Row>
          <Row>
            <FeaturedTourList />
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Home
