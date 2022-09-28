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

const testFu = (pGuidMutabakatId,pStrMakbuzNo,pDateMakbuzTarihi,pStrBase64AttachmentBody,callback) => {

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
      <InsertMakbuz xmlns="http://www.fu.com.tr/Webservices">
      <pGuidMutabakatId>${pGuidMutabakatId}</pGuidMutabakatId>
      <pStrMakbuzNo>${pStrMakbuzNo}</pStrMakbuzNo>
      <pDateMakbuzTarihi>${pDateMakbuzTarihi}</pDateMakbuzTarihi>
      <pStrBase64AttachmentBody>${pStrBase64AttachmentBody}</pStrBase64AttachmentBody>
    </InsertMakbuz>
    </soap:Body>
 </soap:Envelope>`

    const config = {
        method: 'post',
        url: 'http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=InsertMakbuz',
        headers: { 
          'SOAPAction': 'http://www.fu.com.tr/Webservices/InsertMakbuz', 
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
        console.log('errrrrrrrrrrrrrrrrrrrrrrr');
        console.log('err', err)
    })
}


router.get(("/api/fu_mobile/InsertMakbuz/:pGuidMutabakatId/:pStrMakbuzNo/:pDateMakbuzTarihi/:pStrBase64AttachmentBody/"), (req, res) => {
    const pGuidMutabakatId = req.params.pGuidMutabakatId;
    const pStrMakbuzNo = req.params.pStrMakbuzNo;
    const pDateMakbuzTarihi = req.params.pDateMakbuzTarihi;
    const pStrBase64AttachmentBody = req.params.pStrBase64AttachmentBody;



    testFu(pGuidMutabakatId,pStrMakbuzNo,pDateMakbuzTarihi,pStrBase64AttachmentBody, (data) => {
        parseString(data, {explicitArray:false},(err, response) => {
            const util = require('util')
            console.log(util.inspect(pStrBase64AttachmentBody, {showHidden: false, depth: null, colors: true}))
            // console.log(response['soap:Envelope']['soap:Body']['Get_BankaSubeleriResponse']['Get_BankaSubeleriResult'])
            if (err) {
                print("errrrrrrrrrrrrrrrrrr ",{err})
                return res.status(400).send(err)
            }
            // parseString(response['soap:Envelope']['soap:Body']['Get_BankaSubeleriResponse']['Get_BankaSubeleriResult'],{explicitArray:false},(err,response)=>{
            //    console.log(response)
               
            // })
            return res.send({
                data: response["soap:Envelope"]['soap:Body']['InsertMakbuzResponse']['InsertMakbuzResult']

            })
        })
    });
})



module.exports = router;