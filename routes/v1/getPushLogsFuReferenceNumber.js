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




app.get(("/"), (req, res, next) => {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(`Example app listening ${port}`);
})


function getPushLogs(paramFuReferansNo) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramFuReferansNo: paramFuReferansNo
        }
        client.GetPushLogs_WithFuReferenceNumber(params, function(err, result) {
            XmlData = result["GetPushLogs_WithFuReferenceNumberResult"];
            console.log(XmlData);
            return XmlData;
        })
    })
}
getPushLogs("Fu8d8653a7a0eccc5");

app.get(("/api/fu_mobile/GetPushLogs_WithFuReferenceNumber/:paramFuReferansNo"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, result) {
        let data = JSON.stringify(result);
        data = JSON.parse(data);
        res.send(data);
    })
})
let data = {
    GetPushLogs_WithFuReferenceNumber: [{
        "paramFuReferansNo": "Fu8d8653a7a0eccc5",
    }]
}
app.post(("/api/fu_mobile/GetPushLogs_WithFuReferenceNumber"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetPushLogs_WithFuReferenceNumber.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})