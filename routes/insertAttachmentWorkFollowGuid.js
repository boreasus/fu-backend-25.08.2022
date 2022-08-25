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



function insertAttachment(paramIsTakipGuid, paramImeiNo, paramAttachmentName, paramAttachmentBody, paramAttachmentBody, callback) {
    const params = {
        paramIsTakipGuid: paramIsTakipGuid,
        paramImeiNo: paramImeiNo,
        paramAttachmentName: paramAttachmentName,
        paramAttachmentBody: paramAttachmentBody,
        paramAttachmentBody: paramAttachmentBody
    }
    soap.createClient(url, function(err, client) {
        client.Insert_Attachment_ByIsTakipGuid(params, function(err, result) {
            const data = result;
            callback(data);
        })
    })
}

router.get(("/api/fu_mobile/Insert_Attachment_ByIsTakipGuid/:paramIsTakipGuid/:paramImeiNo/:paramAttachmentName/:paramAttachmentBody/:paramAttachmentBody"), (req, res) => {
    const paramIsTakipGuid = req.params.paramIsTakipGuid;
    const paramImeiNo = req.params.paramImeiNo;
    const paramAttachmentName = req.params.paramAttachmentName;
    const paramAttachmentBody = req.params.paramAttachmentBody;
    insertAttachment(paramIsTakipGuid, paramImeiNo, paramAttachmentName, paramAttachmentBody, paramAttachmentBody, (data) => {
        parseString(data, (err, response) => {
            console.log('Res>>>>>>>', response)
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    });
})

router.post(("/api/fu_mobile/Insert_Attachment_ByIsTakipGuid"), (req, res) => {
    const paramIsTakipGuid = req.params.paramIsTakipGuid;
    const paramImeiNo = req.params.paramImeiNo;
    const paramAttachmentName = req.params.paramAttachmentName;
    const paramAttachmentBody = req.params.paramAttachmentBody;
    insertAttachment(paramIsTakipGuid, paramImeiNo, paramAttachmentName, paramAttachmentBody, paramAttachmentBody, (data) => {
        parseString(data, (err, response) => {
            console.log('Res>>>>>>>', response)
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