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


function updateAccount(pGuidMutabakatId) {
    soap.createClient(url, function(err, client) {
        const params = {
            pGuidMutabakatId: pGuidMutabakatId
        }
        client.UpdateMutabakatMuhasebeOnayinaGonder(params, function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })
    })
}
updateAccount("C874C074-7EAC-EA11-B70E-0050568A360F");

app.get(("/api/fu_mobile/UpdateMutabakatMuhasebeOnayinaGonder/:pGuidMutabakatId"), (req, res) => {
    xmldata = XmlData;
    res.send(xmldata);
})
let data = {
    UpdateMutabakatMuhasebeOnayinaGonder: [{
        "pGuidMutabakatId": "12345678911",

    }]
}
app.post(("/api/fu_mobile/UpdateMutabakatMuhasebeOnayinaGonder"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.UpdateMutabakatMuhasebeOnayinaGonder.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})