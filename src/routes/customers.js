const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query(
			'SELECT * FROM customers',
			(err, rows, fields) => {
				if (!err) {
					res.status(200).json(rows)
				} else {
					console.log(err)
				}
			}
		)
	})
	.get('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'SELECT * FROM customers WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { name, email } = req.body
		const query = 'CALL addOrEditCustomers(?, ?, ?)'
		mysqlConnection.query(query, [0, name, email], (err, rows, fields) => {
			if (!err) {
				res.status(201).send('Cliente añadido correctamente')
			} else {
				console.log(err)
			}
		})
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { name, email } = req.body
		const query = 'CALL addOrEditCustomers(?, ?, ?)'
		mysqlConnection.query(query, [id, name, email], (err, rows, fields) => {
			if (!err) {
				res.status(201).send('Cliente editado correctamente')
			} else {
				console.log(err)
			}
		})
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM customers WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send('Cliente eliminado correctamente')
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar el cliente'
					)
				}
			}
		)
	})

module.exports = router
