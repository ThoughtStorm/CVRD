({
    handleClick : function(component, event, helper) {
        //alert(component.get("v.RecordId"));boolShowSpinner
        component.set("v.boolShowSpinner", true);
        component.set("v.showPDFButton", false);
        var appRecords = component.get("v.RecordId");
        //alert(appRecords[0].Id);
        var temp = 'https://cvrd--uat--c.sandbox.vf.force.com/apex/CVRD_Application_PDF_Generator?Id='+ appRecords[0].Id;
        component.set("v.iframeUrl", temp);
        //alert(component.get("v.iframeUrl"));
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": 'https://cvrd--uat--c.sandbox.vf.force.com/apex/CVRD_Application_PDF_Generator?Id='+ appRecords[0].Id
        });
        urlEvent.fire();
    }
})