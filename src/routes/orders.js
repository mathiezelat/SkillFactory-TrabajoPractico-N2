const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query('SELECT * FROM orders', (err, rows, fields) => {
			if (!err) {
				res.status(200).json(rows)
			} else {
				console.log(err)
			}
		})
	})
	.get('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'SELECT * FROM orders WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { status, store_id, staff_id, customer_id } = req.body
		const query = 'CALL addOrEditOrders(?, ?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[0, status, store_id, staff_id, customer_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Pedido añadido correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { status, store_id, staff_id, customer_id } = req.body
		const query = 'CALL addOrEditOrders(?, ?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[id, status, store_id, staff_id, customer_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Pedido editado correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM orders WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send('Orden eliminada correctamente')
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar la orden'
					)
				}
			}
		)
	})

module.exports = router
