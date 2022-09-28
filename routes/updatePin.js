const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
const parser = new xml2js.Parser();
const { parseString } = require('xml2js')
const router = require("express").Router();
const express = require("express");
const { json } = require("express");
const { parse } = require("path");
const port = 3000;
const app = express();


console.log("sdsdsd");

function updatePin(strPin, strTckimlikNO, callback) {
    const params = {
        strPin: strPin,
        strTckimlikNO: strTckimlikNO,

    }
    soap.createClient(url, function(err, client) {
        client.UpdatePin(params, function(err, result) {
            console.log(params.strPin,params.strTckimlikNO);
            const data = result["UpdatePinResult"];
            callback(data);
        })
    })
}

router.get(("/api/fu_mobile/updatePin/:strPin/:strTckimlikNO"), (req, res) => {
    const strPin = req.params.strPin;
    const strTckimlikNO = req.params.strTckimlikNO;
    updatePin(strPin, strTckimlikNO, (data) => {
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


router.post(("/api/fu_mobile/updatePin"), (req, res) => {
    const strPin = req.params.parola;
    const strTckimlikNO = req.params.strTcKimlikNo;
    updatePin(strPin, strTckimlikNO, (data) => {
        parseString(data, (err, response) => {
            console.log('Res>>>>>>>', response)
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