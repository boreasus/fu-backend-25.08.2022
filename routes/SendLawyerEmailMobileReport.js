const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=CheckMutabakatAvukati";
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

const testFu = (pStrImeiNo,pStrFirstDate,pStrLastDate,callback) => {

    const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.fu.com.tr/Webservices">
    <soapenv:Header>
       <web:AuthHeader>
          <!--Optional:-->
          <web:Username>!1Tradesoft1!</web:Username>
          <!--Optional:-->
          <web:Password>x1w2q3!!4#IUYMD97F3M3YWRAJ65375X</web:Password>
       </web:AuthHeader>
    </soapenv:Header>
    <soapenv:Body>
       <web:Send_LawyerEmailMobileReport>
          <!--Optional:-->
          <web:pStrImeiNo>${pStrImeiNo}</web:pStrImeiNo>
          <web:pStrFirstDate>${pStrFirstDate}</web:pStrFirstDate>
          <web:pStrLastDate>${pStrLastDate}</web:pStrLastDate>
       </web:Send_LawyerEmailMobileReport>
    </soapenv:Body>
 </soapenv:Envelope>`

    const config = {
        method: 'post',
        url: 'http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=Send_LawyerEmailMobileReport',
        headers: { 
          'SOAPAction': 'http://www.fu.com.tr/Webservices/Send_LawyerEmailMobileReport', 
          'Content-Type': 'text/xml; charset=utf-8'
        },
        data : data
      };

    axios(config)
    .then((response) => {
        const json = xmlParser.toJson(response.data)
        console.log(response.data)
        callback(response.data);
    })
    .catch((err) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr');
        console.log('err', err)
    })
}


router.get(("/api/fu_mobile/sendLawyerEmailMobileReport/:strImeiNo/:pStrFirstDate/:pStrLastDate"), (req, res) => {
    const strImeiNo = req.params.strImeiNo;
    const pStrFirstDate = req.params.pStrFirstDate;
    const pStrLastDate = req.params.pStrLastDate;
    testFu(strImeiNo,pStrFirstDate,pStrLastDate, (data) => {
        parseString(data, {explicitArray:false},(err, response) => {
            if (err) {
                print("errrrrrrrrrrrrrrrrrr ",{err})
                return res.status(400).send(err)
            }
            return res.send({
                data: response['soap:Envelope']['soap:Body']['Send_LawyerEmailMobileReportResponse']['Send_LawyerEmailMobileReportResult']

            })
        })
    });
})



module.exports = router;