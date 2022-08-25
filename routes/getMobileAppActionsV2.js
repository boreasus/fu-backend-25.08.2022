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



function getMobileAppActions(FuReferenceNumber,callback) {
    const params = {
        FuReferenceNumber: FuReferenceNumber
    }
    soap.createClient(url, function(err, client) {
        client.Get_Mobile_App_ActionsV2(params, function(err, result) {
            const data = result["Get_Mobile_App_ActionsV2Result"];
            callback(data)
        })

    })
}
router.get(("/api/fu_mobile/Get_Mobile_App_ActionsV2/:FuReferenceNumber"), (req, res) => {
    const FuReferenceNumber = req.params.FuReferenceNumber
    getMobileAppActions(FuReferenceNumber,(data)=>{
        parseString(data, (err,response) => {
            console.log('res', response)
            console.log('err', err)
            if(err) {
                return res.status(400).send({
                    message: err.message
                })
            }
            return res.send({
                data: response
            })
        })
    });

})

let data = {
    Get_Mobile_App_ActionsV2: [{
        "FuReferenceNumber": "12345678911",
    }]
}
router.post(("/api/fu_mobile/Get_Mobile_App_ActionsV2"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_Mobile_App_ActionsV2.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;