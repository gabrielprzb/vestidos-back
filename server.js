const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { User, Dress, Order } = require('./schemas');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server has been initialized on port:${PORT}`)
});


app.post('/user/create', (req, res) => {

    const {
        name,
        profilePicture,
        rating,
        city,
        cp,
        email,
        password
    } = req.body;

    const newUser = User({
        name,
        profilePicture,
        rating,
        city,
        cp,
        email,
        password
    })

    newUser.save((err, user) => {

        if (err) res.status(409).send({ message: 'Hubo un error al crear el usuario', error: err })
        else {
            res.status(201).send({ message: 'Usuario creado con éxito', usuario: user })
        }

    })

})

app.post('/dress/create', (req, res) => {

    const {
        picture,
        user,
        size,
        type, //coctel, etiquite, etc
        color,
        brand,
        description,
        availability,
        price,
        warranty //Por si se daña
    } = req.body;


    const newDress = Dress({
        picture,
        user,
        size,
        type, //coctel, etiquite, etc
        color,
        brand,
        description,
        availability,
        price,
        warranty
    })

    newDress.save((err, dress) => {

        if (err) res.status(409).send({ message: 'Hubo un error al crear el vestido', error: err })
        else {
            res.status(201).send({ message: 'Vestido creado con éxito', dress: dress })
        }

    })

})

app.post('/order/create', (req, res) => {

    const {
        dress,
        user,
        returnDate,
        getDate
    } = req.body;


    const newOrder = Order({
        dress,
        user,
        returnDate,
        getDate
    })

    newOrder.save((err, order) => {

        if (err) res.status(409).send({ message: 'Hubo un error al crear el pedido', error: err })
        else {
            res.status(201).send({ message: 'Pedido creado con éxito', order: order })
        }

    })

})


app.get('/dress', (req, res) => { // donde se jalan todos los vestidos

    let userId = req.query.userId;
    Dress.find({})
        .exec((err, dresses) => {
            if (err) res.status(409).send({ dresses: null, error: err })
            else {
                res.status(201).send({ dresses: dresses })
            }

        })
})

app.get('/order', (req, res) => { // donde se jalan todos los vestidos
    Order.find({})
        .exec((err, orders) => {
            if (err) res.status(409).send({ orders: null, error: err })
            else {
                res.status(201).send({ orders: orders })
            }

        })
})