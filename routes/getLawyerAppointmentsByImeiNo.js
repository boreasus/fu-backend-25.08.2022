const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
const parser = new xml2js.Parser();
const { parseString } = require('xml2js')
const express = require("express");
const { json } = require("express");
const { parse } = require("path");
const { callbackify } = require("util");
const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
var router = express.Router();





function getLawyerAppointments(ImeiNo,callback) {
    const params = {
        ImeiNo: ImeiNo
    }
    soap.createClient(url, function(err, client) {
   
        client.Get_LawyerAppointments_ByImeiNo(params, function(err, result) {
            const data = result["Get_LawyerAppointments_ByImeiNoResult"];
            console.log('dataAAA',data);

            callback(data)
        })

    })
}
router.get(("/api/fu_mobile/Get_LawyerAppointments_ByImeiNo/:ImeiNo"), (req, res) => {
    const ImeiNo = req.params.ImeiNo
    getLawyerAppointments(ImeiNo,(data)=>{
        parseString(data, (err, response) => {
            console.log('res', response)
            if(err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    });

})

let data = {
    Get_LawyerAppointments_ByImeiNo: [{
        "ImeiNo": "12345678911",

    }]
}
router.post(("/api/fu_mobile/Get_LawyerAppointments_ByImeiNo"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_LawyerAppointments_ByImeiNo.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;