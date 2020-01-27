const express = require('express')
const app = express()
var models = require('./models');
const bodyParser = require('body-parser')
const allowCors = require('./cors')
const queryParser = require('express-query-int')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)
app.use(queryParser())
const router = express.Router()
const Op = require('Sequelize').Op

app.use('/api', router)

//INÍCIO  - MÉTODOS PARA CITY
app.get('/city/:id', function (req, res) {
    models.City.findAll({
        where: { 
            id: req.params.id 
        }
    })
      .then(o => res.json(o));
});

app.get('/city', function (req, res) {
    models.City.findAll()
      .then(o => res.json(o));
    
});

app.get('/city/name/:name', function (req, res) {
    models.City.findAll({
        where: { 
            name: { [Op.like]: `%${req.params.name}%` }
        }
    })
    .then(o => res.json(o));
});

app.post('/city', function (req, res) {
    models.City.create(req.body)
        .then(o => res.send(o.dataValues));
});

app.patch('/city/:id', function (req, res) {
    models.City.update({
            name: req.body.name,
            uf: req.body.uf
        }, {
        where: {
            id: req.params.id
        }
    })
    .then(o => res.send(o.dataValues));
});

app.delete('/city/:id', function (req, res) {
    models.City.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(o => res.send(o.dataValues));
});
//FIM  - MÉTODOS PARA CITY


//INÍCIO  - MÉTODOS PARA CUSTOMER
app.get('/customer/:id', function (req, res) {
    models.Customer.findAll()
      .then(o => res.json(o));
});

app.get('/customer/:registry', function (req, res) {
    models.Customer.findAll({
        where: {
            registry: req.params.registry
        }
    })
      .then(o => res.json(o));
});

app.get('/customer/:name', function (req, res) {
    models.Customer.findAll({
        where: { 
            name: { [Op.like]: `%${req.params.name}%` }
        }
    })
      .then(o => res.json(o));
});

app.get('/customer/:name', function (req, res) {
    models.Customer.findAll({
        where: { 
            name: { [Op.like]: `%${req.params.name}%` }
        }
    })
      .then(o => res.json(o));
});

app.get('/customer/city/:city', function (req, res) {
    models.Customer.findAll({
        include: [{
          model: models.City,
          where: {
            name: { [Op.like]: `%${req.params.city}%` }
           }
        }]
      })
      .then(o => res.json(o));
});

app.get('/customer/uf/:uf', function (req, res) {
    const Op = require('Sequelize').Op
    models.Customer.findAll({
        include: [{
          model: models.City,
          where: {
            uf: { [Op.like]: `%${req.params.uf}%` }
           }
        }]
      })
      .then(o => res.json(o));
});

app.get('/customer', function (req, res) {
    models.Customer.findAll({
        include: [{
            model: models.City
          }]
    })
      .then(o => res.json(o));
    
});

app.post('/customer', function (req, res) {
    models.Customer.create(req.body)
        .then(o => res.send(o.dataValues));
});

app.patch('/customer/:id', function (req, res) {
    models.Customer.update({
            name: req.body.name,
            street: req.body.street,
            registry: req.body.registry,
            CityId: req.body.CityId
        }, {
        where: {
            id: req.params.id
        }
    })
    .then(o => res.send(o.dataValues));
});

app.delete('/customer/:id', function (req, res) {
    models.Customer.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(o => res.send(o.dataValues));
});
//FIM  - MÉTODOS PARA CUSTOMER

app.listen(3003, () => {
    console.log('start server')
})
