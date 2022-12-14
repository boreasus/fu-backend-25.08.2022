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



function getWorkFollowDetailV2(paramFuReferansNo, pIntIsinTipi,callback) {
    const params = {
        paramFuReferansNo: paramFuReferansNo,
        pIntIsinTipi: pIntIsinTipi
    }
    soap.createClient(url, function(err, client) {

        client.GetIstakipDetailV2(params, function(err, result) {
            const data = result["GetIstakipDetailV2Result"];
            console.log(data)
            callback('data',data)
        })
    })
}

router.get(("/api/fu_mobile/GetIstakipDetailV2/:paramFuReferansNo/:pIntIsinTipi"), (req, res) => {
    const paramFuReferansNo = req.params.paramFuReferansNo
    const pIntIsinTipi = req.params.pIntIsinTipi

    getWorkFollowDetailV2(paramFuReferansNo,pIntIsinTipi,(data)=>{
        parseString(data, (err, response) => {
            console.log('data', data)
            if(err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    });

})
let data = {
    GetIstakipDetailV2: [{
        "paramFuReferansNo": "Fu8d8653a7a0eccc5",
        "pIntIsinTipi": "Fu8d8653a7a0eccc5"
    }]
}
router.post(("/api/fu_mobile/GetIstakipDetailV2"), (req, res) => {
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

module.exports = router;