({
    populateTable : function(component, event, helper, userId) {
        var action = component.get("c.getInterviews");
        action.setParams({
            recordId: userId
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Push interviews fetched by the Apex controller to the component
                var recordRelations = response.getReturnValue();
                var interviews = [];
                for (var i = 0; i < recordRelations.length; i++) {
                    interviews.push(
                        {
                            Id: recordRelations[i].Id,
                            InterviewLabel: recordRelations[i].InterviewLabel,
                            PauseLabel: recordRelations[i].PauseLabel,
                            CurrentElement: recordRelations[i].CurrentElement,
                            PausedDate: recordRelations[i].LastModifiedDate,
                            PausedBy: recordRelations[i].Owner.Name
                        });
                }
                component.set('v.Interviews', interviews);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    
    handleShowModal: function (component, id) {
        // On resume, render the interview in a modal
        $A.createComponent("lightning:flow", {"onstatuschange": component.get("c.statusChange")},
            function (content, status) {
                if (status === "SUCCESS") {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Application Resume successfully.",
                        "type": 'success',
                        "mode": 'pester'
                    });
                    toastEvent.fire();
                    component.find('overlayLib').showCustomModal({
                        cssClass: "mymodal slds-modal_large",
                        body: content,
                        showCloseButton: true,
                        closeCallback: function () {
                            $A.get('e.force:refreshView').fire();
                        }
                    }).then(function(overlay) {
                        // Use to close the modal later
                        component.set("v.overlay", overlay);
                    });
                    content.resumeFlow(id);
                }
            });
    },
    
    handleDelete: function (component, event, helper, id) {
        // On delete, pass the interview ID to the Apex controller        
        var action = component.get("c.deleteInterview");
        action.setParams({
            interviewId: id
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Automatically refresh the table
                helper.populateTable(component, event, helper);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    getLoggedInUserId : function (component, event, helper){
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        //Console.log(userId);
        component.set("v.recordId", userId);
        alert("v.recordId"+ '   From get()');
    }
})