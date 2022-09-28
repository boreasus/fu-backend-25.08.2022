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


function getWorkFollowDetailV2(paramFuReferansNo, pIntIsinTipi) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramFuReferansNo: paramFuReferansNo,
            pIntIsinTipi: pIntIsinTipi
        }
        client.GetIstakipDetailV2(params, function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })
    })
}
getWorkFollowDetailV2("Fu8d8653a7a0eccc5", "1");

app.get(("/api/fu_mobile/GetIstakipDetailV2/:paramFuReferansNo/:pIntIsinTipi"), (req, res) => {
    xmldata = XmlData["GetIstakipDetailV2Result"];
    res.send(xmldata);
})
let data = {
    GetIstakipDetailV2: [{
        "paramFuReferansNo": "Fu8d8653a7a0eccc5",
        "pIntIsinTipi": "Fu8d8653a7a0eccc5"
    }]
}
app.post(("/api/fu_mobile/GetIstakipDetailV2"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetIstakipDetailV2.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})