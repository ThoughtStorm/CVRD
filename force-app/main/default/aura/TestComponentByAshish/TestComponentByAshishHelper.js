({
	callapex : function(component, event, helper) {
		debugger;
        var temp = component.get('v.Name');
        var action = component.get("c.saveAccount");
        action.setParams({ Name : temp });
        debugger;
        action.setCallback(this, function(response){
            debugger;
            var state = response.getState();
            if(state == 'SUCCESS') {
                debugger;
                //component.set('v.countries', response.getReturnValue());
            }
            debugger;
        });
        $A.enqueueAction(action);
	},
    getRecordFromApex : function(component, event, helper) {
		debugger;
        var action = component.get("c.getAccounts");
        debugger;
        action.setCallback(this, function(response){
            debugger;
            var state = response.getState();
            if(state == 'SUCCESS') {
                debugger;
                console.log(response.getReturnValue());
                component.set('v.loadTable', true);
                component.set('v.AccList', response.getReturnValue());
                //component.set('v.countries', response.getReturnValue());
            }
            debugger;
        });
        $A.enqueueAction(action);
    },
    getRecordFromApexByName : function(component, event, helper) {
		debugger;
        var temp = component.get('v.SearchName');
        var action = component.get("c.getAccountByName");
        action.setParams({ searchName : temp });
        debugger;
        action.setCallback(this, function(response){
            debugger;
            var state = response.getState();
            if(state == 'SUCCESS') {
                debugger;
                console.log(response.getReturnValue());
                component.set('v.loadTable', true);
                component.set('v.AccList', response.getReturnValue());
                //component.set('v.countries', response.getReturnValue());
            }
            debugger;
        });
        $A.enqueueAction(action);
    }
})