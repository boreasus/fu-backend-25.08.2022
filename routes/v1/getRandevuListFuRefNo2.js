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


function getRandevuList(FuRefNo, firstHourOfDay) {
    soap.createClient(url, function(err, client) {
        const params = {
            FuRefNo: FuRefNo,
            firstHourOfDay: firstHourOfDay
        }
        client.GetRandevuList_Get_By_FuRefNoV2(params, function(err, result) {
            XmlData = result["GetRandevuList_Get_By_FuRefNoV2Result"];
            console.log(XmlData);
            return XmlData;
        })

    })
}
getRandevuList("Fu8d96e2228e94f6b", "12");
app.get(("/api/fu_mobile/GetRandevuList_Get_By_FuRefNoV2/:FuRefNo/:firstHourOfDay"), (req, res) => {
    xmldata = XmlData;
    parseString(xmldata, function(err, results) {
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        res.send(data);
    })
})


let data = {
    GetRandevuList_Get_By_FuRefNoV2: [{
        "FuRefNo": "Fu8d96e2228e94f6b",
        "firstHourOfDay": "12"
    }]
}
app.post(("/api/fu_mobile/GetRandevuList_Get_By_FuRefNoV2"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.GetRandevuList_Get_By_FuRefNoV2.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})