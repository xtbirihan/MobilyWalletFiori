sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/MessageBox",
	"sap/m/Dialog",
	"sap/m/Label",
	"sap/m/Text",
	"sap/m/TextArea",
	"sap/m/ButtonType",
	"sap/m/Button"
], function (UI5Object, MessageBox, Dialog, Label, Text, TextArea, ButtonType, Button) {
	"use strict";

	return UI5Object.extend("Zrt006.wallet.create.ZRT_006_WALLET_CREATE.helper.MessageHandler", {

		/**
		 * Handles application errors by automatically attaching to the model events and displaying errors when needed.
		 * @class
		 * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
		 * @public
		 * @alias vestel.ma.VadeTalepOnayEkrani.controller.ErrorHandler
		 */
		constructor: function (oComponent) {
		//	var that = this;
		//	var oMessageManager = sap.ui.getCore().getMessageManager();
			this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
			this._oComponent = oComponent;
			// this._oAuthModel = oComponent.getModel("auth");
			// this._oNewsModel = oComponent.getModel("news");
			// this._oAnnonModel = oComponent.getModel("announcement");
			this._bMessageOpen = false;
			this._popToConfirmOpen = false;
			this._rejectDialogOpen = false;
			this._noteDialogOpen = false;
			this._cartDialogOpen = false;
			// this._sErrorText = this._oResourceBundle.getText("errorText");

			// this._oModel.attachMetadataFailed(function (oEvent) {
			// this._showServiceMessages();
			// }, this);

			// this._oAuthModel.attachRequestFailed(function (oEvent) {
			// 		var statusCode = oEvent.getParameter("response").statusCode;
			// 		if (statusCode != "500") {
			// 			return;
			// 		}
			// 		that.removeServiceMessages();
			// 		oMessageManager.addMessages(
			// 			new sap.ui.core.message.Message({
			// 				// custom message text
			// 				message: "Bağlantı hatası lütfen sayfayı yenileyin.",
			// 				// type of the message - warning, error
			// 				type: sap.ui.core.MessageType.Error
			// 			})
			// 		);
			// 		that._showServiceMessages();
			// 	},
				// this);

			// this._oAnnonModel.attachRequestFailed(function (oEvent) {
			// 		var statusCode = oEvent.getParameter("response").statusCode;
			// 		if (statusCode != "500") {
			// 			return;
			// 		}
			// 		that.removeServiceMessages();
			// 		oMessageManager.addMessages(
			// 			new sap.ui.core.message.Message({
			// 				// custom message text
			// 				message: "Bağlantı hatası lütfen sayfayı yenileyin.",
			// 				// type of the message - warning, error
			// 				type: sap.ui.core.MessageType.Error
			// 			})
			// 		);
			// 		that._showServiceMessages();
			// 	},
			// 	this);

			// this._oNewsModel.attachRequestFailed(function (oEvent) {
			// 		var statusCode = oEvent.getParameter("response").statusCode;
			// 		if (statusCode != "500") {
			// 			return;
			// 		}
			// 		that.removeSeorviceMessages();
			// 		oMessageManager.addMessages(
			// 			new sap.ui.core.message.Message({
			// 				// custom message text
			// 				message: "Bağlantı hatası lütfen sayfayı yenileyin.",
			// 				// type of the message - warning, error
			// 				type: sap.ui.core.MessageType.Error
			// 			})
			// 		);
			// 		that._showServiceMessages();
			// 	},
			// 	this);
		},

		/**
		 * Shows a {@link sap.m.MessageBox} when a service call has failed.
		 * Only the first error message will be display.
		 * @param {string} sDetails a technical error to be displayed on request
		 * @private
		 */
		_showServiceMessages: function () {
			var that = this;
			if (this._bMessageOpen) {
				return;
			}
			this._bMessageOpen = true;
			// MessageBox.error(
			// this._sErrorText,
			// {
			// id : "serviceErrorMessageBox",
			// details : sDetails,
			// styleClass : this._oComponent.getContentDensityClass(),
			// actions : [MessageBox.Action.CLOSE],
			// onClose : function () {
			// this._bMessageOpen = false;
			// }.bind(this)
			// }
			// );

			var oMessageTemplate = new sap.m.MessageItem({
				type: "{message>type}",
				title: "{message>message}",
				description: "{message>description}",
				subtitle: "{message>additionalText}"
			});

			var oBackButton = new sap.m.Button({
				icon: sap.ui.core.IconPool.getIconURI("nav-back"),
				visible: false,
				press: function () {
					that.oMessageView.navigateBack();
					this.setVisible(false);
				}
			});

			this.oMessageView = new sap.m.MessageView({
				showDetailsPageHeader: true,
				itemSelect: function () {
					oBackButton.setVisible(true);
				},
				items: {
					path: "message>/",
					template: oMessageTemplate
				}
			});

			this.oDialog = new sap.m.Dialog({
				resizable: true,
				content: this.oMessageView,
				afterClose: function () {
					that._bMessageOpen = false;
					sap.ui.getCore().getMessageManager().removeAllMessages();
				},
				beginButton: new sap.m.Button({
					press: function () {
						this.getParent().close();
					},
					text: "Kapat"
				}),
				customHeader: new sap.m.Bar({
					contentMiddle: [
						new sap.m.Text({
							text: "{i18n>messageDialogTitle}"
						})
					],
					contentLeft: []
				}),
				contentHeight: "300px",
				contentWidth: "500px",
				verticalScrolling: false
			});
			// set message model
			this.oDialog.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "message");
			this.oMessageView.navigateBack();
			this.oDialog.open();
		},
		_showServiceMessagesPromise: function () {
			var that = this;
			return new Promise(function (resolve, reject) {

				// if (that._bMessageOpen) {
				// return;
				// }
				that._bMessageOpen = true;
				// MessageBox.error(
				// this._sErrorText,
				// {
				// id : "serviceErrorMessageBox",
				// details : sDetails,
				// styleClass : this._oComponent.getContentDensityClass(),
				// actions : [MessageBox.Action.CLOSE],
				// onClose : function () {
				// this._bMessageOpen = false;
				// }.bind(this)
				// }
				// );

				var oMessageTemplate = new sap.m.MessageItem({
					type: "{message>type}",
					title: "{message>message}",
					description: "{message>description}",
					subtitle: "{message>additionalText}"
				});

				var oBackButton = new sap.m.Button({
					icon: sap.ui.core.IconPool.getIconURI("nav-back"),
					visible: false,
					press: function () {
						that.oMessageView.navigateBack();
						this.setVisible(false);
					}
				});

				that.oMessageView = new sap.m.MessageView({
					showDetailsPageHeader: true,
					// class: "overFlowAuto",
					itemSelect: function () {
						oBackButton.setVisible(true);
					},
					items: {
						path: "message>/",
						template: oMessageTemplate
					}
				});

				that.oDialog = new sap.m.Dialog({
					resizable: true,
					content: that.oMessageView,
					afterClose: function () {
						that._bMessageOpen = false;
						sap.ui.getCore().getMessageManager().removeAllMessages();
					},
					beginButton: new sap.m.Button({
						press: function () {
							this.getParent().close();
							resolve();
						},
						text: "Kapat"
					}),
					customHeader: new sap.m.Bar({
						contentMiddle: [
							new sap.m.Text({
								text: "{i18n>messageDialogTitle}"
							})
						],
						contentLeft: []
					}),
					contentHeight: "300px",
					contentWidth: "500px",
					verticalScrolling: false
				});
				// set message model
				that.oDialog.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "message");
				that.oMessageView.navigateBack();
				that.oDialog.open();

			});
		},

		showServiceMessages: function () {
			this._showServiceMessages();
		},
		showServiceMessagePromise: function () {
			return this._showServiceMessagesPromise();
		},
		removeServiceMessages: function () {
			sap.ui.getCore().getMessageManager().removeAllMessages();
		},
		showPopupToConfirm: function (message, title, icon) {
			var that = this;
			if (this._popToConfirmOpen) {
				return;
			}
			this._popToConfirmOpen = true;
			return new Promise(function (resolve, reject) {
				MessageBox.show(
					message, {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						title: title,
						icon: icon,
						onClose: function (sAction) {
							that._popToConfirmOpen = false;
							if (sAction === "OK") {
								resolve();
							} else {
								reject();
							}
						}
					}
				);
			});
		},
		onRejectDialog: function (message, title, icon) {
			var that = this;
			if (that._rejectDialogOpen) {
				return;
			}
			that._rejectDialogOpen = true;

			return new Promise(function (resolve, reject) {
				var oDialog = new Dialog({
					title: title,
					type: "Message",
					state: "Error",
					content: [
						new Text({
							text: message,
							labelFor: "rejectDialogTextarea"
						}),
						new TextArea("rejectDialogTextarea", {
							width: "100%",
							maxLength: 70,
							showExceededText: false,
							placeholder: "Ret nedeni giriniz."
						})
					],
					beginButton: new Button({
						type: ButtonType.Transparent,
						text: "Reddet",
						press: function () {
							var sText = sap.ui.getCore().byId("rejectDialogTextarea").getValue();
							resolve(sText);
							oDialog.close();

						}
					}),
					endButton: new Button({
						text: "İptal",
						press: function () {
							reject();
							oDialog.close();
						}
					}),
					afterClose: function () {
						that._rejectDialogOpen = false;
						oDialog.destroy();
					}
				});
				oDialog.open();
			});

		},
		showCarNoteDialog: function (message, title, icon) {
			var that = this;
			if (that._cartDialogOpen) {
				return;
			}
			that._cartDialogOpen = true;

			return new Promise(function (resolve, reject) {
				var oDialog = new Dialog({
					title: title,
					type: "Message",
					state: "Information",
					content: [
						new Text({
							text: message,
							labelFor: "rejectDialogTextarea1"
						}),
						new TextArea("rejectDialogTextarea1", {
							width: "100%",
							maxLength: 70,
							showExceededText: false,
							placeholder: "Siparişinizle ilgili iş ortağına iletmek istediğiniz bir not varsa bu alana yazabilirsiniz.."
						}),
						new TextArea("rejectDialogTextarea2", {
							width: "100%",
							maxLength: 70,
							showExceededText: false,
							placeholder: "Siparişinizle ilgili TüvTürk satınalma birimine iletilecek notunuz varsa bu alana yazabilirsiniz"
						})
					],
					beginButton: new Button({
						type: ButtonType.Transparent,
						text: "Evet",
						press: function () {
							var sText = sap.ui.getCore().byId("rejectDialogTextarea1").getValue();
							var sTextBa = sap.ui.getCore().byId("rejectDialogTextarea2").getValue();
							var data = {
								text: sText,
								baText: sTextBa
							};
							resolve(data);
							oDialog.close();

						}
					}),
					endButton: new Button({
						text: "Hayır",
						press: function () {
							reject();
							oDialog.close();
						}
					}),
					afterClose: function () {
						that._cartDialogOpen = false;
						oDialog.destroy();
					}
				});
				oDialog.open();
			});

		},
		showNoteDialog: function (message, title, icon) {
			var that = this;
			if (that._noteDialogOpen) {
				return;
			}
			that._noteDialogOpen = true;

			return new Promise(function (resolve, reject) {
				var oDialog = that.getDialog(message, title, icon, resolve, reject);
				oDialog.open();
			});

		},
		getDialog: function (message, title, icon, resolve, reject, oController) {
				var that = this;
				if (this._noteDialog) {
					return this._noteDialog;
				}
				var uploadForm = sap.ui.xmlfragment(
					"tuvturk.portal.version2.TuvturPortal2.view.fragment.calibration.EquipDelDocUpd", oController);
				var oDialog = new Dialog({
					title: title,
					type: "Message",
					state: "Information",
					content: [uploadForm,
						new Text({
							text: message,
							labelFor: "noteDialogTextarea"
						}),
						new TextArea("noteDialogTextarea", {
							width: "100%",
							maxLength: 70,
							showExceededText: false,
							placeholder: "Silme nedeni giriniz."
						})
					],
					beginButton: new Button({
						type: ButtonType.Transparent,
						text: "Sil",
						press: function () {
							var sText = sap.ui.getCore().byId("noteDialogTextarea").getValue();
							resolve(sText);
							oDialog.close();

						}
					}),
					endButton: new Button({
						text: "İptal",
						press: function () {
							reject();
							oDialog.close();
						}
					}),
					afterClose: function () {
						that._noteDialogOpen = false;
						oDialog.destroy();
						delete that._noteDialog;
						oController.uploadDelDocFlag = 0;
					}
				});
				this._noteDialog = oDialog;
				return this._noteDialog;
			}
			// handleUploadCalibDoc: function () {
			// console.log("Kerem");
			// }

	});

});