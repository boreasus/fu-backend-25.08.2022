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



function mobileDeedAppointment(
    paramReferenceNo,
    paramTime,
    paramYear,
    paramMonth,
    paramDay,
    callback
) {
    const params = {
        paramReferenceNo: paramReferenceNo,
        paramTime: paramTime,
        paramYear: paramYear,
        paramMonth: paramMonth,
        paramDay: paramDay
    }
    soap.createClient(url, function(err, client) {
        client.MobileTapuRandevuAtama(function(err, result) {
            const data = result["ResultMessage"];
            callback(data);
        })

    })
}
router.get(("/api/fu_mobile/MobileTapuRandevuAtama/:paramReferenceNo/:paramTime/:paramYear/:paramMonth/:paramDay"), (req, res) => {
    const paramReferenceNo = req.params.paramReferenceNo;
    const paramTime = req.params.paramTime;
    const paramYear = req.params.paramYear;
    const paramMonth = req.params.paramMonth;
    const paramDay = req.params.paramDay;
    mobileDeedAppointment(paramReferenceNo, paramTime, paramYear, paramMonth, paramDay, (data) => {
        parseString(data, (err, response) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.send({
                data: response
            })
        })
    });

})



router.post(("/api/fu_mobile/MobileTapuRandevuAtama"), (req, res) => {
    const paramReferenceNo = req.params.paramReferenceNo;
    const paramTime = req.params.paramTime;
    const paramYear = req.params.paramYear;
    const paramMonth = req.params.paramMonth;
    const paramDay = req.params.paramDay;
    mobileDeedAppointment(paramReferenceNo, paramTime, paramYear, paramMonth, paramDay, (data) => {
        parseString(data, (err, response) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.send({
                data: response
            })
        })
    })

})
module.exports = router;