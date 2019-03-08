const axios             = require('axios');
const os                = require('os');
const si                = require('systeminformation');
const rn                = require('random-number');

const { REQUEST_URL, REFRESH_RATE }   = require('./config');


const gen = rn.generator({ min: 20, max: 27.5 });

const getData = async ( ) => 
{
    let data = {
        platform : os.platform(),
    };

    data.temperature    = gen();
    data.cpus           = os.cpus().length;

    return data;
};


const request = setInterval(
    () => 
    {
        getData().then(
            ( d ) => 
            {
                axios.post(
                    REQUEST_URL + '/data'
                , d).then(
                    ( { data } )=> 
                    {
                        
                    }
                ).catch(
                    () => clearInterval( request )
                )
            }
        )
    }
, REFRESH_RATE );