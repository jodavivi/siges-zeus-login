sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/telcomdataperu/Login/model/login/models",
  "com/telcomdataperu/Login/constante/Constantes"
], function (UIComponent, Device, models, Constantes) {
	"use strict";

	return UIComponent.extend("com.telcomdataperu.Login.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			if(localStorage.login !== undefined){
				window.location.href = Constantes.urlWebPrincipal;
			}
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.usuarioModel(), "usuarioModel");
		}
	});
});
