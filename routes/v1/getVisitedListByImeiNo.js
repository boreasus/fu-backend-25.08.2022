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


function getVisitedList(ImeiNO) {
    soap.createClient(url, function(err, client) {
        params = {
            ImeiNO: ImeiNO
        }
        client.Get_ZiyaretList_ByImeiNO(params, function(err, result) {
            XmlData = result["Get_ZiyaretList_ByImeiNOResult"];
            console.log(XmlData);
            return XmlData;
        })

    })
}
getVisitedList("7080449043");
app.get(("/api/fu_mobile/Get_ZiyaretList_ByImeiNO/:ImeiNO"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, results) {
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        res.send(data);
    })

})

let data = {
    Get_ZiyaretList_ByImeiNO: [{
        "ImeiNO": "7080449043",
    }]
}
app.post(("/api/fu_mobile/Get_ZiyaretList_ByImeiNO"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_ZiyaretList_ByImeiNO.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})