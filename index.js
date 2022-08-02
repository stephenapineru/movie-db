const request = require('request')
const express = require('express')
const app = express()
const logger = require('morgan')


app.set('view engine', 'ejs')
app.use(express.static('public'))

let baseURL = "https://api.themoviedb.org/3/"
let route = "movie/now_playing"
let key = "?api_key=8bc1a8ade887e7aa9f4741265b484e74"
let endpoint = `${baseURL}${route}${key}&language=en-US&page=1`
app.get('/', (req, res) => {

    res.render('home')
})

app.get('/nowplaying', (req,res)=>{
    request(endpoint, (error, response, body)=>{
        if(!error){
            let data = JSON.parse(body)
            res.render('nowplaying', {data: data})
        }else{
            res.render('error', {error: 'Oops something went wrong here...', })
        }
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Now listening on port ${PORT}`))