sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast"
], function (Controller, History, UIComponent, MessageToast) {
	"use strict";

	return Controller.extend("Zrt006.wallet.create.ZRT_006_WALLET_CREATE.controller.BaseController", {
		getRouter: function () {
			//return UIComponent.getRouterFor(this);
		    return this.getOwnerComponent().getRouter();
		},
		getModel : function (sName) {
			return this.getView().getModel(sName);
		},	
		onNavBack: function () {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/ );
			}
		},
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		}		
	});

});