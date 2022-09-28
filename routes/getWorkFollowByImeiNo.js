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

const testFu2 = (pStrImeiNo,pStrFirstDate,pStrLastDate,callback) => {

    const data = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="http://www.fu.com.tr/Webservices">
    <soap:Header>
       <web:AuthHeader>
          <!--Optional:-->
          <web:Username>!1Tradesoft1!</web:Username>
          <!--Optional:-->
          <web:Password>x1w2q3!!4#IUYMD97F3M3YWRAJ65375X</web:Password>
       </web:AuthHeader>
    </soap:Header>
    <soap:Body>
       <web:Get_IstakibiList_ByImeiNo>
          <!--Optional:-->
          <web:pStrImeiNo>${pStrImeiNo}</web:pStrImeiNo>
          <web:pStrFirstDate>${pStrFirstDate}</web:pStrFirstDate>
          <web:pStrLastDate>${pStrLastDate}</web:pStrLastDate>
       </web:Get_IstakibiList_ByImeiNo>
    </soap:Body>
 </soap:Envelope>`

    const config = {
        method: 'post',
        url: 'http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=Get_IstakibiList_ByImeiNo',
        headers: { 
          'SOAPAction': 'http://www.fu.com.tr/Webservices/Get_IstakibiList_ByImeiNo', 
          'Content-Type': 'text/xml; charset=utf-8'
        },
        data : data
      };

    axios(config)
    .then((response) => {
        const json = xmlParser.toJson(response.data)
        // console.log(response.data)
        callback(response.data);
    })
    .catch((err) => {
        console.log('err', err)
    })
}

function getWorkFollowByImeiNo(pStrImeiNo,pStrFirstDate,pStrLastDate, callback) {
    const params = {
        pStrImeiNo: pStrImeiNo,
        pStrFirstDate:pStrFirstDate,
        pStrLastDate:pStrLastDate,
    }

// // usage of module
// soapRequest({url, xmll}).then(({response: {body, statusCode}}) => {


//     callback(body);
// }).catch((errorBody) => {
//     console.error(errorBody);
// });



}

router.get(("/api/fu_mobile/GetIsTakip_Get_By_ImeiNo/:pStrImeiNo/:pStrFirstDate/:pStrLastDate"), (req, res) => {
    const pStrImeiNo = req.params.pStrImeiNo;
    const pStrFirstDate = req.params.pStrFirstDate;
    const pStrLastDate = req.params.pStrLastDate;
    testFu2(pStrImeiNo,pStrFirstDate,pStrLastDate, (data) => {
        // console.log(data);

        parseString(data, {explicitArray:false},(err, response) => {
            // if (err) {
            //     return res.status(400).send(err)
            // }
            data = response['soap:Envelope']['soap:Body']['Get_IstakibiList_ByImeiNoResponse']['Get_IstakibiList_ByImeiNoResult']
            parseString(data, {explicitArray:false},(err,response)=>{
              return res.send({
                data: response['IsTakipleri']['IsTakibi']

            })
            })

            
        })
    });
})


module.exports = router;