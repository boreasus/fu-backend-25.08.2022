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


function loginByImei(paramImeiNo) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramImeiNo: paramImeiNo
        }
        client.Login_ByImei(params, function(err, result) {
            XmlData = result["Login_ByImeiResult"];
            console.log(XmlData);
            return XmlData;
        })
    })
}
loginByImei("EFA82DF177");

app.get(("/api/fu_mobile/Login_ByImei/:paramImeiNo"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, result) {
        let data = JSON.stringify(result);
        data = JSON.parse(data);
        res.send(data);
    })
})
let data = {
    Login_ByImei: [{
        "paramImeiNo": "EFA82DF177",
    }]
}
app.post(("/api/fu_mobile/Login_ByImei"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Login_ByImei.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})