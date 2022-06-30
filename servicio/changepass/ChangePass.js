sap.ui.define([
	"com/telcomdataperu/Login/util/base/UtilResponse",
	"com/telcomdataperu/Login/util/base/UtilHttp",
	"com/telcomdataperu/Login/constante/Constantes"
], function(UtilResponse, UtilHttp, Constantes) {
	"use strict";
	return {
		validarToken: function(oParam, callback, context) {
      UtilHttp.httpPost(Constantes.services.validarToken, oParam, Constantes.IdApp, function(result) {
        var oAuditResponse = result.oAuditResponse;
        if (oAuditResponse.iCode === 1) {
          callback(UtilResponse.success(oAuditResponse.sIdTransaction, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode > 1) {
          callback(UtilResponse.warn(oAuditResponse.sIdTransaction, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode < 0 && oAuditResponse.iCode !== -1000) {
          callback(UtilResponse.error(oAuditResponse.sIdTransaction, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode === -1000) {
          callback(UtilResponse.exception(oAuditResponse.sMessage));
        }
      }, context);
    },
    cambiarClave: function(oParam, callback, context) {
      UtilHttp.httpPut(Constantes.services.cambiarClave, oParam, Constantes.IdApp, function(result) {
        var oAuditResponse = result.oAuditResponse;
        if (oAuditResponse.iCode === 1) {
          callback(UtilResponse.success(oAuditResponse.sIdTransaction, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode > 1) {
          callback(UtilResponse.warn(oAuditResponse.sIdTransaction, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode < 0 && oAuditResponse.iCode !== -1000) {
          callback(UtilResponse.error(oAuditResponse.sIdTransaction, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode === -1000) {
          callback(UtilResponse.exception(oAuditResponse.sMessage));
        }
      }, context);
    }
	};
});
