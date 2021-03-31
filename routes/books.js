const express = require('express');
const booksRouter = express.Router();
const path = require('path');
const controller = require('../controller/controller')


booksRouter
    .route('/books')
    .get((req,res) => {
        controller.books(res)
        
    })


booksRouter
    .route('/books/addBook')
    .get((req, res) => {
        
        res.sendFile(path.join(__dirname + '/../public' + '/addBook.html'))
        
    })
    .post((req, res) => {
        controller.addBook(req, res)
        
    })
    
    booksRouter
    .route('/books/updateBook/:id')
    .get((req, res) => {
        controller.getUpdateBook(req, res)
        
    })
    .post((req,res) => {
        controller.updateBook(req, res)
        
    })


booksRouter
    .route('/books/:id')
    .get((req, res) => {
        controller.book(req, res)
        
    })
    .post((req,res) => {
        controller.updateBook(req, res)
        
    })
    .delete((req, res) => {
        controller.deleteBook(req, res)
        
    })
    booksRouter.delete("/book/:id",(req,res)=>{
        // res.send("asdfgh")
        res.json({status: 1})
    })

module.exports = booksRouter