sap.ui.define([
	"com/telcomdataperu/Login/util/base/UtilResponse",
	"com/telcomdataperu/Login/util/base/UtilHttp",
	"com/telcomdataperu/Login/constante/Constantes"
], function(UtilResponse, UtilHttp, Constantes) {
	"use strict";
	return {
		recuperarClave: function(oParam, callback, context) {
      UtilHttp.httpPost(Constantes.services.recuperarClave, oParam, Constantes.IdApp, function(result) {
        var oAuditResponse = result;
        if (oAuditResponse.codigoRespuesta === 1) {
          callback(UtilResponse.success(oAuditResponse.transaccionId, oAuditResponse.mensajeRespuesta, result.objectResponse));
        } else if (oAuditResponse.codigoRespuesta > 1) {
          callback(UtilResponse.warn(oAuditResponse.transaccionId, oAuditResponse.mensajeRespuesta, result.objectResponse));
        } else if (oAuditResponse.codigoRespuesta < 0 && oAuditResponse.codigoRespuesta !== -1000) {
          callback(UtilResponse.error(oAuditResponse.transaccionId, oAuditResponse.mensajeRespuesta, result.objectResponse));
        } else if (oAuditResponse.codigoRespuesta === -1000) {
          callback(UtilResponse.exception(oAuditResponse.mensajeRespuesta));
        }
      }, context);
    }
	};
});
