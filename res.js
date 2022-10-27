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

// Response untuk nested matakuliah
exports.oknested = (values, res) => {
    // Lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // Tentukan key group
        if (akumulasikan[item.nama]) {
            // Buat variabel nama mahasiswa
            const group = akumulasikan[item.nama]
            // Cek jika isi array adalah matakuliah
            if (Array.isArray(group.matakuliah)) {
                // Tambahkan kee dalam group matakuliah
                group.matakuliah.push(item.matakuliah)
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        } else {
            akumulasikan[item.nama] = item
        }

        return akumulasikan
    }, {})

    const data = {
        'status': 200,
        'values': hasil
    }

    res.json(data)
    res.end()
}