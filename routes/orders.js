const express = require('express');
const ordersRouter = express.Router();
const controller = require('../controller/controller');
const path = require('path');


ordersRouter
    .route('/')
    .get((req,res) => {
        controller.orders(res)
        
    })
    
ordersRouter
    .route('/check/:id')
    .get((req,res) => {
        controller.checkOrder(req, res)
        
    })    

ordersRouter
    .route('/addOrder')
    .get((req, res) => {
        res.render("mainTemplate", {
            title: "Add Order",
            render: "addOrder"
        })
    })
    .post((req, res) => {
        controller.addOrder(req, res)
    })
    
ordersRouter
    .route('/updateOrder/:id')
    .get((req, res) => {
        controller.getUpdateOrder(req, res)
    })
    .post((req,res) => {
        controller.updateOrder(req, res)
    })

ordersRouter
    .route(`/:id`)
    .get((req, res) => {
        controller.order(req, res)
    })
    .post((req,res) => {
        controller.updateOrder(req, res)
    })
    .delete((req, res) => {
    controller.deleteOrder(req, res)
    })

module.exports = ordersRouter