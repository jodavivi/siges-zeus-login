sap.ui.define([
  // "sap/ui/core/mvc/Controller",
  "com/telcomdataperu/Login/controller/BaseController",
  "com/telcomdataperu/Login/servicio/login/Autenticacion",
  "com/telcomdataperu/Login/constante/Constantes",
  "sap/ui/core/UIComponent"
], function(BaseController, Autenticacion, Constante, UIComponent) {
  "use strict";

  return BaseController.extend("com.telcomdataperu.Login.controller.login.Login", {
    onInit: function(event) {
      try{
        if(localStorage.login !== undefined){
          window.location.href = Constante.urlWebPrincipal;
        }
      }catch(e){
        console.log(e);
      }
    },
    onAfterRendering: function() {
      try{
        $(".sapMApp.sapMNav.sapUiGlobalBackgroundColor ").addClass("bg-opacity");
        $(".sapMApp.sapMNav.sapUiGlobalBackgroundColor ").removeClass("bg-transparent");

        	sap.ui.core.BusyIndicator.hide();
      }catch(e){
        console.log(e);
      }
    },
    onLogin: function(event) {
      try{
        var that        = this;
        var txtUser = that.getView().byId("email");
        var txtPass = that.getView().byId("pass");
        txtUser.setValueState("None");
        txtPass.setValueState("None");
        txtUser.removeStyleClass("ErrorInputLogin");
        txtPass.removeStyleClass("ErrorInputLogin");
        if(txtUser.getValue()===""){
          txtUser.setValueState("Error");
          txtUser.addStyleClass("ErrorInputLogin");
        }
        if(txtPass.getValue()===""){
          txtPass.setValueState("Error");
          txtPass.addStyleClass("ErrorInputLogin");
        }
        if(txtUser.getValue()==="" || txtPass.getValue()===""){
          return;
        }

        sap.ui.core.BusyIndicator.show(0);
        var oUsuario    = that.getView().getModel("usuarioModel").getData();
        var oParam      = {};
        oParam.sUsuario  = oUsuario.usuario;
        oParam.sClave    = oUsuario.clave;
        Autenticacion.login(oParam, function(result) {
          sap.ui.core.BusyIndicator.hide();
          if (result.iCode === 1) {
              localStorage.setItem("login", JSON.stringify(result.oResults));
            $(".message-error").css("opacity", "0");
              window.location.href = Constante.urlWebPrincipal;
          } else {
              $(".message-error").css("opacity", "1");
          }

        }, that);
      }catch(e){
        console.log(e);
      }
    },
    onNavegarRegister : function(oEvent){
      var self = this;
      self.getRouter().navTo("appRegister");
      //window.location.reload();
    },
    onNavegarRecuperar : function(oEvent){
      var self = this;
      self.getRouter().navTo("appRecuperar");
      //window.location.reload();
    }
  });
});
