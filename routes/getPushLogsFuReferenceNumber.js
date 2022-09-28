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


function getPushLogs(paramFuReferansNo,callback) {
    const params = {
        paramFuReferansNo: paramFuReferansNo
    }
    soap.createClient(url,function(err,client){
        client.GetPushLogs_WithFuReferenceNumber(params,function(err,result){
            const data = result["GetPushLogs_WithFuReferenceNumberResult"];
            callback(data);
        })
    })
}
//getPushLogs("Fu8d8653a7a0eccc5");

router.get(("/api/fu_mobile/GetPushLogs_WithFuReferenceNumber/:paramFuReferansNo"), (req, res) => {
    paramFuReferansNo = req.params.paramFuReferansNo
    getPushLogs(paramFuReferansNo,(data)=>{
        parseString(data,{explicitArray:false}, (err, response) => {
            console.log('res', response)
            console.log(response.PushLogs.PushLog);

            if(err) {
                return res.status(400).send(err)
            }
            return res.send({

                data: response.PushLogs.PushLog
            })
        })
    })
})
let data = {
    GetPushLogs_WithFuReferenceNumber: [{
        "paramFuReferansNo": "Fu8d8653a7a0eccc5",
    }]
}
router.post(("/api/fu_mobile/GetPushLogs_WithFuReferenceNumber"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetPushLogs_WithFuReferenceNumber.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;