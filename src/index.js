// IMPORTS MODULES
const path = require('path')
const express = require('express')
const morgan = require('morgan')

// IMPORTS ROUTES
const categories = require('./routes/categories.js')
const customers = require('./routes/customers.js')
const orderProducts = require('./routes/orderProducts.js')
const orders = require('./routes/orders.js')
const position = require('./routes/position.js')
const products = require('./routes/products.js')
const staff = require('./routes/staff.js')
const stocks = require('./routes/stocks.js')
const stores = require('./routes/stores.js')

// CREATE EXPRESS APPLICATION
const app = express()

// MIDDLEWARES
app.set('port', 3000)

app.engine('html', require('pug').renderFile)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(morgan('dev'))

// ROUTES
app.use('/categories', categories)
app.use('/customers', customers)
app.use('/order_products', orderProducts)
app.use('/orders', orders)
app.use('/position', position)
app.use('/products', products)
app.use('/staff', staff)
app.use('/stocks', stocks)
app.use('/stores', stores)

app.get('/', (req, res) => {
	res.render('index')
})

// LISTEN
app.listen(app.get('port'), () => {
	console.log('🚀 Servidor escuchando en el puerto', app.get('port'))
})
