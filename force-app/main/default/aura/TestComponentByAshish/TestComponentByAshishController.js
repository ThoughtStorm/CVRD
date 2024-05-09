({
	handleName : function(component, event, helper) {
        debugger;
		console.log(component.get('v.Name'));
        debugger;
	},
    handleClick : function(component, event, helper) {
    	debugger;
    	helper.callapex(component, event, helper);
	},
    getRecords : function(component, event, helper) {
    	debugger;
    	helper.getRecordFromApex(component, event, helper);
	},
    searchRecord : function(component, event, helper) {
    	debugger;
    	helper.getRecordFromApexByName(component, event, helper);
	}
})