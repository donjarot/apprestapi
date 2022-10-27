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
    connection.query(sql, (error, rows, fields) => {
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
    connection.query(sql, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

// Menambahkan data mahasiswa
exports.tambahmahasiswa = (req, res) => {
    const nim = req.body.nim
    const nama = req.body.nama
    const jurusan = req.body.jurusan

    const sql = `INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (${nim}, '${nama}', '${jurusan}')`
    connection.query(sql, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok('Berhasil menambahkan data', res)
        }
    })
}