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


function getWorkFollowDetailXmlV2(paramFuReferansNo, pIntIsinTipi, callback) {
    const params = {
        paramFuReferansNo: paramFuReferansNo,
        pIntIsinTipi,
    }
    soap.createClient(url, function(err, client) {
        client.GetIstakipDetailXMLV2(params, function(err, result) {
             data = result?.["GetIstakipDetailXMLV2Result"];
            callback(data);
        })

    })
}
//getWorkFollowDetailXmlV2("Fu8d8653a7a0eccc5", "1");
router.get(("/api/fu_mobile/check/GetIstakipDetailXMLV2/:paramFuReferansNo/:pIntIsinTipi"), (req, res) => {
    const paramFuReferansNo = req.params.paramFuReferansNo;
    const pIntIsinTipi = req.params.pIntIsinTipi;

    



    getWorkFollowDetailXmlV2(paramFuReferansNo, pIntIsinTipi, (data) => {
        if(data){
            parseString(data, { explicitArray: false }, (err, response) => {
                var sira = response["IsTakip"]["Sira"];
                sira = sira.replaceAll("-", ":");
                sira = JSON.parse(sira);
                response["IsTakip"]["Sira"] = sira;
                console.log(response);
                if (err) {
                    return res.status(400).send(err)
                }
                return res.send({
                    data: response
                })
            })
        }
        else{
            return res.send({
                data: "error",
            })
        }
    });
})


router.post(("/api/fu_mobile/GetIstakipDetailXMLV2"), (req, res) => {
    const paramFuReferansNo = req.params.paramFuReferansNo;
    const pIntIsinTipi = req.params.pIntIsinTipi;
    updatePin(paramFuReferansNo, pIntIsinTipi, (data) => {
        parseString(data, (err, response) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    });

})

module.exports = router;