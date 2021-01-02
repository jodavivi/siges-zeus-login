sap.ui.define([
  // "sap/ui/core/mvc/Controller",
  "com/telcomdataperu/Login/controller/BaseController",
  "com/telcomdataperu/Login/servicio/login/Autenticacion",
  "com/telcomdataperu/Login/constante/Constantes",
  "sap/ui/core/UIComponent",
  "com/telcomdataperu/Login/servicio/recuperar/Recuperar"
], function(BaseController, Autenticacion, Constante, UIComponent, Recuperar) {
  "use strict";

  return BaseController.extend("com.telcomdataperu.Login.controller.recuperar.Recuperar", {
    onInit: function(event) {
      try{
        var oRouter = this.getRouter();
        oRouter.getRoute("appRecuperar").attachMatched(this._onRouteMatched, this);
      }catch(e){
        console.log(e);
      }
    },
    _onRouteMatched:function(){
      this.getView().byId("txtEmail").setValue("");
    },
    onAfterRendering: function() {
      try{
         this.getView().byId("txtEmail").setValue("");
      }catch(e){
        console.log(e);
      }
    },
    onPressRecuperar : function(oEvent){
      var self = this;
      self.getView().byId("txtEmail").setValueState("None");
      var oParam = {};
      oParam.usuario = self.getView().byId("txtEmail").getValue();

      if(self.getView().byId("txtEmail").getValue() === null || self.getView().byId("txtEmail").getValue().length === 0){
        self.getView().byId("txtEmail").setValueState("Error");
        return
      }
      sap.ui.core.BusyIndicator.show(0);
      Recuperar.recuperarClave(oParam, function(result){
          if (result.iCode === 1) {
            var navCon = self.byId("navRecuperar");
            navCon.to(self.byId("pageMensaje"), "slide");
          }
          sap.ui.core.BusyIndicator.hide();
      }, self);
    },
    onNavBackLogin:function(){
      this.getView().byId("navRecuperar").back();
      this.getRouter().navTo("appLogin");
    }
  });
});
