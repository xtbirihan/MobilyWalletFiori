sap.ui.define([
	"Zrt006/wallet/create/ZRT_006_WALLET_CREATE/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("Zrt006.wallet.create.ZRT_006_WALLET_CREATE.controller.Home", {

		onInit: function () {
			// create a message manager and register the message model
			 //this._oMessageManager = sap.ui.getCore().getMessageManager();
			 //this._oMessageManager.registerObject(this.getView(), true);
			 //this.setModel(this._oMessageManager.getMessageModel(), "message");

			this.getRouter().getRoute("home").attachPatternMatched(this._onObjectMatched, this);
			var sign = this.getView().byId("idSign");
			sign.setVisible(false);
		},
		_onObjectMatched: function (oEvent) {

			// var oModel = this.getOwnerComponent().getModel();
			// this.clearPendingChanges(oModel);
			// var oContext = oModel.createEntry("/WalletdataSet");
			// //	var sPath = "/WalletdataSet('DUMMY')";
			// var sPath = oContext.getPath();
			// this.getView().bindElement({
			// 	path: sPath,
			// 	events: {
			// 		// 	change: this._onBindingChange.bind(this),
			// 		dataRequested: function () {
			// 			// 		oViewModel.setProperty("/busy", true);
			// 		},
			// 		dataReceived: function (oEvent) {
			// 			// 	// oViewModel.setProperty("/busy", false);

			// 		},
			// 		change: function (oEvent) {
			// 			var oSource = oEvent.getSource();

			// 		}
			// 	},
			// 	parameters: {
			// 		// expand: "NItems"
			// 	}
			// });

			var oModel = this.getOwnerComponent().getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		_onMetadataLoaded: function () {
			// create default properties
			var oProperties = {
				TransactionNo: " ",
				TransactionType: "01",
				DealerId: "",
				Amount: "0.00",
				Waerk: "SAR",
				TransactionDate: new Date(),
				SlipNumber: " ",
				Sign: "+"
			};
			// create new entry in the model
			this._oContext = this.getModel().createEntry("/WalletdataSet", {
				properties: oProperties
			});
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},

		onCreate: function () {
			var messageHandler = this.getOwnerComponent().MessageHandler;
			messageHandler.removeServiceMessages();
			var oModel = this.getOwnerComponent().getModel();

			oModel.submitChanges({
				success: function (oData, oResponse) {
					messageHandler.showServiceMessagePromise().then(function () {});
				},
				error: function (oError) {
					messageHandler.showServiceMessagePromise().then(function () {});
				}
			});
			// messageHandler.showServiceMessagePromise().then(function () {

			// });
				oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},

		clearPendingChanges: function (oModel) {
			var oPendingChanges = oModel.getPendingChanges();
			var aPaths = [];
			for (var key in oPendingChanges) {
				aPaths.push("/" + key);
			}
			oModel.resetChanges(aPaths, true);
		},
		onTransactionNoChange: function (oEvent) {
			if (oEvent.getParameter("newValue") === "02") {
				this.getView().byId("idSign").setVisible(true);
				this.getView().byId("idSlipNumber").setVisible(false);
			} else {
				this.getView().byId("idSign").setVisible(false);
				this.getView().byId("idSlipNumber").setVisible(true);
			}

		}

	});

});