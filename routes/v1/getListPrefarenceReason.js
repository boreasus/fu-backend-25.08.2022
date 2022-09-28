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


function getListPrefarenceReason() {
    soap.createClient(url, function(err, client) {
        client.GetList_TercihEdilmeSebebi(function(err, result) {
            XmlData = result["GetList_TercihEdilmeSebebiResult"];
            console.log(XmlData);
            return XmlData;
        })
    })
}
getListPrefarenceReason();

app.get(("/api/fu_mobile/GetList_TercihEdilmeSebebi"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, result) {
        let data = JSON.stringify(result);
        data = JSON.parse(data);
        res.send(data);
    })
})
let data = {
    GetList_TercihEdilmeSebebi: [{}]
}
app.post(("/api/fu_mobile/GetList_TercihEdilmeSebebi"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetList_TercihEdilmeSebebi.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})