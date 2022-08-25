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


app.get(("/"), (req, res, next) => {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(`Example app listening ${port}`);
})


function mobileDeedAppointment(
    paramTime,
    paramYear,
    paramMonth,
    paramDay
) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramTime: paramTime,
            paramYear: paramYear,
            paramMonth: paramMonth,
            paramDay: paramDay
        }
        client.MobileTapuRandevuAtama(function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })

    })
}
mobileDeedAppointment("10:10", "2020", "6", "16");
app.post(("/api/fu_mobile/MobileTapuRandevuAtama/:paramTime/:paramYear/:paramMonth/:paramDay"), (req, res) => {
    xmldata = XmlData;
    res.send(xmldata.body);

})


let data = {
    MobileTapuRandevuAtama: [{
        "paramTime": "12345678911",
        "paramYear": "12345",
        "paramMonth": "",
        "paramDay": ""
    }]
}
app.post(("/api/fu_mobile/MobileTapuRandevuAtama"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.MobileTapuRandevuAtama.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})