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
app.use(express.urlencoded({ extended: true }));



app.get(("/"), (req, res, next) => {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(`Example app listening ${port}`);
})


function insertAttachmentReferanceNumber(
    paramReferenceNumber,
    paramAttachmentName,
    paramBase64AttachmentBody,
    IpotekBelgesiYuklenmeTarihi,
    islemTuru

) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramReferenceNumber: paramReferenceNumber,
            paramAttachmentName: paramAttachmentName,
            paramBase64AttachmentBody: paramBase64AttachmentBody,
            IpotekBelgesiYuklenmeTarihi: IpotekBelgesiYuklenmeTarihi,
            islemTuru: islemTuru
        }
        client.Insert_Attachment_With_Reference_Number_PDF_V2(function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })

    })
}
insertAttachmentReferanceNumber("FU8D811ED214365E7", "vekaletname_FU8D811ED214365E7.pdf", "base64string_documaniçeriği", "10/10/2020 10.10");
app.get(("/api/fu_mobile/Insert_Attachment_With_Reference_Number_PDF_V2"), (req, res) => {
    xmldata = XmlData;
    res.send(xmldata);

})

let data = {
    Insert_Attachment_With_Reference_Number_PDF_V2: [{
        "paramReferenceNumber": "12345678911",
        "paramAttachmentName": "12345",
        "paramBase64AttachmentBody": "",
        "IpotekBelgesiYuklenmeTarihi": "",
        "islemTuru": ""
    }]
}
app.post(("/api/fu_mobile/Insert_Attachment_With_Reference_Number_PDF_V2"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Insert_Attachment_With_Reference_Number_PDF_V2.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})