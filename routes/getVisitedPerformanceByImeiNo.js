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



function getVisitedPerformance(ImeiNO, callback) {
    const params = {
        ImeiNO: ImeiNO
    }
    soap.createClient(url, function(err, client) {

        client.Get_ZiyaretPerformansi_ByImeiNO(params, function(err, result) {
            const data = result["Get_ZiyaretPerformansi_ByImeiNOResult"];
            callback(data)
        })
    })
}
// getVisitedPerformance("7080449043");

router.get(("/api/fu_mobile/Get_ZiyaretPerformansi_ByImeiNO/:ImeiNO"), (req, res) => {
    const ImeiNO = req.params.ImeiNO
    getVisitedPerformance(ImeiNO, (data) => {
        parseString(data, (err, response) => {
            console.log('data', data);

            console.log('res', response)
            if (err) {
                return res.status(400).send(err)
            }
            console.log(response);
            return res.send({
                data: response
            })
        })
    });

})
let data = {
    Get_ZiyaretPerformansi_ByImeiNO: [{
        "ImeiNO": "7080449043",
    }]
}
router.post(("/api/fu_mobile/Get_ZiyaretPerformansi_ByImeiNO"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_ZiyaretPerformansi_ByImeiNO.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }
})

module.exports = router;