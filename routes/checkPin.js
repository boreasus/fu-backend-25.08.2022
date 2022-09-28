const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
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


// var tc = 58657358838;
// var parola = 8838;

function checkPin(strPin,strTcKimlikNo,callback) {
    const params = {
        strPin: strPin,

        strTcKimlikNo: strTcKimlikNo,
    }
    soap.createClient(url, function(err, client) {
        client.CheckPin(params, function(err, result) {
            const data = result["CheckPinResult"];
            console.log('data',data);
            callback(data)
        })
    })
}
//checkPin(58657358838, 8838);


router.get(("/api/fu_mobile/CheckPin/:strPin/:strTcKimlikNo"), (req, res) => {
    const strTcKimlikNo = req.params.strTcKimlikNo
    const strPin = req.params.strPin

    checkPin(strPin,strTcKimlikNo,(data) => {
        parseString(data, (err, response) => {
            console.log('res', strTcKimlikNo)
            if(err) {

                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    })
})

router.post(("/api/fu_mobile/checkPin"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.CheckPin.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;