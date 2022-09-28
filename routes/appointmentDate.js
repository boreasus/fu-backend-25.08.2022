const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
const parser = new xml2js.Parser();
const { parseString } = require('xml2js')
const express = require("express");
const { json } = require("express");
const { parse } = require("path");
const { response } = require("../app");
const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
var router = express.Router();





function getAppointmentDate(paramImeiNo,paramReferenceNo,callback) {
    const params = {
        paramImeiNo: paramImeiNo,
        paramReferenceNo: paramReferenceNo
    }
    soap.createClient(url, function(err, client) {
        
        client.Get_Randevu_Tarihi(params, function(err, result) {
           //buradan yanlışlıkla bir şey silmiş olabilirim
           callback(result)
        })

    })
}
router.get("/api/fu_mobile/Get_Randevu_Tarihi/:paramImeiNo/:paramReferenceNo", (req, res) => {
    const paramImeiNo = req.params.paramImeiNo
    const paramReferenceNo = req.params.paramReferenceNo

    getAppointmentDate(paramImeiNo, paramReferenceNo,(data) => {
        
        parseString(data, (err,response) => {
            console.log('res', response)
            console.log('err', err)
            if(err) {
                return res.status(400).send({
                    message: err.message
                })
            }
            return res.send({
                data: response
            })
        })
    });
    // parseString(xmldata, function(err, results) {
    //     let data = JSON.stringify(results);
    //     data = JSON.parse(data);
    //     res.send(data);
    // })
});

let data = {
    Get_Randevu_Tarihi: [{
        "paramImeiNo": "EFA82DF177",
        "paramReferenceNo": "Fu8d96df7deed8ed1"
    }]
}
router.post(("/api/fu_mobile/Get_Randevu_Tarihi"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_Randevu_Tarihi.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;