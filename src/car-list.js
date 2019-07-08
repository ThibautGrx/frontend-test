import React, {Component} from 'react';
import axios from 'axios';
import {convertPrice, calculatePrice} from './price-tools';


import {Form, Button, Card} from 'react-bootstrap';

export default class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      queryDuration:'0',
      queryDistance:'0'
      }
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDurationChange(value) {
    this.setState({
      queryDuration: value
    })
  }

  handleDistanceChange(value) {
    this.setState({
      queryDistance: value
    })
  }

  priceCaclculation() {
    this.setState(prevState => ({
      cars: prevState.cars.map(
        el => {
          el.price = calculatePrice(this.state.queryDuration, el.pricePerDay, this.state.queryDistance, el.pricePerKm)
          return(el)
        })
      })
    )
  }

  handleSubmit() {
    axios.get(`http://localhost:3001/cars.json?duration=${this.state.queryDuration}&distance=${this.state.queryDistance}`)
      .then(res => {
        const cars = res.data;
        this.setState({ cars });
        this.priceCaclculation()
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
   
    axios.get(`http://localhost:3001/cars.json`)
      .then(res => {
        const cars = res.data;
        this.setState({ cars });
      })
      .catch(error => console.log(error));
  }

  render() {    
    if (this.state.cars) { 
      return(
        <div className="container">
          <div className='my-2'>
            <h1> Nouvelle recherche </h1>
            
          <Form className="form-inline">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label> Durée de la location:</Form.Label>
              <Form.Control className="mx-2" as="select" onChange={e => this.handleDurationChange(e.target.value)}>
                {Array.from({length: 30}, (v, k) => k+1).map((value,key) => <option key={key}>{value}</option>) }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label> Distance à parcourir: </Form.Label>
              <Form.Control as="select" className="mx-2" onChange={e => this.handleDistanceChange(e.target.value)}>
                {Array.from({length: 60}, (v, k) => 50*k+50).map((value,key) => <option key={key}>{value}</option>) }
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick = {e => this.handleSubmit(e)}>
            Rechercher
          </Button>
          </Form>
          <hr/>
          </div>
          <div className="d-flex flex-row justify-content-around flex-wrap">
          {this.state.cars.map((car,key) => {
            return(
              <div key={car.id}>
                <Card style={{ width: '18rem' }} className="my-3">
                  <Card.Img variant="top" src={car.picturePath} />
                  <Card.Body>
                    <Card.Title>{car.brand + ' ' + car.model}</Card.Title>
                    <hr/>
                      <div className='d-flex flex-row justify-content-between text-info'>
                        <div><span className='h3'>{convertPrice(car.pricePerDay)}</span> €/jour</div>
                        <div><span className='h3'>{convertPrice(car.pricePerKm)}</span> €/km</div>
                      </div>
                  </Card.Body>
                  <Card.Footer> <p className="text-primary h2">{car.price ? convertPrice(car.price)+ '€' : '-- €' }</p></Card.Footer>
                </Card>
              </div>
            );}
          )}
        </div>
        </div>
      )
    }
  }
}