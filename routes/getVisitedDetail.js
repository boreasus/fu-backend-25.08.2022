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



function getAppointmentDate(ZiyaretId,callback) {
    const params = {
        ZiyaretId: ZiyaretId
    }
    soap.createClient(url, function(err, client) {
        client.Get_ZiyaretDetayi_ByZiyaretID(function(err, result) {
            const data = result["Get_ZiyaretDetayi_ByZiyaretIDResult"];
            console.log('data=====>',data);
            callback(data)
        })

    })
}
router.get(("/api/fu_mobile/Get_ZiyaretDetayi_ByZiyaretID/:ZiyaretId"), (req, res) => {
    const ZiyaretId = req.params.ZiyaretId
    getAppointmentDate(ZiyaretId,(data)=>{
        parseString(data, (err, response) => {
            console.log('data',data);

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
module.exports = router;