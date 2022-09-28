const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?wsdl";
const parser = new xml2js.Parser({explicitArray : false});
const { parseString } = require('xml2js')
const express = require("express");
const { json } = require("express");
const { parse } = require("path");
const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
var router = express.Router();



function agreementDeals(FuRefNo,firstHourOfDay,callback) {
    const params = {
        FuRefNo: FuRefNo,
        firstHourOfDay: firstHourOfDay,
    }
    soap.createClient(url, function(err, client) {
        client.Get_Randevu_Iptal_Nedenleri_List(params, function(err, result) {
            const data = result["Get_Randevu_Iptal_Nedenleri_ListResult"];
            console.log('dataAAA',data);
            callback(data)
        })

    })
}
// agreementDeals("Fu8d96e2228e94f6b", "2020-10-26T21:32:52.12679");
router.get(("/api/fu_mobile/Get_Randevu_Iptal_Nedenleri_List/:FuRefNo/:firstHourOfDay"), (req, res) => {
    const FuRefNo = req.params.FuRefNo
    const firstHourOfDay = req.params.firstHourOfDay
    agreementDeals(FuRefNo, firstHourOfDay,(data)=>{
        parseString(data, {explicitArray:false}, (err, response) => {
            console.log('res', response)
            if(err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response.RandevuIptalNedenleri.RandevuIptalNedeni
            })
        }) 
    });
})

let data = {
    Get_Randevu_Iptal_Nedenleri_List: [{
        "FuRefNo": "Fu8d96e2228e94f6b",
        "firstHourOfDay": "2020-10-26T21:32:52.12679"
    }]
}
router.post(("/api/fu_mobile/Get_Randevu_Iptal_Nedenleri_List"), (req, res) => {
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


module.exports = router;