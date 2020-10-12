import express from 'express'
import hbs from 'hbs'
import morgan from 'morgan'
import path from 'path'
import bodyParser from  'body-parser'
import {initDatabase, initTable, insertProduct, getProduct} from './database.js'

const __dirname=path.resolve()

const app= express()
const db = initDatabase()
initTable(db)

app.set('views',__dirname+'/layout')
app.set('view engine','html')
app.engine('html', hbs.__express)

//log incoming request
app.use(morgan('combined'))

// parse request body
app.use(bodyParser.urlencoded())

// serve static file
app.use('/asset', express.static(__dirname + '/asset'))


app.get('/',(req, res, next)=>{
    res.send({success : true})
})

app.get('/product',(req,res,next)=>{
    getProduct(db).then(product =>{
        console.log('Product Result', product)
        res.render('product')
    }).catch (error => {
        console.error(error)
    })
})

//handle form GET Method
app.get('/add-product',(req,res,next)=>{
    res.send(req.query)
})

//handle form POST Method
app.post('/add-product',(req,res,next)=>{
    console.log('Request',req.body)
    //insert product
    insertProduct(db, req.body.name, parseInt(req.body.price),'-')

    //redirect 
    res.redirect('/product')
})

app.use((err, req, res, next)=>{
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8080')
})