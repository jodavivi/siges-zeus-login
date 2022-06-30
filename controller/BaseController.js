sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
  ], function(Controller, History, UIComponent) {
    "use strict";
  
    return Controller.extend("com.telcomdataperu.Login.controller.BaseController", {
  
      onAfterRendering: function() {
        console.log("");
      },
      getRouter: function() {
        try {
          return UIComponent.getRouterFor(this);
        } catch (e) {
          console.error("Error: " + e);
        }
      },
  
      onNavBack: function() {
        try {
          var oHistory, sPreviousHash;
          oHistory = History.getInstance();
          sPreviousHash = oHistory.getPreviousHash();
          if (sPreviousHash !== undefined) {
            window.history.go(-1);
          } else {
            this.getRouter().navTo("appLogin", {}, true /*no history*/ );
          }
        } catch (e) {
          console.error("Error: " + e);
        }
      }
      
  
    });
  
  });
  