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
var router = express.Router();




function getRandevuList(FuRefNo, firstHourOfDay,callback) {
    const params = {
        FuRefNo: FuRefNo,
        firstHourOfDay: firstHourOfDay
    }
    soap.createClient(url, function(err, client) {
        client.GetRandevuList_Get_By_FuRefNoV2(params, function(err, result) {
            const data = result["GetRandevuList_Get_By_FuRefNoV2Result"];
            callback(data);
        })

    })
}
router.get(("/api/fu_mobile/GetRandevuList_Get_By_FuRefNoV2/:FuRefNo/:firstHourOfDay"), (req, res) => {
    const FuRefNo = req.params.FuRefNo;
    const firstHourOfDay = req.params.firstHourOfDay
    getRandevuList(FuRefNo,firstHourOfDay,(data)=>{
        parseString(data, (err, response) => {
            console.log('res', response)
            if(err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    });

})


let data = {
    GetRandevuList_Get_By_FuRefNoV2: [{
        "FuRefNo": "Fu8d96e2228e94f6b",
        "firstHourOfDay": "12"
    }]
}
router.post(("/api/fu_mobile/GetRandevuList_Get_By_FuRefNoV2"), (req, res) => {
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

module.exports = router;