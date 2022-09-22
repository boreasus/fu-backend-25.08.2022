const soap = require("strong-soap").soap;
const fs = require("fs");
const xml2js = require('xml2js');
const url = "http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=CheckMutabakatAvukati";
const parser = new xml2js.Parser();
const { parseString } = require('xml2js')
const express = require("express");
const { json } = require("express");
const { parse } = require("path");
const port = 3000;
const app = express();
var bodyParser = require('body-parser');
const { Module } = require("module");
app.use(express.urlencoded({ extended: true }));
const xmlparser = require('express-xml-bodyparser');
const xml = require("xml");
app.use(express.json())
app.use(xmlparser());
var router = express.Router();



const axios = require('axios')
let xmlParser = require('xml2json')

const testFu = (paramImeiNo,callback) => {

    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
        <AuthHeader xmlns="http://www.fu.com.tr/Webservices">
          <Username>!1Tradesoft1!</Username>
          <Password>x1w2q3!!4#IUYMD97F3M3YWRAJ65375X</Password>
        </AuthHeader>
      </soap:Header>
      <soap:Body>
        <Login_ByImei_New xmlns="http://www.fu.com.tr/Webservices">
          <paramImeiNo>${paramImeiNo}</paramImeiNo>
        </Login_ByImei_New>
      </soap:Body>
    </soap:Envelope>`

    const config = {
        method: 'post',
        url: 'http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=Login_ByImei_New',
        headers: { 
          'SOAPAction': 'http://www.fu.com.tr/Webservices/Login_ByImei_New', 
          'Content-Type': 'text/xml; charset=utf-8'
        },
        data : data
      };

    axios(config)
    .then((response) => {
        const json = xmlParser.toJson(response.data)
        callback(response.data);
    })
    .catch((err) => {
        console.log('err', err)
    })
}


const sqlite3 = require('sqlite3');
const { reject } = require("lodash");
const e = require("express");
const db = new sqlite3.Database('./routes/islemler.db',(err)=>{
    if(err) console.log(err);
    else console.log("DataBase bağlantısı yapıldı2");
});
var sql = "INSERT INTO islemler (islem_id, category) VALUES (?,?)";

var parent = {};
var child = []
parent.child = child;


async function getCategory(sqlForSearch){
    return new Promise((resolve,reject) =>{
        db.get(sqlForSearch, async (err,rows) => {
            if(err){
                return reject(err);
            }
            else{
                console.log("aaa = > ",rows['category'] )
                resolve(rows['category']);
            }
        })
    })
    

}

router.get(("/api/fu_mobile/Login_ByImei/:paramImeiNo"), (req, res) => {
    const paramImeiNo = req.params.paramImeiNo;
    testFu(paramImeiNo, (data) => {

        parseString(data, {explicitArray:false},  async (err, response) =>  {
            if (err) {
                return res.status(400).send(err)
            }
            var jsob = response["soap:Envelope"]["soap:Body"]["Login_ByImei_NewResponse"]["Login_ByImei_NewResult"]["diffgr:diffgram"]["DocumentElement"]["Login_ByImei_New"];
            
            
            for (var i = 0; i < jsob.length; i++) {
                var obj = jsob[i];
                // console.log(">>"+obj.New_FuReferansNo);

                //adding to database
                if(!obj.New_TapuRandevuTarihi){
                    var params = [obj.New_FuReferansNo,"99"];
                db.all(sql,params,(err,rows) => {
                    if(err){
                        console.log("bu id ile daha önce işlem oluşturulduğu için pass geçildi");
                    }
                })
                }
                else{
                    var params = [obj.New_FuReferansNo,"1"];
                db.all(sql,params,(err,rows) => {
                    if(err){
                        console.log("bu id ile daha önce işlem oluşturulduğu için pass geçildi");
                    }
                })
                }


                //creating json object
                var Ad = obj.Ad;
                var FullName = obj.FullName;
                var New_FuReferansNo = obj.New_FuReferansNo;
                var New_TapuRandevuTarihi = obj.New_TapuRandevuTarihi;
                var CreatedOn = obj.CreatedOn;
                var New_IsinTipi = obj.New_IsinTipi;
                var VeriKullanimIzni = obj.VeriKullanimIzni;
                var sqlForSearch = `SELECT category FROM islemler WHERE islem_id = "${New_FuReferansNo}"`;
                let categoryForJson = await getCategory(sqlForSearch); 
          
                
            var islem = {
                "Ad": Ad,
                "FullName": FullName,
                "New_FuReferansNo": New_FuReferansNo,
                "New_TapuRandevuTarihi": New_TapuRandevuTarihi,
                "FullName": FullName,
                "CreatedOn": CreatedOn,
                "New_IsinTipi": New_IsinTipi,
                "VeriKullanimIzni": VeriKullanimIzni,
                "Category": `${categoryForJson}`,
                }
            console.log("islem>>>",islem);
            parent.child.push(islem);
            

            }
            var response = JSON.parse(JSON.stringify(parent)).child;
            parent.child = [];

            return res.send({
                 data: response

            })
        })
    });
})

module.exports = router;