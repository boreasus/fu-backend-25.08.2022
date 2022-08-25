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


function getWorkFollow(strImeiNo) {
    soap.createClient(url, function(err, client) {
        const params = {
            strImeiNo: strImeiNo
        }
        client.GetIsTakip_Get_By_ImeiNo(params, function(err, result) {
            XmlData = result["GetIsTakip_Get_By_ImeiNoResult"];
            
            return XmlData;
        })
    })
}
getWorkFollow("EFA82DF177");

router.get(("/api/fu_mobile/GetIsTakip_Get_By_ImeiNo/:strImeiNo"), (req, res) => {
    var xmldata = XmlData;
    parseString(xmldata, function(err, results) {
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        res.send(data);
    })
})
let data = {
    GetIsTakip_Get_By_ImeiNo: [{
        "strImeiNo": "12345678911",
    }]
}
router.post(("/api/fu_mobile/GetIsTakip_Get_By_ImeiNo"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetIsTakip_Get_By_ImeiNo.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;