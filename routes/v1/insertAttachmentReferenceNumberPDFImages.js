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




app.get(("/"), (req, res, next) => {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(`Example app listening ${port}`);
})


function insertAttachmentReferanceNumber(paramReferenceNumber, paramAttachmentName, imageData, IpotekBelgesiYuklenmeTarihi, islemTuru) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramReferenceNumber: paramReferenceNumber,
            paramAttachmentName: paramAttachmentName,
            imageData: imageData,
            IpotekBelgesiYuklenmeTarihi: IpotekBelgesiYuklenmeTarihi,
            islemTuru: islemTuru
        }
        client.Insert_Attachment_With_Reference_Number_PDF_Images(params, function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })
    })
}
insertAttachmentReferanceNumber();

app.get(("/api/fu_mobile/Insert_Attachment_With_Reference_Number_PDF_Images/:paramReferenceNumber/:paramAttachmentName/:imageData/:IpotekBelgesiYuklenmeTarihi/:islemTuru"), (req, res) => {
    xmldata = XmlData;
    res.send(xmldata);
})
let data = {
    Insert_Attachment_With_Reference_Number_PDF_Images: [{
        "paramReferenceNumber": "12345678911",
        "paramAttachmentName": "12345",
        "imageData": ["wqwq", "eewewe"],
        "IpotekBelgesiYuklenmeTarihi": "dsdsds",
        "islemTuru": "1"
    }],

}
app.post(("/api/fu_mobile/Insert_Attachment_With_Reference_Number_PDF_Images"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Insert_Attachment_With_Reference_Number_PDF_Images.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})