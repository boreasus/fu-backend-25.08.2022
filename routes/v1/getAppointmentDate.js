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



app.get(("/"), (req, res, next) => {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(`Example app listening ${port}`);
})


function getAppointmentDate(pStrImeiNo) {
    soap.createClient(url, function(err, client) {
        const params = {
            pStrImeiNo: pStrImeiNo
        }
        client.CheckMutabakatAvukati(params, function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })

    })
}
getAppointmentDate("EFA82DF177");
app.get(("/api/fu_mobile/check/getAppointmentData"), (req, res) => {
    xmldata = XmlData;
    res.send(xmldata);
})