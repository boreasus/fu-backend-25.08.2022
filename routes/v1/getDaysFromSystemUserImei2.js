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
    Imei2,
    blnKayitIslemi,
    DayOff_Start,
    DayOff_Finish,
) {
    soap.createClient(url, function(err, client) {
        const params = {
            Imei2: Imei2,
            blnKayitIslemi: blnKayitIslemi,
            DayOff_Start: DayOff_Start,
            DayOff_Finish: DayOff_Finish,
        }
        client.Get_OFF_Days_From_SystemUser_With_Imei2(params, function(err, result) {
            XmlData = result;
            console.log(XmlData);
            return XmlData;
        })

    })
}
agreementDeals("123456", true, "10/10/2020 10:10", "12/10/2020 10:10");
app.get(("/api/fu_mobile/Get_OFF_Days_From_SystemUser_With_Imei2/:Imei2/:blnKayitIslemi/:DayOff_Start/:DayOff_Finish"), (req, res) => {
    xmldata = XmlData;
    // parseString(xmldata, function(err, results) {
    //     let data = JSON.stringify(results);
    //     data = JSON.parse(data);
    //     res.send(data);
    // })
    res.send(xmldata);
})

let data = {
    Get_OFF_Days_From_SystemUser_With_Imei2: [{
        "Imei2": "123456",
        "blnKayitIslemi": "true",
        "DayOff_Start": "10/10/2020 10:10",
        "DayOff_Finish": "12/10/2020 10:10"
    }]
}
app.post(("/api/fu_mobile/Get_OFF_Days_From_SystemUser_With_Imei2"), (req, res) => {
    let body = req.body;
    let query = req.query;

    data.Get_OFF_Days_From_SystemUser_With_Imei2.push(body);
    if (query.type === 'xml') {
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    } else {
        return res.send(data);
    }

})