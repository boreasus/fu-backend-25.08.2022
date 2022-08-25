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



const soapRequest = require('easy-soap-request');
// example data
const xmll = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="http://www.fu.com.tr/Webservices">
   <soap:Header>
      <web:AuthHeader>
         <!--Optional:-->
         <web:Username>!1Tradesoft1!</web:Username>
         <!--Optional:-->
         <web:Password>x1w2q3!!4#IUYMD97F3M3YWRAJ65375X</web:Password>
      </web:AuthHeader>
   </soap:Header>
   <soap:Body>
      <web:Login_ByImei_New>
         <!--Optional:-->
         <web:paramImeiNo>A8B4084027</web:paramImeiNo>
      </web:Login_ByImei_New>
   </soap:Body>
</soap:Envelope>
`;







function loginByImei(paramImeiNo, callback) {
    const params = {
        paramImeiNo: paramImeiNo,

    }

// usage of module
soapRequest({url, xmll}).then(({response: {body, statusCode}}) => {
    console.log(body);
    console.log(statusCode);
    callback(body);
}).catch((errorBody) => {
    console.error(errorBody);
});



}



//     soap.createClient(url, function(err, client) {

//         client.addSoapHeader('<web:AuthHeader><!--Optional:--><web:Username>!1Tradesoft1!</web:Username><!--Optional:--><web:Password>x1w2q3!!4#IUYMD97F3M3YWRAJ65375X</web:Password>');

          
//         client.Login_ByImei_New(params, function(err, result) {
//             console.log("aaaaaaaaaa>>>>>>>>> \n\n\n\n\n");
//             console.log(client.lastRequest);
//             const data = result
//             console.log("data\n\n\n", data.body);
//             callback(data);
//         })
//     })
// }

router.get(("/api/fu_mobile/Login_ByImei/:paramImeiNo"), (req, res) => {
    const paramImeiNo = req.params.paramImeiNo;
    loginByImei(paramImeiNo, (data) => {
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

router.post(("/api/fu_mobile/Login_ByImei"), (req, res) => {
    const paramImeiNo = req.params.paramImeiNo;
    loginByImei(paramImeiNo, (data) => {
        console.log('Res>>>>>>>', data)
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