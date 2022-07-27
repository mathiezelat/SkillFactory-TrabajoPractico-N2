const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345678',
	database: 'latablita',
})

mysqlConnection.connect(err => {
	if (err) {
		console.log(err)
	} else {
		console.log('✅ Conectado a la base de datos')
	}
})

module.exports = mysqlConnection
