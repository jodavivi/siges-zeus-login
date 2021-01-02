sap.ui.define([
  // "sap/ui/core/mvc/Controller",
  "com/telcomdataperu/Login/controller/BaseController",
  "com/telcomdataperu/Login/servicio/register/Register",
  "com/telcomdataperu/Login/constante/Constantes",
  'sap/m/MessageBox',
  "com/telcomdataperu/Login/util/base/UtilValidation",
  "com/telcomdataperu/Login/model/register/models",
  "com/telcomdataperu/Login/servicio/generica/Generica",
  "com/telcomdataperu/Login/util/base/UtilPopUps",
  "com/telcomdataperu/Login/util/base/UtilUi"
], function(BaseController, Register, Constantes, MessageBox, UtilValidation, modelRegistro, Generica, UtilPopUps, UtilUI) {
  "use strict";

  return BaseController.extend("com.telcomdataperu.Login.controller.login.Login", {
    onInit: function(event) {
      try {
        this.getView().setModel(modelRegistro.modelRegistro(), "modelRegistro");
        this.departamentos  = [];
        this.provincias     = [];
        this.distritos      = [];
        this.listarCamposTabla();
        var oRouter = this.getRouter();
        oRouter.getRoute("appRegister").attachMatched(this._onRouteMatched, this); // appRegister - es el target que esta en el manifect
      } catch (e) {
        console.log(e);
      }
    },
    _onRouteMatched: function(event) {
      try {
        this.fnLimpiarCampos();
      } catch (e) {
        console.log(e);
      }
    },
    onAfterRendering: function() {
      var self = this;
      if(self.getView().byId("idCodigoReferido") !== undefined){
        self.getView().byId("idCodigoReferido").addEventDelegate({
              onfocusout : function() {
                self.consultarReferencia();
              }
        });
      }
      this.fnLimpiarCampos();
    },
    fnLimpiarCampos: function(){
      var self = this;
      var formulario = self.getView().byId("FormToolbar");
      UtilValidation.fnLimpiarCampos("validadorGrupoSelect", "validarGrupoteInput", formulario);
      if(self.getView().byId("idReferido")!== undefined){
        self.getView().byId("idReferido").setText("");
      }
    },
    buscarProvincia:function(){
      var self = this;
      var oIconTabBar = self.getView().byId("FormToolbar");
      //UtilValidation.fnValidarCampos("validadorGrupoSelect", "validarGrupoteInput", oIconTabBar);
      var provinciasFiltro = [];
      var oAfiliado = self.getView().getModel("modelRegistro").getProperty("/afiliado");
      this.provincias.forEach(function(item){
        if(item.padreId === parseInt(oAfiliado.departamentoId, 10)){
          provinciasFiltro.push(item);
        }
      });
      self.getView().getModel("modelRegistro").setProperty("/provincia", provinciasFiltro);
      this.buscarDistrito(true);
    },
    buscarDistrito:function(actualizar){
        var self = this;
        var oIconTabBar = self.getView().byId("FormToolbar");
        //UtilValidation.fnValidarCampos("validadorGrupoSelect", "validarGrupoteInput", oIconTabBar);
        var distritosFiltro = [];
        var oAfiliado = self.getView().getModel("modelRegistro").getProperty("/afiliado");
        if(actualizar === true){
        	oAfiliado.provinciaId = 0;
        }
        this.distritos.forEach(function(item){
          if(item.padreId === parseInt(oAfiliado.provinciaId, 10)){
            distritosFiltro.push(item);
          }
        });
        self.getView().getModel("modelRegistro").setProperty("/distrito", distritosFiltro);
    },
    onPressRegistrar: function() {
      var self = this;
      var oIconTabBar = self.getView().byId("FormToolbar");
      var bValidated = UtilValidation.fnValidarCampos("validadorGrupoSelect", "validarGrupoteInput", oIconTabBar);
      if(!bValidated){
        var mensaje = 'Deben llenarse los campos obligatorios marcados con  asterisco';
				sap.m.MessageToast.show(mensaje, { duration: 5000, width: "25em" 	});
        return;
      }
      UtilUI.messageBox("¿Desea enviar la solicitud de registro?", 'c', function(bConfirmacion) {
        if (bConfirmacion) {
          sap.ui.core.BusyIndicator.show(0);
          var oAfiliado = self.getView().getModel("modelRegistro").getProperty("/afiliado");
          var oParam = {};
          oParam.codigoReferido       = oAfiliado.codigoReferencia;
          oParam.nombre               = oAfiliado.nombre;
          oParam.apellido             = oAfiliado.apellido;
          oParam.numeroIdentificacion = oAfiliado.dni;
          oParam.email                = oAfiliado.email;
          oParam.telefono             = oAfiliado.numeroContacto;
          oParam.paisId               = 101;
          oParam.departamentoId       = oAfiliado.departamentoId;
          oParam.provinciaId          = oAfiliado.provinciaId;
          oParam.distritoId           = oAfiliado.distritoId;
          oParam.direccion            = oAfiliado.direccion;
          oParam.codigoOperacion      = oAfiliado.numeroOperacion;
          oParam.fechaNacimiento      = self.getView().byId("txtFechaNacimiento").getDateValue();
          Register.registrarAfiliado(oParam, function (result) {
            sap.ui.core.BusyIndicator.hide();
            if (result.iCode === 1) {
              self.fnLimpiarCampos();
              var navCon = self.byId("navConRegistro");
              navCon.to(self.byId("pageMensaje"), "slide");
            }else{
              var mensaje = "Ocurrio un Error con el Registro";
              UtilPopUps.validarRespuestaServicio(result, mensaje);
            }

          }, self);
        }
      });
    },
		listarCamposTabla: function () {
			var that = this;

				try {
	        var oParam = {};
	        Generica.listarCamposTabla(oParam, function (result) {
            if (result.iCode === 1) {
              var departamento = [];
              var provincia    = [];
              var distrito     = [];
              result.oResults.campoGenerica.forEach(function(item){
                if(item.codigoTabla === 'departamento'){
                  departamento.push(item);
                }
                if(item.codigoTabla === 'provincia'){
                  provincia.push(item);
                }
                if(item.codigoTabla === 'distrito'){
                  distrito.push(item);
                }
              });
 								that.getView().getModel("modelRegistro").setProperty("/departamento", departamento);
                that.departamentos  = departamento;
                that.provincias     = provincia;
                that.distritos      = distrito;
 	          } else {
 								that.getView().getModel("camposTabla").setProperty("/departamento", []);
                that.getView().getModel("modelRegistro").setProperty("/provincia", []);
                that.getView().getModel("modelRegistro").setProperty("/distrito", []);
 	          }
	        }, that);
	      } catch (e) {
	        console.log(e);
	      }
    },
    consultarReferencia:function(){
      try {
        var self = this;
        if(self.getView().byId("idCodigoReferido").getValue().length < 5){
          return;
        }
        sap.ui.core.BusyIndicator.show(0);
        var oAfiliado = self.getView().getModel("modelRegistro").getProperty("/afiliado");
        var oParam      = {};
        oParam.codigo   = oAfiliado.codigoReferencia;
        Register.consultarReferencia(oParam, function (result) {
          sap.ui.core.BusyIndicator.hide();
          if (result.iCode === 1) {
            self.getView().byId("idReferido").setText(result.oResults.nombre + ", " + result.oResults.apellido);
          }else{
            self.getView().byId("idReferido").setText("");
          }
        }, self);

      } catch (e) {
        console.log(e);
      }
    },
    onNavBackRegitro:function(){
      this.getView().byId("navConRegistro").back(); 
    },
    onNavBackLogin:function(){
       this.getRouter().navTo("appLogin");
    }
  });
});
