var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

//swagger Uıı
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var indexRouter = require('./routes/index');
var checkPinRouter = require('./routes/checkPin');
var updatePinRouter = require('./routes/updatePin');
var updateVersionInformationRouter = require('./routes/updateVersionInformation');
var agreementDealsRouter = require("./routes/agreementsDeals");
var appointmentDateRouter = require("./routes/appointmentDate");
var checkAgreementLawRouter = require("./routes/checkAgreementlaw");
var checkSmsMobileRouter = require("./routes/checkSmsMobile");
var createMobileSessionRouter = require("./routes/createMobileSession");
var getAppointmentRouter = require("./routes/getAppointmentDate");
var getAttachmentsWorkFollowGuidRouter = require("./routes/getAttachmentsWorkFollowGuid");
var getCancelAppointmentRouter = require("./routes/getCancelAppointment");
var getCountLastYearDeedRouter = require("./routes/getCountLastYearDeed");
var getDaysSystemUserImei2Router = require("./routes/getDaysFromSystemUserImei2");
var getDocumentDateWorkFollowRouter = require("./routes/getDocumentDateWorkFollow");
var getDynamicAttributesRouter = require("./routes/getDynamicAttributes");
var getLandOfficeImeiNoRouter = require("./routes/getLandOfficeImeiNo");
var getLawyerAppointmentByImeiNoRouter = require("./routes/getLawyerAppointmentsByImeiNo");
var getLawyerTransactionsAppointmentByImeiNoRouter = require("./routes/getLawyerTransactionsAppointmentBImeiNo");
var getListPrefarenceReassonRouter = require("./routes/getListPrefarenceReason");
var getMainBanksRouter = require("./routes/getMainBanks");
var getMobileAppActionsRouter = require("./routes/getMobileAppActions");
var getMobileAppActionsV2Router = require("./routes/getMobileAppActionsV2");
var getNotificationDepartmentsRouter = require("./routes/getNotificationDepartments");
var getNotificationStandartTextRouter = require("./routes/getNotificationStandartText");
var getPerformanceTableRouter = require("./routes/getPerformanceTable");
var getPushLogsFuReferanceNumberRouter = require("./routes/getPushLogsFuReferenceNumber");
var getPushLogsWithImei2Route = require("./routes/getPushLogsWithImei2");
// var getRandevuListFuReferanceNo2Router = require("./routes/getRandevuListFuRefNo2");
var getVisitedDetailRouter = require("./routes/getVisitedDetail");
var getVisitedListByImeiNoRouter = require("./routes/getVisitedListByImeiNo");
var getVisitedPerformanceByImeiNoRouter = require("./routes/getVisitedPerformanceByImeiNo");
var getWorkFollowByImeiNoRouter = require("./routes/getWorkFollowByImeiNo");
// console.log("merhaba");
var getWorkFollowCountWithLawRouter = require("./routes/getWorkFollowCountWithLaw");
var getWorkFollowDetailRouter = require("./routes/getWorkFollowDetail");
var getWorkFollowDetailV2Router = require("./routes/getWorkFollowDetailV2");
var getWorkFollowDetailXMLRouter = require("./routes/getWorkFollowDetailXML");
var getWorkFollowDetailXmlV2Router = require("./routes/getWorkFollowDetailXmlV2");
var insertAttachmentReferanceNumberRouter = require("./routes/insertAttachmentReferenceNumber");
// var insertAttachmentReferanceNumberPdfImagesRouter = require("./routes/insertAttachmentReferenceNumberPDFImages");
// var insertAttachmentReferenceNumberPDFImagesWitoutMoveFlowRouter = require("./routes/insertAttachmentReferenceNumberPDFImagesWitoutMoveFlow");
var insertAttachmentReferanceNumberPdfV2Router = require("./routes/insertAttachmentReferenceNumberPdfV2");
var insertAttachmentWorkFollowGuidRouter = require("./routes/insertAttachmentWorkFollowGuid");
var insertFileRouter = require("./routes/insertFile");
var insertLawyerAppointmentRouter = require("./routes/insertLawyerAppointment");
var updateAccounterSendRouter = require("./routes/updateAccounterSend");
var updateDataUseContentRouter = require("./routes/updateDataUseContent");
//var updateRandevuDateReferanceNumberRouter = require("./routes/updateRandevuDateReferenceNumber");
var updateStatusOfPushLogRouter = require("./routes/updateStatusOfPushLog");
// var updateStatusPushLogRouter = require("./routes/updateStatusPushLog");
var updateVersionInformationRouter = require("./routes/updateVersionInformation");
var updateAccounterSendRouter = require("./routes/updateAccounterSend");
var mobileDeedAppointmentRouter = require("./routes/mobileDeedAppointment");
var loginByImeiRouter = require("./routes/loginByImei");
var insertLawyerAppointmentRouter = require("./routes/insertLawyerAppointment");
var getWorkFollowDetailXmlV2Router = require("./routes/getWorkFollowDetailXmlV2");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/checkPin', checkPinRouter);
app.use('/updatePin', updatePinRouter);
app.use('/agreementDeals', agreementDealsRouter);
app.use("/appointmentDate", appointmentDateRouter);
app.use('/checkAgreementLaw', checkAgreementLawRouter);
app.use("/checkSmsMobile", checkSmsMobileRouter);
app.use("/createMobileSession", createMobileSessionRouter);
//app.use("/getAppointmentDate", getAppointmentRouter)
app.use("getAttachmentsWorkFollowGuid", getAttachmentsWorkFollowGuidRouter);
app.use("/getCancelAppointment", getCancelAppointmentRouter);
app.use("/getCountLastYearDeed", getCountLastYearDeedRouter);
app.use("/getDaysFromSystemUserImei2", getDaysSystemUserImei2Router);
app.use("/getDocumentDateWorkFollow", getDocumentDateWorkFollowRouter);
app.use("/getDynamicAttributes", getDynamicAttributesRouter);
app.use("/getLandOfficeImeiNo", getLandOfficeImeiNoRouter)
app.use("/getLawyerAppointmentsByImeiNo", getLawyerAppointmentByImeiNoRouter);
app.use("/getLawyerTransactionsAppointmentBImeiNo", getLawyerTransactionsAppointmentByImeiNoRouter);
app.use("/getListPrefarenceReason", getListPrefarenceReassonRouter);
app.use("/getMainBanks", getMainBanksRouter);
app.use("/getMobileAppActions", getMobileAppActionsRouter);
app.use("/getMobileAppActionsV2", getMobileAppActionsV2Router);
app.use("/getNotificationDepartments", getNotificationDepartmentsRouter);
app.use("/getNotificationStandartText", getNotificationStandartTextRouter);
app.use("/getPerformanceTable", getPerformanceTableRouter);
app.use("/getPushLogsFuReferenceNumber", getPushLogsFuReferanceNumberRouter);
app.use("/getPushLogsWithImei2", getPushLogsWithImei2Route);
// app.use("/getRandevuListFuRefNo2", getRandevuListFuReferanceNo2Router);
app.use("/getVisitedDetail", getVisitedDetailRouter);
app.use("/getVisitedListByImeiNo", getVisitedListByImeiNoRouter);
app.use("/getVisitedPerformanceByImeiNo", getVisitedPerformanceByImeiNoRouter);
app.use("/getWorkFollowByImeiNo", getWorkFollowByImeiNoRouter);
app.use("/getWorkFollowCountWithLaw", getWorkFollowCountWithLawRouter);
app.use("/getWorkFollowDetail", getWorkFollowDetailRouter);
app.use("/getWorkFollowDetailV2", getWorkFollowDetailV2Router);
app.use("/getWorkFollowDetailXML", getWorkFollowDetailXMLRouter);
app.use("/getWorkFollowDetailXmlV2", getWorkFollowDetailXmlV2Router);
app.use("/insertAttachmentReferenceNumber", insertAttachmentReferanceNumberRouter);
// app.use("/insertAttachmentReferenceNumberPDFImages", insertAttachmentReferanceNumberPdfImagesRouter);
// app.use("/insertAttachmentReferenceNumberPDFImagesWitoutMoveFlow", insertAttachmentReferenceNumberPDFImagesWitoutMoveFlowRouter);
// app.use("/insertAttachmentReferenceNumberPdfV2", insertAttachmentReferanceNumberPdfV2Router);
// app.use("/insertAttachmentWorkFollowGuid", insertAttachmentWorkFollowGuidRouter);
app.use("/insertFile", insertFileRouter);
// app.use("/insertLawyerAppointment", insertLawyerAppointmentRouter);
app.use("/updateAccounterSend", updateAccounterSendRouter);
app.use("/updateDataUseConsent", updateDataUseContentRouter);
// app.use("/updateRandevuDateReferenceNumber", updateRandevuDateReferanceNumberRouter)
 app.use("/updateStatusOfPushLog", updateStatusOfPushLogRouter);
// app.use("/updateStatusPushLog", updateStatusPushLogRouter);
// app.use("/updateVersionInformation", updateVersionInformationRouter);
app.use("/mobileDeedAppointment", mobileDeedAppointmentRouter);
app.use("/loginByImei", loginByImeiRouter);
app.use("/insertLawyerAppointment", insertLawyerAppointmentRouter);
app.use("/getWorkFollowDetailXmlV2", getWorkFollowDetailXmlV2Router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;