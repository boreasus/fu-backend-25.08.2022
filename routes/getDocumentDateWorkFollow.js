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



function getDocumentDate(ImeiNo,callback) {
    soap.createClient(url, function(err, client) {
        const params = {
            pStrImeiNo: ImeiNo
        }
        client.GetEvrakTeslimTarihiListIstakibi(params, function(err, result) {
            const data = result["GetEvrakTeslimTarihiListIstakibiResult"];
            callback(data);
        })
    })
}
router.get(("/api/fu_mobile/GetEvrakTeslimTarihiListIstakibi/:ImeiNo"), (req,res) => {
    const ImeiNo = req.params.ImeiNo
    getDocumentDate(ImeiNo,(data)=>{
        parseString(data, {explicitArray:false}, (err, response) => {
            console.log('Res>>>>>>>', response)
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response['Istakipleri']['Istakip']
            })
        })
    })
})


module.exports = router;