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
var router = express.Router();


function createMobileSession(ImeiNO, SmsId,callback) {
    const params = {
        ImeiNO: ImeiNO,
        SmsId: SmsId
    }
    soap.createClient(url, function(err, client) {

        client.CreateMobileSession(params, function(err, result) {
            const data = result;
            callback(data)
        })
    })
}
router.get(("/api/fu_mobile/check/createMobileSession/:ImeiNO/:SmsId"), (req, res) => {
    const ImeiNO = req.params.ImeiNO
    const SmsId = req.params.SmsId
    createMobileSession(ImeiNO, SmsId,(data)=>{
        console.log('get',data)
        parseString(data, (err, response) => {
            if(err) {
                return res.send({data:data.CreateMobileSessionResult})
            }
            return res.send({
                data: response
            })
        })
    });
    
})

module.exports = router;