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


function get_notification_departments() {
    soap.createClient(url, function(err, client) {
        client.Get_Notification_Departments(function(err, result) {
            XmlData = result["Get_Notification_DepartmentsResult"];
            return XmlData;
        })
    })
}
get_notification_departments();
app.get(("/api/fu_mobile/notification_departments"), (req, res) => {
    console.log("çalışıyor");
    // get_notification_departments();
    xmldata = XmlData;
    parseString(xmldata, function(err, results) {
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        res.send(data);
    })
})




















app.get(("/api/fu_mobile/notification_departments/:ID"), (req, res) => {

})






/*
//Rest api
app.get('/a/products', (req, res) => {
    res.send(
        [
            { "sira": 1, "adi": "Yusuf", "soyadi": "SEZER" },
            { "sira": 2, "adi": "Ramazan", "soyadi": "SEZER" },
            { "sira": 3, "adi": "Sinan", "soyadi": "SEZER" },
            { "sira": 4, "adi": "Mehmet", "soyadi": "SEZER" }
        ]
    )

})

app.get('/a/products/:id', (req, res) => {
    res.send(req.params.id);
})*/