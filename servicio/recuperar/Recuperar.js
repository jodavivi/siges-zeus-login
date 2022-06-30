sap.ui.define([
	"com/telcomdataperu/Login/util/base/UtilResponse",
	"com/telcomdataperu/Login/util/base/UtilHttp",
	"com/telcomdataperu/Login/constante/Constantes"
], function(UtilResponse, UtilHttp, Constantes) {
	"use strict";
	return {
		recuperarClave: function(oParam, callback, context) {
      UtilHttp.httpPost(Constantes.services.recuperarClave, oParam, Constantes.IdApp, function(result) {
        var oAuditResponse = result.oAuditResponse;
        if (oAuditResponse.iCode === 1) {
          callback(UtilResponse.success(oAuditResponse.sIdTransaccion, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode > 1) {
          callback(UtilResponse.warn(oAuditResponse.sIdTransaccion, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode < 0 && oAuditResponse.iCode !== -1000) {
          callback(UtilResponse.error(oAuditResponse.sIdTransaccion, oAuditResponse.sMessage, result.oData));
        } else if (oAuditResponse.iCode === -1000) {
          callback(UtilResponse.exception(oAuditResponse.sMessage));
        }
      }, context);
    }
	};
});
