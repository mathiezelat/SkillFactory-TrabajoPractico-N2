const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query('SELECT * FROM products', (err, rows, fields) => {
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
			'SELECT * FROM products WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { name, price, categories_id } = req.body
		const query = 'CALL addOrEditProducts(?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[0, name, price, categories_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Producto añadido correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { name, price, categories_id } = req.body
		const query = 'CALL addOrEditProducts(?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[id, name, price, categories_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Producto editado correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM products WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send('Producto eliminado correctamente')
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar el producto'
					)
				}
			}
		)
	})

module.exports = router
