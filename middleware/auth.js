const mysql = require('mysql')
const md5 = require('md5')
const response = require('../res')
const jwt = require('jsonwebtoken')
const ip = require('ip')
const connection = require('../koneksi')
const config = require('../config/secret')

// Controller untuk register
exports.registrasi = (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    const sqlCekEmail = `SELECT email from user WHERE email = '${post.email}'`
    connection.query(sqlCekEmail, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            if (rows.length == 0) {
                const sql = `INSERT INTO user (username, email, password, role, tanggal_daftar) VALUES ('${post.username}', '${post.email}', '${post.password}', ${post.role}, ${post.tanggal_daftar})`
                connection.query(sql, post, (error, rows) => {
                    if (error) {
                        console.log(error)
                    } else {
                        response.ok('Berhasil menambahkan user baru', res)
                    }
                })
            } else {
                response.ok('Email sudah terdaftar!')
            }
        }
    })
}