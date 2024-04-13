import React, { useState, useEffect } from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import Booking from '../components/Booking/Booking'
// import tourData from '../assets/data/tours'

const TourDetails = () => {
  const { id } = useParams()
  const [tourDetailData, setTourDetailData] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3000/trips/${id}`)
      .then((response) => response.json())
      .then((data) => setTourDetailData(data))
      .catch((error) => console.error('Error fetching tools data:', error))
  }, [id])

  const { photo, title, city, trailLength, maxGroupSize, desc } = tourDetailData
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour_content">
                <img src={photo} alt="" />
                <div className="tour_info">
                  <h2>{title}</h2>
                  <div className="tour_extra_details">
                    <span>
                      <i class="ri-map-2-line"> {city}</i>
                    </span>
                  </div>
                  <div className="tour_description">
                    <p>{desc}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default TourDetails
