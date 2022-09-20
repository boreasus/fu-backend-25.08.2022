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

const testFu2 = (pGuidNew_Banka_ZiyaretiId,imei,pDtZiyaret_Tarihi,pGuidSubeId,pStrTitle,pStrIletisimNumarasi,pStrGorusulenKisininAdiSoyadi,pStrAylikIslemSayisi,pBLnRakipFirmaIleCalisiyorMu,pStrRakipFirmaAdi
    ,pStrRakipFirmaAciklamasi,pIntTercihEdilmeSebebiId,pStrTercihEdilmeSebebi,pStrGenelAciklama,pIntIlkUygunlukNotu,pIntTesisAsamasindaMMNot,pIntTesisSonrasiMMNot,pIntTesisSonrasiHUNot,pIntTesisSonrasiETNot,
    pIntFuIletisimNot,pStrMusteriOneriText,Email,callback) => {

    const data = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="http://www.fu.com.tr/Webservices">
    <soap:Header>
       <web:AuthHeader>
          <!--Optional:-->
          <web:Username>!1Tradesoft1!</web:Username>
          <!--Optional:-->
          <web:Password>x1w2q3!!4#IUYMD97F3M3YWRAJ65375X</web:Password>
       </web:AuthHeader>
    </soap:Header>
    <soap:Body>
    <web:InsertOrUpdate_Ziyaret_ByZiyaretId>
    <web:pGuidNew_Banka_ZiyaretiId>{${pGuidNew_Banka_ZiyaretiId}}</web:pGuidNew_Banka_ZiyaretiId>
    <!--Optional:-->
    <web:ImeiNo>${imei}</web:ImeiNo>
    <web:pDtZiyaret_Tarihi>${pDtZiyaret_Tarihi}</web:pDtZiyaret_Tarihi>
    <web:pGuidSubeId>${pGuidSubeId}</web:pGuidSubeId>
    <!--Optional:-->
    <web:pStrTitle>${pStrTitle}</web:pStrTitle>
    <!--Optional:-->
    <web:pStrIletisimNumarasi>${pStrIletisimNumarasi}</web:pStrIletisimNumarasi>
    <!--Optional:-->
    <web:pStrGorusulenKisininAdiSoyadi>${pStrGorusulenKisininAdiSoyadi}</web:pStrGorusulenKisininAdiSoyadi>
    <!--Optional:-->
    <web:pStrAylikIslemSayisi>${pStrAylikIslemSayisi}</web:pStrAylikIslemSayisi>
    <web:pBLnRakipFirmaIleCalisiyorMu>${pBLnRakipFirmaIleCalisiyorMu}</web:pBLnRakipFirmaIleCalisiyorMu>
    <!--Optional:-->
    <web:pStrRakipFirmaAdi>${pStrRakipFirmaAdi}</web:pStrRakipFirmaAdi>
    <!--Optional:-->
    <web:pStrRakipFirmaAciklamasi>${pStrRakipFirmaAciklamasi}</web:pStrRakipFirmaAciklamasi>
    <web:pIntTercihEdilmeSebebiId>${pIntTercihEdilmeSebebiId}</web:pIntTercihEdilmeSebebiId>
    <!--Optional:-->
    <web:pStrTercihEdilmeSebebi>${pStrTercihEdilmeSebebi}</web:pStrTercihEdilmeSebebi>
    <!--Optional:-->
    <web:pStrGenelAciklama>${pStrGenelAciklama}</web:pStrGenelAciklama>
    <web:pIntIlkUygunlukNotu>${pIntIlkUygunlukNotu}</web:pIntIlkUygunlukNotu>
    <web:pIntTesisAsamasindaMMNot>${pIntTesisAsamasindaMMNot}</web:pIntTesisAsamasindaMMNot>
    <web:pIntTesisSonrasiMMNot>${pIntTesisSonrasiMMNot}</web:pIntTesisSonrasiMMNot>
    <web:pIntTesisSonrasiHUNot>${pIntTesisSonrasiHUNot}</web:pIntTesisSonrasiHUNot>
    <web:pIntTesisSonrasiETNot>${pIntTesisSonrasiETNot}</web:pIntTesisSonrasiETNot>
    <web:pIntFuIletisimNot>${pIntFuIletisimNot}</web:pIntFuIletisimNot>
    <!--Optional:-->
    <web:pStrMusteriOneriText>${pStrMusteriOneriText}</web:pStrMusteriOneriText>
    <!--Optional:-->
    <web:pStrXKoordinat>?</web:pStrXKoordinat>
    <!--Optional:-->
    <web:pStrYKoordinat>?</web:pStrYKoordinat>
    <!--Optional:-->
    <web:Email>${Email}</web:Email>
 </web:InsertOrUpdate_Ziyaret_ByZiyaretId>

    </soap:Body>
 </soap:Envelope>`

    const config = {
        method: 'post',
        url: 'http://212.58.21.132:81/BusinessService/IsTakipService.asmx?op=InsertOrUpdate_Ziyaret_ByZiyaretId',
        headers: { 
          'SOAPAction': 'http://www.fu.com.tr/Webservices/InsertOrUpdate_Ziyaret_ByZiyaretId', 
          'Content-Type': 'text/xml; charset=utf-8'
        },
        data : data
      };

    axios(config)
    .then((response) => {
        const json = xmlParser.toJson(response.data)
        // console.log(response.data)
        callback(response.data);
    })
    .catch((err) => {
        console.log('err', err)
    })
}


    
    

router.get(("/api/fu_mobile/InsertOrUpdateZiyaretByZiyaretId/:pGuidNew_Banka_ZiyaretiId/:imei/:pDtZiyaret_Tarihi/:pGuidSubeId/:pStrTitle/:pStrIletisimNumarasi/:pStrGorusulenKisininAdiSoyadi/:pStrAylikIslemSayisi/:pBLnRakipFirmaIleCalisiyorMu/:pStrRakipFirmaAdi/:pStrRakipFirmaAciklamasi/:pIntTercihEdilmeSebebiId/:pStrTercihEdilmeSebebi/:pStrGenelAciklama/:pIntIlkUygunlukNotu/:pIntTesisAsamasindaMMNot/:pIntTesisSonrasiMMNot/:pIntTesisSonrasiHUNot/:pIntTesisSonrasiETNot/:pIntFuIletisimNot/:pStrMusteriOneriText/:Email"), (req, res) => {
    const pGuidNew_Banka_ZiyaretiId = req.params.pGuidNew_Banka_ZiyaretiId;
    const imei = req.params.imei;
    const pDtZiyaret_Tarihi = req.params.pDtZiyaret_Tarihi;
    const pGuidSubeId = req.params.pGuidSubeId;
    const pStrTitle = req.params.pStrTitle;
    const pStrIletisimNumarasi = req.params.pStrIletisimNumarasi;
    const pStrGorusulenKisininAdiSoyadi = req.params.pStrGorusulenKisininAdiSoyadi;
    const pStrAylikIslemSayisi = req.params.pStrAylikIslemSayisi;
    const pBLnRakipFirmaIleCalisiyorMu = req.params.pBLnRakipFirmaIleCalisiyorMu;
    const pStrRakipFirmaAdi = req.params.pStrRakipFirmaAdi;
    const pStrRakipFirmaAciklamasi = req.params.pStrRakipFirmaAciklamasi;
    const pIntTercihEdilmeSebebiId = req.params.pIntTercihEdilmeSebebiId;
    const pStrTercihEdilmeSebebi = req.params.pStrTercihEdilmeSebebi;
    const pStrGenelAciklama = req.params.pStrGenelAciklama;
    const pIntIlkUygunlukNotu = req.params.pIntIlkUygunlukNotu;
    const pIntTesisAsamasindaMMNot = req.params.pIntTesisAsamasindaMMNot;
    const pIntTesisSonrasiMMNot = req.params.pIntTesisSonrasiMMNot;
    const pIntTesisSonrasiHUNot = req.params.pIntTesisSonrasiHUNot;
    const pIntTesisSonrasiETNot = req.params.pIntTesisSonrasiETNot;
    const pIntFuIletisimNot = req.params.pIntFuIletisimNot;
    const pStrMusteriOneriText = req.params.pStrLapStrMusteriOneriTextstDate;
    const Email = req.params.Email;


    testFu2(pGuidNew_Banka_ZiyaretiId,imei,pDtZiyaret_Tarihi,pGuidSubeId,pStrTitle,pStrIletisimNumarasi,pStrGorusulenKisininAdiSoyadi,
        pStrAylikIslemSayisi,pBLnRakipFirmaIleCalisiyorMu,pStrRakipFirmaAdi,pStrRakipFirmaAciklamasi,pIntTercihEdilmeSebebiId,
        pStrTercihEdilmeSebebi,pStrGenelAciklama,pIntIlkUygunlukNotu,pIntTesisAsamasindaMMNot,pIntTesisSonrasiMMNot,
        pIntTesisSonrasiHUNot,pIntTesisSonrasiETNot,pIntFuIletisimNot,pStrMusteriOneriText,Email, (data) => {
        // console.log(data);

        parseString(data, {explicitArray:false},(err, response) => {
            data = response
            
            return res.send({
                data: response['soap:Envelope']['soap:Body']['InsertOrUpdate_Ziyaret_ByZiyaretIdResponse']

            })


            
        })
    });
})


module.exports = router;