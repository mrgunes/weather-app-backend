let express = require('express');
let router = express.Router();
let axios=require('axios')
require('dotenv').config();

let apiKey=process.env.API_KEY;

/* GET default weather page. */
router.get('/', (req, res, next)=>{
  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=41.0351&lon=28.9833&exclude=&appid=${apiKey}&units=metric`)
  .then((response)=>{res.json(response.data)})
  .catch((err)=>{res.json(err)})
});

/* GET search page. */
router.get('/:city/:unit', (req,res,next)=>{
  console.log(req.params.city)
  console.log(req.params.unit)
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`) 
        .then((firstRes) =>
        Promise.all([
        firstRes,
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${firstRes.data.coord.lat}&lon=${firstRes.data.coord.lon}&exclude=&appid=${apiKey}&units=${req.params.unit}`)
        ]))
        .then(([firstResponse, secondResponse]) => {
        res.json([firstResponse.data,secondResponse.data]);
        })
        .catch((err)=>{res.json(err)})
})

module.exports = router;
