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
var bodyParser = require('body-parser');
const { Module } = require("module");
app.use(express.urlencoded({ extended: true }));
const xmlparser = require('express-xml-bodyparser');
const xml = require("xml");
const { response } = require("../app");
app.use(express.json())
app.use(xmlparser());
var router = express.Router();



function insertLawyerAppointment(paramReferenceNo, paramTime, paramYear, paramMonth, paramDay, callback) {
    soap.createClient(url, function(err, client) {
        const params = {
            paramReferenceNo: paramReferenceNo,
            paramTime: paramTime,
            paramYear: paramYear,
            paramMonth: paramMonth,
            paramDay: paramDay
        }
        client.Insert_LawyerAppointment(params, function(err, result) {
            const data = result //["Insert_LawyerAppointmentResult"];
            callback(data);
        })
    })
}
// insertLawyerAppointment("Fu8d8653a7a0eccc5", "10:00", "2020", "6", "16");



const sqlite3 = require('sqlite3');
const { Console } = require("console");
const db = new sqlite3.Database('./routes/islemler.db',(err)=>{
    if(err) console.log(err);
    else console.log("DataBase bağlantısı yapıldı2");
});

router.get(("/api/fu_mobile/Insert_LawyerAppointment/:paramReferenceNo/:paramTime/:paramYear/:paramMonth/:paramDay"), (req, res) => {
    const paramReferenceNo = req.params.paramReferenceNo;
    const paramTime = req.params.paramTime;
    const paramYear = req.params.paramYear;
    const paramMonth = req.params.paramMonth;
    const paramDay = req.params.paramDay;
    insertLawyerAppointment(paramReferenceNo, paramTime, paramYear, paramMonth, paramDay, (data) => {
        parseString(data, (err, response) => {
            console.log("data",data)
            console.log('Res>>>>>>>', response)

            console.log("dkaljdwlakdjlawkdj",data['Insert_LawyerAppointmentResult']);
            if(data['Insert_LawyerAppointmentResult'] == "OK"){
                var sql = `UPDATE islemler SET (category) = ("1") WHERE islem_id="${paramReferenceNo.toUpperCase()}"`;
                db.all(sql,(err,rows) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("kategori güncellendi");
                    }
                })

            }


            if (err) {
                return res.send({
                    data: data
                })
            }
            return res.send({
                data: response
            })
        })
    })
})

router.post(("/api/fu_mobile/Insert_LawyerAppointment"), (req, res) => {
    const paramReferenceNo = req.params.paramReferenceNo;
    const paramTime = req.params.paramTime;
    const paramYear = req.params.paramYear;
    const paramMonth = req.params.paramMonth;
    const paramDay = req.params.paramDay;
    insertLawyerAppointment(paramReferenceNo, paramTime, paramYear, paramMonth, paramDay, (data) => {
        console.log["data", data],
        parseString(data, (err, response) => {
            
            console.log('Res>>>>>>>', response)
            if (err) {
                return res.status(400).send(err)
            }
            return res.send({
                data: response
            })
        })
    })

})

module.exports = router;