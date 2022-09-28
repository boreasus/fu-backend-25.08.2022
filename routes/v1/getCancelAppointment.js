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


function agreementDeals(
    FuRefNo,
    firstHourOfDay

) {
    soap.createClient(url, function(err, client) {
        const params = {
            FuRefNo: FuRefNo,
            firstHourOfDay: firstHourOfDay,
        }
        client.Get_Randevu_Iptal_Nedenleri_List(params, function(err, result) {
            XmlData = result["Get_Randevu_Iptal_Nedenleri_ListResult"];
            console.log(XmlData);
            return XmlData;
        })

    })
}
agreementDeals("Fu8d96e2228e94f6b", "2020-10-26T21:32:52.12679");
app.get(("/api/fu_mobile/Get_Randevu_Iptal_Nedenleri_List/:FuRefNo/:firstHourOfDay"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, results) {
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        res.send(data);
    })
    res.send(xmldata);
})

let data = {
    Get_Randevu_Iptal_Nedenleri_List: [{
        "FuRefNo": "Fu8d96e2228e94f6b",
        "firstHourOfDay": "2020-10-26T21:32:52.12679"
    }]
}
app.post(("/api/fu_mobile/Get_Randevu_Iptal_Nedenleri_List"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_Randevu_Iptal_Nedenleri_List.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})