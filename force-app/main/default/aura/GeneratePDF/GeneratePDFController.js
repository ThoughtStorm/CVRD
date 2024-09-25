({
    handleClick : function(component, event, helper) {
        component.set("v.showPDFButton", true);
        var appRecords = component.get("v.RecordId");
        window.open('/CVRDCitizenshipPortal/apex/CVRD_Application_PDF_Generator?id='+appRecords[0].Id,'_blank');
        window.location.reload();
    }
})