const express = require('express');
const usersRouter = express.Router();
const controller = require('../controller/controller')
const { validationResult } = require('express-validator');
const validation = require('../validation/validationMidleware');
const auth = require('../middleware/auth')



usersRouter
    .route('/')
    .get((req,res) => {
        controller.users(res)
    })
    .delete((req, res) => {
        controller.deleteUser(req, res)
        
    })

usersRouter
    .route('/login')
    .get((req,res) => {
        res.render("mainTemplate", {
            title: "Login",
            render: "login",
        });
    })
    .post((req, res) => {
        controller.loginUser(req, res)
    }) 

usersRouter
    .route('/addUser')
    .get((req, res) => {
        res.render("mainTemplate", {
            title: "Add User",
            render: "addUser",
            err: null,
            errors: null
        });
    })
    .post(validation.user(), (req, res) => {
        const errors = validationResult(req).array();
        if(errors.length > 0){
            req.session.errors = errors;
            res.render("mainTemplate", {
                title: "Add User",
                render: "addUser",
                err: null,
                errors: req.session.errors
            });
            //res.render('addUser', { errors: req.session.errors ,err:null});
        } else {
            controller.addUser(req, res)
        }
    })
    
usersRouter
    .route('/updateUser/:id')
    .get((req, res) => {
        controller.getUpdateUser(req, res)
    })
    .post((req,res) => {
        controller.updateUser(req, res)
    })
usersRouter
    .route('/:id')
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