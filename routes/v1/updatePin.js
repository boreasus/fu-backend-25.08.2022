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

function updatePin(parola, TCKN, callback) {
    const params = {
        strPin: parola,
        strTckimlikNO: TCKN,
    }
    soap.createClient(url, function(err, client) {
        client.UpdatePin(params, function(err, result) {
            const data = result["UpdatePinResult"];
            console.log(data);
            callback(data);
        })
    })
}

router.get(("/api/fu_mobile/updatePin/:parola/:TCKN"), (req, res) => {
    const strPin = req.params.parola;
    const strTckimlikNO = req.params.strTcKimlikNo;
    updatePin(strPin, strTckimlikNO, (data) => {
        parseString(data, (err, response) => {
            console.log('res', response)
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
    data.UpdatePin.push(body);
    updatePin(strPin, strTckimlikNO, (data) => {
        parseString(data, (err, response) => {
            console.log('res', response)
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