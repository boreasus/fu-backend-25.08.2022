const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
const parser = new xml2js.Parser();
const { parseString } = require('xml2js')
const express = require("express");
const { json } = require("express");
const { parse } = require("path");
const port = 3000;
const app = express();
var bodyParser = require('body-parser');
const { Module } = require("module");
app.use(express.urlencoded({ extended: true }));
const xmlparser = require('express-xml-bodyparser');
const xml = require("xml");
app.use(express.json())
app.use(xmlparser());
var router = express.Router();




function getPushLogs(Imei2,callback) {
    const params = {
        Imei2: Imei2
    }
    soap.createClient(url, function(err, client) {
        client.GetPushLogs_WithImei2(params, function(err, result) {
            const data = result["GetPushLogs_WithImei2Result"];
            
            callback(data)
        })

    })
}
router.get(("/api/fu_mobile/GetPushLogs_WithImei2/:Imei2"), (req, res) => {
    const Imei2 = req.params.Imei2
    getPushLogs(Imei2,(data)=>{
        parseString(data,{explicitArray : false}, (err, response) => {
            console.log('res', data)
            if(err) {
                return res.status(400).send(err)
            }
            return res.send({
                
                data: response
            })
        })
    });

})

let data = {
    GetPushLogs_WithImei2: [{
        "Imei2": "1",
    }]
}
router.post(("/api/fu_mobile/GetPushLogs_WithImei2"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetPushLogs_WithImei2.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }


})

module.exports = router;