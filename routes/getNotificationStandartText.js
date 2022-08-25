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



function getNotificationStandartText(callback) {
    soap.createClient(url, function(err, client) {
        client.Get_Notification_StandartText(function(err, result) {
            const data = result["Get_Notification_StandartTextResult"];
            callback(data)
        })

    })
}
router.get(("/api/fu_mobile/Get_Notification_StandartText"), (req, res) => {
    getNotificationStandartText((data)=>{
        parseString(data,{explicitArray:false}, (err, response) => {
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
    Get_Notification_StandartText: [{}]
}
router.post(("/api/fu_mobile/Get_Notification_StandartText"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_Notification_StandartText.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})

module.exports = router;