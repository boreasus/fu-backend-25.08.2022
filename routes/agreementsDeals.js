const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
const parser = new xml2js.Parser(explicitArray = false);
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

function agreementDeals(strImeiNo, callback) {
    const params = {
        strImeiNo: strImeiNo
    }
    soap.createClient(url, function(err, client) {

        client.GetYapilacakMutabakat(params, function(err, result) {
            const data = result["GetYapilacakMutabakatResult"];
            console.log('dataAAA', data);
            callback(data)
        })
    })
}
router.get(("/api/fu_mobile/GetYapilacakMutabakat/:strImeiNo"), (req, res) => {
    const strImeiNo = req.params.strImeiNo
        //agreementDeals("4087476992");
    agreementDeals(strImeiNo, (data) => {
        console.log("data", data)
        data = data.replaceAll(" ", "");


        console.log("data bosluksuz", data)
        parseString(data,{explicitArray:false}, (err, response) => {
            console.log('res', response)
            if (err) {
                return res.status(400).send(err.message)
            }
            return res.send({
                data: response
            })
        })
    });
});


router.post(("/api/fu_mobile/GetYapilacakMutabakat/:strImeiNo"), (req, res) => {
    const strImeiNo = req.params.strImeiNo
        //agreementDeals("4087476992");
    agreementDeals(strImeiNo, (data) => {
        parseString(data, {explicitArray:false}, (err, response) => {
            console.log('res', response)
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    });
});


module.exports = router;