const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query(
			'SELECT * FROM order_products',
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
			'SELECT * FROM order_products WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { quantity, total, order_id, product_id } = req.body
		const query = 'CALL addOrEditOrder_products(?, ?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[0, quantity, total, order_id, product_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send(
						'Productos de pedido añadido correctamente'
					)
				} else {
					console.log(err)
				}
			}
		)
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { quantity, total, order_id, product_id } = req.body
		const query = 'CALL addOrEditOrder_products(?, ?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[id, quantity, total, order_id, product_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send(
						'Productos de pedido editado correctamente'
					)
				} else {
					console.log(err)
				}
			}
		)
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM order_products WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send(
						'Producto de pedido eliminado correctamente'
					)
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar el producto de pedido'
					)
				}
			}
		)
	})

module.exports = router
