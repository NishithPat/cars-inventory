import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const [cars, setCars] = useState([]);
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [soldStatus, setSoldStatus] = useState(false);

  const carData = async () => {
    let response = await fetch(`https://cars-ni8mare.herokuapp.com/cars`)
    let data = await response.json();
    setCars(data);
  }

  const soldCarData = async () => {
    let response = await fetch(`https://cars-ni8mare.herokuapp.com/cars/soldCars`)
    let data = await response.json();
    setCars(data);
  }

  const unsoldCarData = async () => {
    let response = await fetch(`https://cars-ni8mare.herokuapp.com/cars/unsoldCars`)
    let data = await response.json();
    setCars(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let car = {
      price: carPrice,
      carModel: carModel,
      carName: carName,
      sold: soldStatus
    }

    console.log(car);

    let response = await fetch('https://cars-ni8mare.herokuapp.com/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    });

    let data = await response.json();
    console.log(data.carName);

    setCarName("");
    setCarModel("");
    setCarPrice("");
    setSoldStatus(false);

    carData();

  }

  const changeStatus = async (id) => {

    let updatedvalue = {
      sold: true
    }

    let response = await fetch(`https://cars-ni8mare.herokuapp.com/cars/car/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedvalue)
    });
    let data = await response.json();

    console.log(data.sold);

    carData();
  }

  return (
    <div className='container-sm'>
      <h1 className='fw-bold'>
        INVENTORY MANAGEMENT
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="carName">
              Car Name
              <input id="carName" className="form-control" type="text" value={carName} onChange={(event) => { setCarName(event.target.value) }} required />
            </label>
          </div>
          <div className='mb-3'>
            <label className="form-label" htmlFor="carModel">
              Car Model
              <input id="carModel" className="form-control" type="text" value={carModel} onChange={(event) => { setCarModel(event.target.value) }} required />
            </label>
          </div>
          <div className='mb-3'>
            <label className="form-label" htmlFor="carPrice">
              Price
              <input id="carPrice" className="form-control" type="number" value={carPrice} onChange={(event) => { setCarPrice(event.target.value) }} required />
            </label>
          </div>
          <div onChange={(event) => setSoldStatus(event.target.value)}>
            <div className="form-check form-check-inline">
              <input className="form-check-input" value={true} type="radio" name="soldStatus" id="flexRadioDefault1" required />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Sold
              </label>
            </div>
            <div className="form-check form-check-inline mb-3">
              <input className="form-check-input" value={false} type="radio" name="soldStatus" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Unsold
              </label>
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <div className="btn-group mb-3" >
        <button type="button" className="btn btn-outline-primary" onClick={carData}>Cars Data</button>
        <button type="button" className="btn btn-outline-primary" onClick={soldCarData}>Sold Cars Data</button>
        <button type="button" className="btn btn-outline-primary" onClick={unsoldCarData}>Unsold Cars Data</button>
      </div>
      <div className='row row-cols-auto'>
        {cars.length !== 0 && cars.map((car) => (
          <div key={car._id} className="card mb-3 col m-1" style={{ width: "18rem" }}>
            <div className='card-body'>
              <p><span className="fw-bold">Car Name:</span> {car.carName}</p>
              <p><span className="fw-bold">Car Model:</span> {car.carModel}</p>
              <p><span className="fw-bold">Car Price:</span> {car.price}</p>
              <p><span className="fw-bold">SKU:</span> {car.sku}</p>
              <p><span className="fw-bold">Status:</span> {car.sold ? <span>sold</span> : <span>unsold</span>}</p>
              {!car.sold && <button className="btn btn-outline-primary" onClick={() => changeStatus(car._id)}>Change status to sold</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
