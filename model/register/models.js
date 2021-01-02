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
    modelRegistro: function() {
      var oRegistro                       = {};
      oRegistro.pais                      = 1;
      oRegistro.departamento              = [];
      oRegistro.provincia                 = [];
      oRegistro.distrito                  = [];
      oRegistro.afiliado                  = {};
      oRegistro.afiliado.codigoReferencia = "";
      oRegistro.afiliado.dni              = "";
      oRegistro.afiliado.nombre           = "";
      oRegistro.afiliado.apellido         = "";
      oRegistro.afiliado.departamentoId   = "";
      oRegistro.afiliado.provinciaId      = "";
      oRegistro.afiliado.distritoId       = "";
      oRegistro.afiliado.direccion        = ""; 
      oRegistro.afiliado.dni              = "";
      oRegistro.afiliado.email            = "";
      oRegistro.afiliado.numeroContacto   = "";
      oRegistro.afiliado.numeroOperacion  = "";
      var oModel = new JSONModel(oRegistro);
      return oModel;
    }

  };
});
