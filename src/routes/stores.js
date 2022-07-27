const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query('SELECT * FROM stores', (err, rows, fields) => {
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
			'SELECT * FROM stores WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { name, city } = req.body
		const query = 'CALL addOrEditStores(?, ?, ?)'
		mysqlConnection.query(query, [0, name, city], (err, rows, fields) => {
			if (!err) {
				res.status(201).send('Sucursal añadido correctamente')
			} else {
				console.log(err)
			}
		})
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { name, city } = req.body
		const query = 'CALL addOrEditStores(?, ?, ?)'
		mysqlConnection.query(query, [id, name, city], (err, rows, fields) => {
			if (!err) {
				res.status(201).send('Sucursal editado correctamente')
			} else {
				console.log(err)
			}
		})
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM stores WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send('Sucursal eliminada correctamente')
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar la sucursal'
					)
				}
			}
		)
	})

module.exports = router
