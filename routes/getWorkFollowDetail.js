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



function getWorkFollowDetail(paramFuReferansNo) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramFuReferansNo: paramFuReferansNo
        }
        client.GetIstakipDetail(params, function(err, result) {
            XmlData = result;
            
            return XmlData;
        })
    })
}
getWorkFollowDetail("Fu8d8653a7a0eccc5");

router.get(("/api/fu_mobile/GetIstakipDetail/:paramFuReferansNo"), (req, res) => {
    xmldata = XmlData;
    res.send(xmldata);
})
let data = {
    GetIstakipDetail: [{
        "paramFuReferansNo": "deneme"
    }]
}
router.post(("/api/fu_mobile/GetIstakipDetail"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetIstakipDetail.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;