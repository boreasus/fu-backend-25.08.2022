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



function checkAgreement(pStrImeiNo,callback) {
    const params = {
        pStrImeiNo: pStrImeiNo
    }
    soap.createClient(url, function(err, client) {

        client.CheckMutabakatAvukati(params, function(err, result) {
            const data = result["CheckMutabakatAvukatiResult"];
            console.log('^data : ',data)
            callback(data)
        })
    })
}
// checkAgreement("EFA82DF177");

router.get("/api/fu_mobile/CheckMutabakatAvukati/:pStrImeiNo", (req, res) => {
const pStrImeiNo = req.params.pStrImeiNo

checkAgreement(pStrImeiNo,(data)=>{
    parseString(data, (err, response) => {
        console.log('data2', data)
        if(err) {
            return res.status(400).send({
                message: err.message
            })
        }
        return res.send({
            data: response
        })
    })
});
})



router.post(("/api/fu_mobile/CheckMutabakatAvukati"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.CheckMutabakatAvukati.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }


})

module.exports = router;