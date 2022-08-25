const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
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


function getLawyerTransactionsAppointment(ImeiNo,callback) {
    const params = {
        ImeiNo: ImeiNo
    }
    soap.createClient(url, function(err, client) {
        client.Get_LawyerTransactionsWithoutAppointment_ByImeiNo(params, function(err, result) {
            const data = result["Get_LawyerTransactionsWithoutAppointment_ByImeiNoResult"]
            callback(data)
        })
    })
}

router.get(("/api/fu_mobile/Get_LawyerTransactionsWithoutAppointment_ByImeiNo/:ImeiNo"), (req, res) => {
    const ImeiNo = req.params.ImeiNo
    getLawyerTransactionsAppointment(ImeiNo,(data)=>{
        parseString(data, {explicitArray:false},(err, response) => {
            console.log('res', response)
            if(err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response.IsTakipleri
            })
        })
    });

})
let data = {
    Get_LawyerTransactionsWithoutAppointment_ByImeiNo: [{
        "ImeiNo": "0085690609",
    }]
}


module.exports = router;