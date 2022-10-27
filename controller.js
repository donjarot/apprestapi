// Guna dari use strict ini hanya untuk membantu anda menulis kode lebih baik dengan memberikan error ketika mencoba melakukan sesuatu yang dapat biasanya gampang menyebabkan bug.
'use strict'

const response = require('./res')
const connection = require('./koneksi')

exports.index = (req, res) => {
    response.ok('Aplikasi rest API berjalan', res)
}

// Menampilkan semua data mahsaiswa
exports.tampilsemuamahasiswa = (req, res) => {
    const sql = 'SELECT * FROM mahasiswa'
    connection.query(sql, (error, rows, fileds) => {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

// Menampilkan data mahasiswa berdasarkan id
exports.tempilberdasarkanid = (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM mahasiswa WHERE id_mahasiswa = ${id}`
    connection.query(sql, (error, rows, fileds) => {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}