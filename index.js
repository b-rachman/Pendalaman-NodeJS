import express from 'express'
import hbs from 'hbs'
import morgan from 'morgan'
import path from 'path'

const __dirname=path.resolve()

const app= express()

app.set('views',__dirname+'/layout')
app.set('view engine','html')
app.engine('html', hbs.__express)

//log incoming request
app.use(morgan('combined'))

// serve static file
app.use('/asset', express.static(__dirname + '/asset'))


app.get('/',(req, res, next)=>{
    res.send({success : true})
})

app.get('/product',(req,res,next)=>{
    res.render('product')
})

app.use((err, req, res, next)=>{
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8080')
})