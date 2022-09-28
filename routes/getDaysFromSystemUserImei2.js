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



function agreementDeals(
    Imei2,
    blnKayitIslemi,
    DayOff_Start,
    DayOff_Finish,
    callback
) {
    soap.createClient(url, function(err, client) {
        const params = {
            Imei2: Imei2,
            blnKayitIslemi: blnKayitIslemi,
            DayOff_Start: DayOff_Start,
            DayOff_Finish: DayOff_Finish,
        }
        client.Get_OFF_Days_From_SystemUser_With_Imei2(params, function(err, result) {
            const data = result?.Get_OFF_Days_From_SystemUser_With_Imei2Result;
            
            callback(data);
        })

    })
}
router.get(("/api/fu_mobile/Get_OFF_Days_From_SystemUser_With_Imei2/:Imei2/:blnKayitIslemi/:DayOff_Start/:DayOff_Finish"), (req, res) => {
    const Imei2 = req.params.Imei2;
    const blnKayitIslemi = req.params.blnKayitIslemi;
    const DayOff_Start = req.params.DayOff_Start;
    const DayOff_Finish = req.params.DayOff_Finish;
    agreementDeals(Imei2,blnKayitIslemi,DayOff_Start,DayOff_Finish,(data)=>{
      if(data){
          
        parseString(data, {explicitArray:false}, (err, response) => {
            console.log('Res>>>>>>>', response)
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response['IzinTarihleri']
            })
        })
      }
    })
})



module.exports = router;