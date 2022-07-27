const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query('SELECT * FROM stocks', (err, rows, fields) => {
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
			'SELECT * FROM stocks WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { quantity, store_id, product_id } = req.body
		const query = 'CALL addOrEditStocks(?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[0, quantity, store_id, product_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Stock añadido correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { quantity, store_id, product_id } = req.body
		const query = 'CALL addOrEditStocks(?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[id, quantity, store_id, product_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Stock editado correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM stocks WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send('Stock eliminado correctamente')
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar el stock'
					)
				}
			}
		)
	})

module.exports = router
