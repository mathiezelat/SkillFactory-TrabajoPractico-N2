const express = require('express')
const mysqlConnection = require('../database/mysqlconnection.js')

const router = express.Router()

router
	.get('/', (req, res) => {
		mysqlConnection.query('SELECT * FROM staff', (err, rows, fields) => {
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
			'SELECT * FROM staff WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).json(rows[0])
				}
			}
		)
	})
	.post('/', (req, res) => {
		const { name, position_id, store_id } = req.body
		const query = 'CALL addOrEditStaff(?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[0, name, position_id, store_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Empleado añadido correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.put('/:id', (req, res) => {
		const { id } = req.params
		const { name, position_id, store_id } = req.body
		const query = 'CALL addOrEditStaff(?, ?, ?, ?)'
		mysqlConnection.query(
			query,
			[id, name, position_id, store_id],
			(err, rows, fields) => {
				if (!err) {
					res.status(201).send('Empleado editado correctamente')
				} else {
					console.log(err)
				}
			}
		)
	})
	.delete('/:id', (req, res) => {
		const { id } = req.params
		mysqlConnection.query(
			'DELETE FROM staff WHERE id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.status(200).send('Empleado eliminado correctamente')
				} else {
					console.log(err)
					res.status(400).send(
						'Ha ocurrido un error al eliminar el empleado'
					)
				}
			}
		)
	})

module.exports = router
