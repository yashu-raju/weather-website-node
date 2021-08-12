const request=require('request')

// const url="http://api.weatherstack.com/current?access_key=8cb3ced8870a05711076e59a300afb1f&query=37.8267,-122.4233"
// request({url:url, json:true},(error,response)=>{
// //    const data=JSON.parse(response.body)
// //    console.log(data.current)
// //console.log(response.body.current)
//    const current=response.body.current;
// console.log(`it is currently ${current.temperature} degrees out, There is ${current.weather_descriptions[0]}% chance of rain`)
// }
// )

const forecast=((latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=8cb3ced8870a05711076e59a300afb1f&query="+latitude+","+longitude+""
    request({url, json:true},(error,response)=>{
        const current=response.body.current;
        if(error)
        {
            callback('unable to connect to weather service',undefined)
        }else if(response.body.error)
        {
            callback('unable to find location',undefined)
        }else{
            
            callback(undefined,`It is currently ${current.temperature} degrees out, There is ${current.weather_descriptions[0]} humidity out there` ) 
    }  
        
   
    })
})

module.exports=forecast