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



function getDocumentDate(ImeiNo) {
    soap.createClient(url, function(err, client) {
        const params = {
            pStrImeiNo: ImeiNo
        }
        client.GetEvrakTeslimTarihiListIstakibi(params, function(err, result) {
            XmlData = result["GetEvrakTeslimTarihiListIstakibiResult"];
            return XmlData;
        })
    })
}
getDocumentDate("7080449043");
router.get(("/api/fu_mobile/GetEvrakTeslimTarihiListIstakibi/:ImeiNo"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, results) {
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        res.send(data);
    })
})
let data = {
    GetEvrakTeslimTarihiListIstakibi: [{
        "pStrImeiNo": "12121212121"
    }]
}

router.post(("/api/fu_mobile/GetEvrakTeslimTarihiListIstakibi"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetEvrakTeslimTarihiListIstakibi.push(body);
    console.log(data.GetEvrakTeslimTarihiListIstakibi);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }
})

module.exports = router;