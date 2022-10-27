const mysql = require('mysql')

// Membuat koneksi database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbrestapi'
})

conn.connect((error) => {
    if (error) throw error
    console.log('Koneksi ke Database berhasil');
})

module.exports = conn