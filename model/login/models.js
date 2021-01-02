sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device"
], function(JSONModel, Device) {
  "use strict";

  return {
    createDeviceModel: function() {
      var oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode("OneWay");
      return oModel;
    },
    usuarioModel: function() {
      var oUsuarioLogin      = {};
      oUsuarioLogin.usuario  = "";
      oUsuarioLogin.clave    = "";
      var oModel = new JSONModel(oUsuarioLogin);
      return oModel;
    }

  };
});
