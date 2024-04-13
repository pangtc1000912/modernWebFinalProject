import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './tour-card.css'

const TourCard = ({ tour }) => {
  const { id, title, city, photo, trailLength, featured } = tour

  return (
    <div className="tour_card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt="tour-img" />
          <span>Featured</span>
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-star-fill"></i>
              {city}
            </span>
          </div>
          <h5 className="tour__title">
            <Link to={`/trips/${id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {trailLength}
              <span> hr's trail</span>
            </h5>
            <button
              className="booking__btn btn"
              style={{ background: 'var(--secondary-color)' }}>
              <Link to={`/trips/${id}`}>Join the Trip</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
export default TourCard
