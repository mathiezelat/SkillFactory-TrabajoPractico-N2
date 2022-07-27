const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query('SELECT * FROM position', (err, rows, fields) => {
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
			'SELECT * FROM position WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { name } = req.body
		const query = 'CALL addOrEditPosition(?, ?)'
		mysqlConnection.query(query, [0, name], (err, rows, fields) => {
			if (!err) {
				res.status(201).send('Posicion añadido correctamente')
			} else {
				console.log(err)
			}
		})
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { name } = req.body
		const query = 'CALL addOrEditPosition(?, ?)'
		mysqlConnection.query(query, [id, name], (err, rows, fields) => {
			if (!err) {
				res.status(201).send('Posicion editado correctamente')
			} else {
				console.log(err)
			}
		})
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM position WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send('Posicion eliminada correctamente')
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar la posicion'
					)
				}
			}
		)
	})

module.exports = router
