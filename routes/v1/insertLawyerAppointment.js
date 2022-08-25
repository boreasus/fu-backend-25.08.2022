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


function insertLawyerAppointment(paramReferenceNo, paramTime, paramYear, paramMonth, paramDay) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramReferenceNo: paramReferenceNo,
            paramTime: paramTime,
            paramYear: paramYear,
            paramMonth: paramMonth,
            paramDay: paramDay
        }
        client.Insert_LawyerAppointment(params, function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })
    })
}
insertLawyerAppointment("Fu8d8653a7a0eccc5", "10:00", "2020", "6", "16");

app.get(("/api/fu_mobile/Insert_LawyerAppointment/:paramReferenceNo/:paramTime/:paramYear/:paramMonth/:paramDay"), (req, res) => {
    xmldata = XmlData;
    res.send(xmldata);
})
let data = {
    Insert_LawyerAppointment: [{
        "paramReferenceNo": "Fu8d8653a7a0eccc5",
        "paramTime": "10:00",
        "paramYear": "2020",
        "paramMonth": "6",
        "paramDay": "16"
    }]
}
app.post(("/api/fu_mobile/Insert_LawyerAppointment"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Insert_LawyerAppointment.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})