import React, { useState, useEffect } from 'react'
import TourCard from '../../shared/TourCard'
import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'

const FeaturedTourList = () => {
  // const [tourDetailData, setTourDetailData] = useState([])
  // useEffect(() => {
  //   fetch(`http://localhost:3006/trips`)
  //     .then((response) => response.json())
  //     .then((data) => setTourDetailData(data))
  //     .catch((error) => console.error('Error fetching tools data:', error))
  // }, [])

  return (
    <>
      {tourData?.map((tour) => (
        <Col lg="3" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
      {/* {tourDetailData?.map((tour) => (
        <Col lg="3" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))} */}
    </>
  )
}
export default FeaturedTourList
