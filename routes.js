// Guna dari use strict ini hanya untuk membantu anda menulis kode lebih baik dengan memberikan error ketika mencoba melakukan sesuatu yang dapat biasanya gampang menyebabkan bug.
'use strict'

module.exports = (app) => {
    const jsonku = require('./controller')

    app.route('/')
        .get(jsonku.index)
}