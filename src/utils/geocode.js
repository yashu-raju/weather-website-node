// geocode /////
// const geocodeUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoieWFzaHdhbnRocmFqdSIsImEiOiJja3M2NjhnZXQwN3ZqMnVwc2FmOXowcnRmIn0.BQmfsyo3wDxc4pxj20CXmg&limit=1"
// request({url:geocodeUrl, json:true},(error,response)=>{
//     const latitude=response.body.features[0].center[1];
//     const longitude=response.body.features[0].center[0];
//     console.log(latitude,longitude)
// }
// )

const request=require('request')
const geocode=((address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoieWFzaHdhbnRocmFqdSIsImEiOiJja3M2NjhnZXQwN3ZqMnVwc2FmOXowcnRmIn0.BQmfsyo3wDxc4pxj20CXmg&limit=1"
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect',undefined)
        }else if(response.body.features.length===0)
        {
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
})

module.exports=geocode