function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZRT_006_OD_WALLET_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}