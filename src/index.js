const path = require('path')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('port', 3000)

app.engine('html', require('pug').renderFile)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(app.get('port'), () => {
	console.log('🚀 Servidor escuchando en el puerto', app.get('port'))
})
