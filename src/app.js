const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require("./utils/geocode.js")
const forecast=require("./utils/forecast.js")

const app=express()

// app.get('',(req,res)=>{
//     res.send('hello Express!')
// })

// app.get('/help',(req,res)=>{
//     res.send('help page!')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page<h1>')
// })

//defining paths for express configuration
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const port=process.env.PORT||3000

//ste up handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
         title:'Weather',
         name:"Yashwanth"
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
         title:'About',
         name:"Yashwanth"
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
         title:'help',
         name:"Yashwanth"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"provide the address"
        })
    }
   
        geocode(req.query.address,(error,data)=>{
            if(error)
            {
                return res.send({
                    error:"provide the correct address"
                })
            }
              forecast( data.latitude, data.longitude, (error, forecastData) => {
                 if(error)
                 {
                     return res.send({
                        error:"provide correct the address"
                    })
                 }
                // console.log(data.location)
                 //console.log(forecastData)
                 res.send({
                    forecast:forecastData,
                    location:data.location,
                    address:req.query.address
                })
               })
          })
    
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Yashwanth",
        errorMessage:"help article not found"
   })
    //res.send("help article not found")
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Yashwanth",
        errorMessage:"page not found"
   })
    //res.send("my 404 page")
})

app.listen(3000,()=>{
    console.log('server is on port'+3000)
})