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
                const sql = `INSERT INTO user (username, email, password, role, tanggal_daftar) VALUES ('${post.username}', '${post.email}', '${post.password}', ${post.role}, '${post.tanggal_daftar}')`
                connection.query(sql, post, (error, rows) => {
                    if (error) {
                        console.log(error)
                    } else {
                        response.ok('Berhasil menambahkan user baru', res)
                    }
                })
            } else {
                response.ok('Email sudah terdaftar!', res)
            }
        }
    })
}

// Controller untuk login
exports.login = (req, res) => {
    const post = {
        email: req.body.email,
        password: md5(req.body.password)
    }

    const sql = `SELECT * FROM user WHERE email = '${post.email}' AND password = '${post.password}'`
    connection.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            if (rows.length == 1) {
                const token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                })
                id_user = rows[0].id

                const data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                const sqlAksesToken = `INSERT INTO akses_token (id_user, access_token, ip_address) VALUES ('${data.id_user}', '${data.access_token}', '${data.ip_address}')`

                connection.query(sqlAksesToken, data, (error, rows) => {
                    if (error) {
                        console.log(error)
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        })
                    }
                })
            } else {
                res.json({
                    'Error': true,
                    'Message': 'Email atau password salah'
                })
            }
        }
    })

}