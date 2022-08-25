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






function agreementDeals(strImeiNo) {
    soap.createClient(url, function(err, client) {
        const params = {
            strImeiNo: strImeiNo
        }
        client.GetYapilacakMutabakat(params, function(err, result) {
            XmlData = result["GetYapilacakMutabakatResult"];
            console.log(XmlData);
            return XmlData;
        })

    })
}
agreementDeals("4087476992");
app.get(("/api/fu_mobile/GetYapilacakMutabakat/:strImeiNo"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, results) {
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        res.send(data);
    })
});

let data = {
    GetYapilacakMutabakat: [{
        "strImeiNo": "4087476992",
    }]
}
app.post(("/api/fu_mobile/GetYapilacakMutabakat"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetYapilacakMutabakat.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})


module.exports = app.get;