// Guna dari use strict ini hanya untuk membantu anda menulis kode lebih baik dengan memberikan error ketika mencoba melakukan sesuatu yang dapat biasanya gampang menyebabkan bug.
'use strict'

const response = require('./res')
const connection = require('./koneksi')

exports.index = (req, res) => {
    response.ok('Aplikasi rest API berjalan')
}