const express = require('express')
const AuthController = require('../controlles/AuthController')
const TeacherController = require('../controlles/TeacherController')
const route =express.Router()
const auth = require('../middleware/auth')
const StudentController = require('../controlles/StudentController')


//auth
route.post('/register',AuthController.register)
route.post('/login',AuthController.login)

//teachercontroller
route.post('/addresult',auth,TeacherController.addResult)
route.get('/allresult',auth,TeacherController.allResults)

//myresult
route.get('/myresult',auth,StudentController.myResults)









module.exports =route