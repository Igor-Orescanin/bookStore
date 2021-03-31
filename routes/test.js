const express = require('express')
const router = express.Router()
const path = require('path')

router.get("/", (request, response)=>{
    response.sendFile(path.join(__dirname + '/../public/index.html'))
})




module.exports = router