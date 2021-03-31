const express = require('express');
const usersRouter = express.Router();
const controller = require('../controller/controller')
const { validationResult } = require('express-validator');
const validation = require('../validation/validationMidleware');
const auth = require('../middleware/auth')



usersRouter
    .route('/users')
    .get((req,res) => {
        controller.users(res)
    })
    .delete((req, res) => {
        controller.deleteUser(req, res)
        
    })

usersRouter
    .route('/users/login')
    .get((req,res) => {
        res.render('login')
    })
    .post((req, res) => {
        controller.loginUser(req, res)
    }) 

usersRouter
    .route('/users/addUser')
    .get((req, res) => res.render('addUser', { errors: null, err:null }))
    .post(validation.user(), (req, res) => {
        const errors = validationResult(req).array();
        if(errors.length > 0){
            req.session.errors = errors;
            res.render('addUser', { errors: req.session.errors ,err:null});
        } else {
            controller.addUser(req, res)
        }
    })
    
usersRouter
    .route('/users/updateUser/:id')
    .get((req, res) => {
        controller.getUpdateUser(req, res)
    })
    .post((req,res) => {
        controller.updateUser(req, res)
    })
usersRouter
    .route('/users/:id')
    .get((req, res) => {
        controller.user(req, res)
    })
    .post((req,res) => {
        controller.updateUser(req, res)
    })
    .delete(auth, (req, res) => {
        controller.deleteUser(req, res)
    })

   


module.exports = usersRouter    