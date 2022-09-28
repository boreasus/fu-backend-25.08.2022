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


function getVisitedList(ImeiNO,callback) {
    params = {
        ImeiNO: ImeiNO
    }
    soap.createClient(url, function(err, client) {
      
        client.Get_ZiyaretList_ByImeiNO(params, function(err, result) {
            const data = result["Get_ZiyaretList_ByImeiNOResult"];
            callback(data)
        })

    })
}
// getVisitedList("7080449043");
router.get(("/api/fu_mobile/Get_ZiyaretList_ByImeiNO/:ImeiNO"), (req, res) => {
    const ImeiNO = req.params.ImeiNO
    getVisitedList(ImeiNO,(data)=>{
        parseString(data,{explicitArray:false}, (err, response) => {
            console.log('res', response)
            if(err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response['Ziyaretler']['Ziyaret']
            })
        })
    });

    })





module.exports = router;