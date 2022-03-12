const express = require('express')
const router = express.Router()
const Car = require('../models/car')

// Getting all
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find()
        res.json(cars)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/soldCars', async (req, res) => {
    try {
        const cars = await Car.find({ sold: true })
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/unsoldCars', async (req, res) => {
    try {
        const cars = await Car.find({ sold: false })
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const car = new Car({
        price: req.body.price,
        carModel: req.body.carModel,
        carName: req.body.carName,
        sold: req.body.sold
    })

    // console.log(typeof (req.body.price))
    // console.log(typeof (req.body.sold))

    try {
        const newCar = await car.save()
        res.status(201).json(newCar)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/car/:id', async (req, res) => {
    let car
    try {
        car = await Car.findById(req.params.id)
        if (car == null) {
            return res.status(404).json({ message: 'Cannot find car' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.json(car);
})

router.patch('/car/:id', async (req, res) => {

    let car

    try {
        car = await Car.findById(req.params.id)
        if (car == null) {
            return res.status(404).json({ message: 'Cannot find car' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if (req.body.sold != null) {
        car.sold = req.body.sold
    }

    try {
        const updatedCar = await car.save()
        res.json(updatedCar)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/car/:id', async (req, res) => {
    try {
        let car
        car = await Car.findById(req.params.id)

        if (car == null) {
            return res.status(404).json({ message: 'Cannot find car' })
        }

        await car.remove()
        res.json({ message: 'Deleted Subscriber' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/sales", async (req, res) => {
    try {
        const cars = await Car.find()

        let totalSalesAmount = 0

        for (let i = 0; i < cars.length; i++) {
            if (cars[i].sold) {
                totalSalesAmount += cars[i].price
            }
        }

        const salesObj = {
            totalSalesAmount: totalSalesAmount
        }

        //console.log(totalSalesAmount);
        res.json(salesObj);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

module.exports = router;