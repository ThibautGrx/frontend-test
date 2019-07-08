import React, {Component} from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Icon from '@material-ui/core/Icon';




export default class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    }
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
                  <div><span className='h3'>{car.pricePerDay}</span> €/jour</div>
                  <div><span className='h3'>{car.pricePerKm}</span> €/km</div>
                </div>
            </Card.Body>
          </Card>
          </div>
        )
      }
    )}
    </div>
    )}
  }
}