sap.ui.define([], function() {
	"use strict";
	return {
		IdApp: 'Login',
		urlWebPrincipal:'http://localhost/siges-zeus-portal',
		services: {
			login: "http://localhost:6010/ms-com-usuariologin/autenticacion"
		}
	};
});
