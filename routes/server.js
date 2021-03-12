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


router.post('/search',(req,res,next)=>{
  let {searchCity}=req.body
  res.send(searchCity)
})

/* GET search page. */
router.get('/weather', (req,res,next)=>{
  console.log(req.body)
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.searchCity}&appid=${apiKey}&units=metric`) 
        .then((firstRes) =>
        Promise.all([
        firstRes,
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${firstRes.data.coord.lat}&lon=${firstRes.data.coord.lon}&exclude=&appid=${apiKey}&units=${req.body.setMetric}`)
        ]))
        .then(([firstResponse, secondResponse]) => {
        res.json(secondResponse.data);
        })
        .catch((err)=>{res.json(err)})
})

module.exports = router;
