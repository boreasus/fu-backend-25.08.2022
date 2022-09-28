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
const router = require("express").Router();





// function updateVersionInformation(pStrImeiNo, pStrCihazBilgisi, pStrVersiyonBilgisi, pStrUygulamaVersiyonu) {
//     soap.createClient(url, function(err, client) {
//         const params = {
//             pStrImeiNo: pStrImeiNo,
//             pStrCihazBilgisi: pStrCihazBilgisi,
//             pStrVersiyonBilgisi: pStrVersiyonBilgisi,
//             pStrUygulamaVersiyonu: pStrUygulamaVersiyonu
//         }
//         client.UpdateVersiyonBilgisi(params, function(err, result) {
//             XmlData = result;
//             console.log(XmlData);
//             return XmlData;
//         })
//     })
// }
// updateVersionInformation("EFA82DF177");

// router.get(("/api/fu_mobile/UpdateVersiyonBilgisi/:pStrImeiNo/:pStrCihazBilgisi/:pStrVersiyonBilgisi/:pStrUygulamaVersiyonu"), (req, res) => {
//     xmldata = XmlData;
//     res.send(xmldata);
// })
// let data = {
//     UpdateVersiyonBilgisi: [{
//         "pStrImeiNo": "string",
//         "pStrCihazBilgisi": "string",
//         "pStrVersiyonBilgisi": "string",
//         "pStrUygulamaVersiyonu": "string"
//     }]
// }
// router.post(("/api/fu_mobile/UpdateVersiyonBilgisi"), (req, res) => {
//     let body = req.body;
//     let query = req.query;

//     data.UpdateVersiyonBilgisi.push(body);
//     if (query.type === 'xml') {
//         res.set('Content-type', 'text/xml');
//         return res.send(xml(data, true));
//     } else {
//         return res.send(data);
//     }

// })

// module.exports = router;