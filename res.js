// Guna dari use strict ini hanya untuk membantu anda menulis kode lebih baik dengan memberikan error ketika mencoba melakukan sesuatu yang dapat biasanya gampang menyebabkan bug.
'use strict'

exports.ok = (values, res) => {
    const data = {
        'status': 200,
        'values': values
    }

    res.json(data)
    res.end()
}