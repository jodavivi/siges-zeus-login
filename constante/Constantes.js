sap.ui.define([], function() {
	"use strict";
	return {
		IdApp: 'Login',
		urlWebPrincipal:'http://localhost/siges-zeus-portal',
		urlLogin:'http://localhost/siges-zeus-login/',
		services: {
			login: "http://localhost:4002/ms-com-usuariologin/autenticacion",
			recuperarClave: "http://localhost:4002/ms-com-usuariologin/recuperar",
			validarToken: "http://localhost:4002/ms-com-usuariologin/recuperar/validartoken",
			cambiarClave: "http://localhost:4002/ms-com-usuariologin/recuperar/actualizarclave"
		}
	};
});
