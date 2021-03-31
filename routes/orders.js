const express = require('express');
const ordersRouter = express.Router();
const controller = require('../controller/controller');
const path = require('path');


ordersRouter
    .route('/orders')
    .get((req,res) => {
        controller.orders(res)
        
    })
    
ordersRouter
    .route('/orders/check/:id')
    .get((req,res) => {
        controller.checkOrder(req, res)
        
    })    

ordersRouter
    .route('/orders/addOrder')
    .get((req, res) => {
        res.sendFile(path.join(__dirname + '/../public' + '/addOrder.html'))
        
    })
    .post((req, res) => {
        controller.addOrder(req, res)
    })
    
ordersRouter
    .route('/orders/updateOrder/:id')
    .get((req, res) => {
        controller.getUpdateOrder(req, res)
    })
    .post((req,res) => {
        controller.updateOrder(req, res)
    })




ordersRouter
    .route(`/orders/:id`)
    .get((req, res) => {
        controller.order(req, res)
    })
    .put((req,res) => {
        controller.updateOrder(req, res)
    })
    .delete((req, res) => {
    controller.deleteOrder(req, res)
    })

module.exports = ordersRouter