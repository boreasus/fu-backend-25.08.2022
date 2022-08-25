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

var router = express.Router();


function insertAttachmentReferanceNumber(
    paramReferenceNumber,
    paramAttachmentName,
    paramBase64AttachmentBody,
    IpotekBelgesiYuklenmeTarihi,
    islemTuru,
    callback
) {
    const params = {
        paramReferenceNumber: paramReferenceNumber,
        paramAttachmentName: paramAttachmentName,
        paramBase64AttachmentBody: paramBase64AttachmentBody,
        IpotekBelgesiYuklenmeTarihi: IpotekBelgesiYuklenmeTarihi,
        islemTuru: islemTuru
    }
    soap.createClient(url, function(err, client) {
        client.Insert_Attachment_With_Reference_Number_PDF_V2(function(err, result) {
            const data = result;
            callback(data);
        })

    })
}
//insertAttachmentReferanceNumber("FU8D811ED214365E7", "vekaletname_FU8D811ED214365E7.pdf", "base64string_documaniçeriği", "10/10/2020 10.10");
router.get(("/api/fu_mobile/Insert_Attachment_With_Reference_Number_PDF_V2/:paramReferenceNumber/:paramAttachmentName/:paramBase64AttachmentBody/:IpotekBelgesiYuklenmeTarihi/:islemTuru"), (req, res) => {
    const paramReferenceNumber = req.params.paramReferenceNumber;
    const paramAttachmentName = req.params.paramAttachmentName;
    const paramBase64AttachmentBody = req.params.paramBase64AttachmentBody;
    const IpotekBelgesiYuklenmeTarihi = req.params.IpotekBelgesiYuklenmeTarihi;
    const islemTuru = req.params.islemTuru;
    insertAttachmentReferanceNumber(paramReferenceNumber, paramAttachmentName, paramBase64AttachmentBody, IpotekBelgesiYuklenmeTarihi, islemTuru, (data) => {
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


router.post(("/api/fu_mobile/Insert_Attachment_With_Reference_Number_PDF_V2"), (req, res) => {
    const paramReferenceNumber = req.params.paramReferenceNumber;
    const paramAttachmentName = req.params.paramAttachmentName;
    const paramBase64AttachmentBody = req.params.paramBase64AttachmentBody;
    const IpotekBelgesiYuklenmeTarihi = req.params.IpotekBelgesiYuklenmeTarihi;
    const islemTuru = req.params.islemTuru;
    insertAttachmentReferanceNumber(paramReferenceNumber, paramAttachmentName, paramBase64AttachmentBody, IpotekBelgesiYuklenmeTarihi, islemTuru, (data) => {
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