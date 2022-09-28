const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=Delete_LawyerAppointment";
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



const axios = require('axios')
let xmlParser = require('xml2json')

const testFu = (RefNo,RandevuIptalNedeni,AciklamaNotu,callback) => {

    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
        <AuthHeader xmlns="http://www.fu.com.tr/Webservices">
          <Username>!1Tradesoft1!</Username>
          <Password>x1w2q3!!4#IUYMD97F3M3YWRAJ65375X</Password>
        </AuthHeader>
      </soap:Header>
      <soap:Body>
      
      <Delete_LawyerAppointment xmlns="http://www.fu.com.tr/Webservices">
      <RefNo>${RefNo}</RefNo>
      <RandevuIptalNedeni>{${RandevuIptalNedeni}}</RandevuIptalNedeni>
      <AciklamaNotu>${AciklamaNotu}</AciklamaNotu>
    </Delete_LawyerAppointment>
      </soap:Body>
    </soap:Envelope>`

    const config = {
        method: 'post',
        url: 'http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=Delete_LawyerAppointment',
        headers: { 
          'SOAPAction': 'http://www.fu.com.tr/Webservices/Delete_LawyerAppointment', 
          'Content-Type': 'text/xml; charset=utf-8'
        },
        data : data
      };

    axios(config)
    .then((response) => {
        const json = xmlParser.toJson(response.data)
        callback(response.data);
    })
    .catch((err) => {
        console.log('err', err)
    })
}


const sqlite3 = require('sqlite3');
const { reject } = require("lodash");
const e = require("express");
const db = new sqlite3.Database('./routes/islemler.db',(err)=>{
    if(err) console.log(err);
    else console.log("DataBase bağlantısı yapıldı4");
});
// var sql = `UPDATE islemler SET (category) = ("${dbTur}") WHERE islem_id="${paramReferenceNumber.toUpperCase()}"`;

var parent = {};
var child = []
parent.child = child;


router.get(("/api/fu_mobile/deleteLawyerAppointment/:RefNo/:RandevuIptalNedeni/:AciklamaNotu"), (req, res) => {
    const RefNo = req.params.RefNo;
    const RandevuIptalNedeni = req.params.RandevuIptalNedeni;
    console.log(">>>>>>>>>>>>>",RandevuIptalNedeni);
    const AciklamaNotu = req.params.AciklamaNotu;
    testFu(RefNo,RandevuIptalNedeni,AciklamaNotu, (data) => {
        parseString(data, {explicitArray:false},  async (err, response) =>  {
            console.log("<<<<>>>>",response['soap:Envelope']['soap:Body']['Delete_LawyerAppointmentResponse']['Delete_LawyerAppointmentResult']
            )
            if (err) {
                return res.status(400).send(err)
            }            
            return res.send({
                 data: response['soap:Envelope']['soap:Body']['Delete_LawyerAppointmentResponse']['Delete_LawyerAppointmentResult']

            })
        })
    });
})

module.exports = router;