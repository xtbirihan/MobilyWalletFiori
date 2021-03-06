sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Zrt006/wallet/create/ZRT_006_WALLET_CREATE/model/models",
	"Zrt006/wallet/create/ZRT_006_WALLET_CREATE/helper/MessageHandler"
], function (UIComponent, Device, models, MessageHandler) {
	"use strict";

	return UIComponent.extend("Zrt006.wallet.create.ZRT_006_WALLET_CREATE.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.MessageHandler = new MessageHandler(this);
		}
	});
});