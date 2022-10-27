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

// Mengubah data berdasarkan ID
exports.ubahmahasiswa = (req, res) => {
    const id = req.params.id
    const nim = req.body.nim
    const nama = req.body.nama
    const jurusan = req.body.jurusan

    const sql = `UPDATE mahasiswa SET nim = ${nim}, nama = '${nama}', jurusan = '${jurusan}' WHERE id_mahasiswa = ${id}`
    connection.query(sql, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok('Berhasil mengubah data', res)
        }
    })
}

// Menghapus data berdasarkan ID
exports.hapusmahasiswa = (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM mahasiswa WHERE id_mahasiswa=${id}`
    connection.query(sql, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok('Berhasil menghapus data', res)
        }
    })
}

// Menampilkan matakuliah group
exports.tampilgroupmatakuliah = (req, res) => {
    const sql = 'SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa'
    connection.query(sql, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.oknested(rows, res)
        }
    })
}