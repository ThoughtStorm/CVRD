({
    doInit :function(cmp) {
        // Set the attribute value. 
        // You could also fire an event here instead.
        //cmp.set("v.setMeOnInit", "controller init magic!");
        cmp.set("v.boolShowSpinner", true);
        if(cmp.get("v.url")==undefined){
            cmp.set("v.showPDFButton", true);
        }else{
            cmp.set("v.showPDFButton", false);
        }
        
        var appRecords = cmp.get("v.url");
        //alert(appRecords[0].Id);
        //var temp = 'https://cvrd--uat--c.sandbox.vf.force.com/apex/CVRD_Application_PDF_Generator?Id='+ appRecords[0].Id;
        cmp.set("v.iframeUrl", appRecords);
        //alert(component.get("v.iframeUrl")); 
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": appRecords
        });
        urlEvent.fire();
    },
    
    handleClick : function(component, event, helper) {
        //alert(component.get("v.RecordId"));boolShowSpinner
        component.set("v.boolShowSpinner", true);
        component.set("v.showPDFButton", false);
        var appRecords = component.get("v.RecordId");
        //alert(appRecords[0].Id);
        var temp = 'https://cvrd--dstraining--c.sandbox.vf.force.com/apex/cVRD_Application_PDF_Generator?Id='+ appRecords[0].Id;
        component.set("v.iframeUrl", temp);
        //alert(component.get("v.iframeUrl")); 
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": 'https://cvrd--dstraining--c.sandbox.vf.force.com/apex/cVRD_Application_PDF_Generator?Id='+ appRecords[0].Id
        });
        urlEvent.fire();
    }
})