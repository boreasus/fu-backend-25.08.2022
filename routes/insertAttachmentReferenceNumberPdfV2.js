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
        client.Insert_Attachment_With_Reference_Number_PDF_V2(params,function(err, result) {
            const data = result;
            callback(data);
        })

    })
}


const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./routes/islemler.db',(err)=>{
    if(err) console.log(err);
    else console.log("DataBase bağlantısı yapıldı3");
});


//insertAttachmentReferanceNumber("FU8D811ED214365E7", "vekaletname_FU8D811ED214365E7.pdf", "base64string_documaniçeriği", "10/10/2020 10.10");
router.get(("/api/fu_mobile/Insert_Attachment_With_Reference_Number_PDF_V2/:paramReferenceNumber/:paramAttachmentName/:paramBase64AttachmentBody/:IpotekBelgesiYuklenmeTarihi/:islemTuru"), (req, res) => {
    const paramReferenceNumber = req.params.paramReferenceNumber;
    const paramAttachmentName = req.params.paramAttachmentName;
    const paramBase64AttachmentBody = req.params.paramBase64AttachmentBody;
    const IpotekBelgesiYuklenmeTarihi = req.params.IpotekBelgesiYuklenmeTarihi;
    const islemTuru = req.params.islemTuru;
    insertAttachmentReferanceNumber(paramReferenceNumber, paramAttachmentName, paramBase64AttachmentBody, IpotekBelgesiYuklenmeTarihi, islemTuru, (data) => {
        console.log(data);
        console.log(">>>>,", data['Insert_Attachment_With_Reference_Number_PDF_V2Result']);
        if(data['Insert_Attachment_With_Reference_Number_PDF_V2Result'] == 'OK'){
                // fs.writeFile('./routes/Output.txt',paramBase64AttachmentBody,(err)=>{
                //     console.log("err>>err>>",err);
                // })

                console.log("bura calisti");
                var dbTur;
                if(islemTuru == "1"){
                    console.log("bura calisti2");

                    console.log("1",islemTuru);
                    dbTur = 2
                }
                else dbTur = 3;
                
                var sql = `UPDATE islemler SET (category) = 
                CASE WHEN (category) != 2 THEN ("${dbTur}") ELSE 2 END
                WHERE islem_id="${paramReferenceNumber.toUpperCase()}"`;
                db.all(sql,(err,rows) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("kategori güncellendi");
                    }
                })

            

        }
        else{
            var sql = `UPDATE islemler SET (category) = ("4") WHERE islem_id="${paramReferenceNumber.toUpperCase()}"`;
            db.all(sql,(err,rows) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("kategori güncellendi");
                }
            })


        }

        console.log(">>>< aaa >>>",data['Insert_Attachment_With_Reference_Number_PDF_V2Result'])

        return res.send({

            
            data: data['Insert_Attachment_With_Reference_Number_PDF_V2Result']
        })


        parseString(data, (err, response) => {
            console.log(response);
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: data
            })
        })
    });
})



module.exports = router;