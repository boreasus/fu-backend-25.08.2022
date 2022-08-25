const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
// const parser = new xml2js.Parser();
const { parseString } = require('xml2js')
const express = require("express");
const { json } = require("express");
const { parse } = require("path");
const port = 3000;
const app = express();
var router = express.Router();

//const parser = require('xml2json')



function checkSmsMobile(IMEI, callback) {
    const params = {
        ImeiNo: IMEI
    }
    soap.createClient(url, function(err, client) {
        client.CheckSMSForMobile(params, function(err, result) {
            data = result['CheckSMSForMobileResult']
-            // const data = result["CheckSMSForMobileResult"]
            // console.log('CheckSMSForMobileResultCheckSMSForMobileResult', data)
            callback(result, err)
        })
    })
}
router.get(("/api/fu_mobile/check/checkSmsMobile/:ImeiNo"), (req, res) => {
    const ImeiNo = req.params.ImeiNo
    checkSmsMobile(ImeiNo, (data, error) => {
        if (error) return res.status(400).send(error)
        return res.send(data)
            parseString(data, (err, response) => {
                console.log('res', response)
                if(err) {
                    return res.status(400).send(err)
                }
                return res.send({
                    data: response
                })
            })
    })

})



module.exports = router;