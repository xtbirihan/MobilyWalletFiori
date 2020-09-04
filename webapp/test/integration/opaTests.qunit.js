/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Zrt006/wallet/create/ZRT_006_WALLET_CREATE/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});