sap.ui.define([
], function() {
	"use strict";
	return {
		decompilerJwt: function(token) {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));
		
			return JSON.parse(JSON.parse(jsonPayload).data);
		},
	 	generarIdTransaccion: function() {
			var fecha = new Date();
			var fechaIso = fecha.toISOString();
			var fechaString = fechaIso.toString().replace(/:/g, "").replace(/-/g, "").replace(".", "").replace("Z", "").replace("T", "");
			var randon = Math.floor((Math.random() * 1000000) + 1);
			var idTransaccion = fechaString + "" + randon;
			return idTransaccion;
		},
			generarHeaders: function(context, appId, stoken) {
				var request = {};
				request.sIdTransaccion = this.generarIdTransaccion();
				request.sAplicacion = appId;
				request.sUsuario	= "LOGIN";
				if(stoken!== undefined && stoken !== "" && stoken.length > 0){
					var oUsuario = this.decompilerJwt(stoken);
					request.sUsuario	= oUsuario.sUsuario;
				}
				request.tokens = (localStorage.login === undefined || localStorage.login === "") ? "x" : JSON.parse(localStorage.login).token;
				request.sTerminal = "127.0.0.1";
 
	
			return request;
		},
		httpPost: function(path, data,appId, callback, context) {
			var oHeader = this.generarHeaders(context, appId);
			$.ajax({
				url: path,
				method: "POST",
				headers: oHeader,
				data: JSON.stringify(data),
				contentType: "application/json",
				success: function(result) {
					return callback(result);
				},
				error: function(error) {
					return callback({
						oAuditResponse: {
							sIdTransaccion: oHeader.sIdTransaccion,
							iCode: -1000,
							sMensaje: 'Error al consultar el servicio (' + error.status + '), vuelva a intentarlo o comuníquese con el área de soporte.'
						}
					});
				}
			});
		},
		httpPut: function (path, data, appId, callback, context) {
			var that = this;
			var oHeader = this.generarHeaders(context, appId, data.sTokenCambioClave);
			$.ajax({
				url: path,
				method: "PUT",
				headers: oHeader,
				dataType: "json",
				data: JSON.stringify(data),
				contentType: "application/json",
				success: function (result, status, xhr) {
				//	that.actualizarToken(xhr.getResponseHeader("tokens"));
					return callback(result);
				},
				error: function (error) {
					if (error.status === 401) {
						localStorage.clear();
						window.location.reload();
					}
					return callback({
						oAuditResponse: {
							sIdTransaccion: oHeader.sIdTransaccion,
							iCode: -1000,
							sMessage: 'Error al consultar el servicio (' + error.status + '), vuelva a intentarlo o comuníquese con el área de soporte.'
						}
					});
				},
				complete: function () {
					//sap.ui.core.BusyIndicator.hide();
				}
			});
		},
		httpGet: function (path, appId, callback, context) {
			var that = this;
			var oHeader = this.generarHeaders(context, appId);
			$.ajax({
				url: path,
				method: "GET",
				headers: oHeader,
				contentType: "application/json",
				beforeSend: function () {
					//sap.ui.core.BusyIndicator.show(0);
				},
				success: function (result, status, xhr) {
				//that.actualizarToken(xhr.getResponseHeader("tokens"));
					return callback(result);
				},
				error: function (error) {
					if (error.status === 401) {
						localStorage.clear();
						window.location.reload();
					}
					return callback({
						auditResponse: {
							transaccionId: oHeader.sIdTransaccion,
							codigoRespuesta: -1000,
							mensajeRespuesta: 'Error al consultar el servicio (' + error.status + '), vuelva a intentarlo o comuníquese con el área de soporte.'
						}
					});
				},
				complete: function () {
					//sap.ui.core.BusyIndicator.hide();
				}
			});

		}
	};
});
