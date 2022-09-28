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
const { response } = require("../app");
app.use(express.json())
app.use(xmlparser());

var router = express.Router();



function updateDataUseContent(pStrImeiNo, callback) {
    const params = {
        pStrImeiNo: pStrImeiNo
    }
    soap.createClient(url, function(err, client) {
        client.UpdateVeriKullanimIzni(params, function(err, result) {
            const data = result['UpdateVeriKullanimIzniResult'];
            console.log(data);
            callback(data);
        })
    })
}

router.get(("/api/fu_mobile/UpdateVeriKullanimIzni/:pStrImeiNo"), (req, res) => {
    const pStrImeiNo = req.params.pStrImeiNo;
    updateDataUseContent(pStrImeiNo, (data) => {
        console.log(data)
        parseString(data, (err, response) => {
            if (err) {
                return res.send({
                    data: data
                })
            }
            return res.send({
                data: response
            })
        })
    })
});

router.post(("/api/fu_mobile/UpdateVeriKullanimIzni"), (req, res) => {
    const pStrImeiNo = req.params.pStrImeiNo;
    updateDataUseContent(pStrImeiNo, (data) => {
        console.log("Muhammed", data)
        parseString(data, (err, response) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    })
})

module.exports = router;