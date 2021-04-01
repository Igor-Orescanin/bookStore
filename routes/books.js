const express = require('express');
const booksRouter = express.Router();
const path = require('path');
const controller = require('../controller/controller')


booksRouter
    .route('/')
    .get((req,res) => {
        controller.books(res)
    })


booksRouter
    .route('/addBook')
    .get((req, res) => {
        res.render("mainTemplate", {
            title: "Add Book",
            render: "addBook"
        });
    })
    .post((req, res) => {
        controller.addBook(req, res)
        
    })
    
    booksRouter
    .route('/updateBook/:id')
    .get((req, res) => {
        controller.getUpdateBook(req, res)
        
    })
    .post((req,res) => {
        controller.updateBook(req, res)
        
    })


booksRouter
    .route('/:id')
    .get((req, res) => {
        controller.book(req, res)
        
    })
    .post((req,res) => {
        controller.updateBook(req, res)
        
    })
    .delete((req, res) => {
        controller.deleteBook(req, res)
        
    })
booksRouter.delete("/:id",(req,res)=>{
        res.json({status: 1})
    })

module.exports = booksRouter