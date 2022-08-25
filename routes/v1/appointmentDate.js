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


function getAppointmentDate(
    paramImeiNo,
    paramReferenceNo


) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramImeiNo: paramImeiNo,
            paramReferenceNo: paramReferenceNo
        }
        client.Get_Randevu_Tarihi(params, function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })

    })
}
getAppointmentDate("EFA82DF177", "Fu8d96df7deed8ed1");
app.get(("/api/fu_mobile/Get_Randevu_Tarihi/:paramImeiNo/:paramReferenceNo"), (req, res) => {
    xmldata = XmlData;
    // parseString(xmldata, function(err, results) {
    //     let data = JSON.stringify(results);
    //     data = JSON.parse(data);
    //     res.send(data);
    // })
    res.send(xmldata);
})

let data = {
    Get_Randevu_Tarihi: [{
        "paramImeiNo": "EFA82DF177",
        "paramReferenceNo": "Fu8d96df7deed8ed1"
    }]
}
app.post(("/api/fu_mobile/Get_Randevu_Tarihi"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_Randevu_Tarihi.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})