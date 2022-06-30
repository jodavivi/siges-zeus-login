sap.ui.define([
  // "sap/ui/core/mvc/Controller",
  "com/telcomdataperu/Login/controller/BaseController",
  "com/telcomdataperu/Login/servicio/login/Autenticacion",
  "com/telcomdataperu/Login/constante/Constantes",
  "sap/ui/core/UIComponent",
  "com/telcomdataperu/Login/servicio/changepass/ChangePass",
	'../../util/base/UtilPopUps'
], function(BaseController, Autenticacion, Constante, UIComponent, ChangePass, UtilPopUps) {
  "use strict";

  return BaseController.extend("com.telcomdataperu.Login.controller.changepass.ChangePass", {
    onInit: function(event) {
      try{
        var oRouter = this.getRouter();
        oRouter.getRoute("appChangePass").attachMatched(this._onRouteMatched, this);
      }catch(e){
        console.log(e);
      }
    },
    _onRouteMatched:function(oEvent){
      this.getView().byId("txtClave1").setValue("");
      this.getView().byId("txtClave2").setValue("");
      var oParameter = oEvent.getParameter("arguments")["?query"]; 
      this.sToken = oParameter.sToken;
      this.onValidarTokenCuenta(oParameter.sToken);  
    },
    onAfterRendering: function() {
      try{
        this.getView().byId("txtClave1").setValue("");
        this.getView().byId("txtClave2").setValue("");
      }catch(e){
        console.log(e);
      }
    },
    onValidarTokenCuenta : function(sToken){
      var self = this; 
      var oParam = {};
      oParam.sTokenCambioClave = sToken;
      sap.ui.core.BusyIndicator.show(0);
      ChangePass.validarToken(oParam, function(result){ 
          if (result.iCode !== 1) { 
            //window.location.replace(Constante.urlLogin); 
            self.getRouter().navTo("appLogin");
          } 
          //self.getRouter().navTo("appLogin");
          sap.ui.core.BusyIndicator.hide();
      }, self);
    },
    onPressChangePass : function(oEvent){
      var self = this; 
      self.getView().byId("txtClave1").setValueState("None");
      self.getView().byId("txtClave2").setValueState("None");
      var oParam = {};
      oParam.sClave1 = self.getView().byId("txtClave1").getValue();
      oParam.sClave2 = self.getView().byId("txtClave2").getValue();

      if(self.getView().byId("txtClave1").getValue() === null 
          || self.getView().byId("txtClave1").getValue().length === 0){
        self.getView().byId("txtClave1").setValueState("Error");
       
					sap.m.MessageToast.show("(*) Ingresar los campos obligatorios"); 
			 
        return
      }

      if(oParam.sClave1 !== oParam.sClave2){
        self.getView().byId("txtClave2").setValueState("Error");
        sap.m.MessageToast.show("No coinciden las claves ingresadas"); 
        return
      }
      
     
      var oCambiarClave = {};
      oCambiarClave.sTokenCambioClave = this.sToken;
      oCambiarClave.sClave            = self.getView().byId("txtClave1").getValue();
      UtilPopUps.messageBox("¿Desea Actualizar la clave?", 'c', function(bConfirmacion) {
        if (bConfirmacion) {
          sap.ui.core.BusyIndicator.show(0);
          ChangePass.cambiarClave(oCambiarClave, function(result){
          self.getView().byId("txtClave1").setValue("");
          self.getView().byId("txtClave2").setValue("");
          
            if (result.iCode === 1) {
            // var navCon = self.byId("navRecuperar");
            // navCon.to(self.byId("pageMensaje"), "slide");
            var navCon = self.byId("navChangePass");
              navCon.to(self.byId("pageMensajeChangePass"), "slide");
            }else{
              UtilPopUps.validarRespuestaServicio(result,'Clave Actualizada correctamente',function(e){});
            }
            console.log(result);
            sap.ui.core.BusyIndicator.hide();
          }, self);
        }
      });
      
      
    },
    onNavBackLogin:function(){
      this.getView().byId("navChangePass").back();
      this.getRouter().navTo("appLogin");
    }
  });
});
