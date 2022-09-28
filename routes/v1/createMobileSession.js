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


app.get(("/"), (req, res, next) => {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(`Example app listening ${port}`);
})


function createMobileSession(ImeiNO, SmsId) {
    soap.createClient(url, function(err, client) {
        const params = {
            ImeiNO: ImeiNO,
            SmsId: SmsId
        }
        client.CreateMobileSession(params, function(err, result) {
            XmlData = result
            console.log(XmlData);
            return XmlData;
        })
    })
}
createMobileSession(454632, 123456);
app.get(("/api/fu_mobile/check/createMobileSession"), (req, res) => {
    res.send(XmlData);
})