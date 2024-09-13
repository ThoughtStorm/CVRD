({
    initialize: function(component, event, helper) {
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap}).fire();    
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap2}).fire();
        component.set('v.isUsernamePasswordEnabled', helper.getIsUsernamePasswordEnabled(component, event, helper));
        component.set("v.isSelfRegistrationEnabled", helper.getIsSelfRegistrationEnabled(component, event, helper));
        component.set("v.communityForgotPasswordUrl", helper.getCommunityForgotPasswordUrl(component, event, helper));
        component.set("v.communitySelfRegisterUrl", helper.getCommunitySelfRegisterUrl(component, event, helper));
    },
    
    handleLogin: function (component, event, helpler) {
        debugger;
        console.log('Check : '+component.get("v.checkBoxCheck"));
        var username = component.find("username").get("v.value");
        var password = component.find("password").get("v.value");
        var checkCmp = component.find("checkbox").get("v.checked");
        if(checkCmp == true){
            debugger;
            console.log('Check : '+component.get("v.checkBoxCheck"));
            component.set("v.checkBoxCheck", false);
            helpler.handleLogin(component, event, helpler);
        }else{
            debugger;
            component.set("v.isUsernamePasswordEnabled", true);
            component.set("v.showError", true);
            component.set("v.errorMessage", 'Please select the checkbox');
        }
            console.log('Check : '+component.get("v.checkBoxCheck"));
        	console.log('ErrorMsg : '+component.get("v.errorMessage"));
    },
    
    setStartUrl: function (component, event, helpler) {
        var startUrl = event.getParam('startURL');
        if(startUrl) {
            component.set("v.startUrl", startUrl);
        }
    },
    
    setExpId: function (component, event, helper) {
        var expId = event.getParam('expid');
        if (expId) {
            component.set("v.expid", expId);
        }
        helper.setBrandingCookie(component, event, helper);
    },
    
    onKeyUp: function(component, event, helpler){
        //checks for "enter" key
        if (event.getParam('keyCode')===13) {
            helpler.handleLogin(component, event, helpler);
        }
    },
    
    navigateToForgotPassword: function(cmp, event, helper) {
        var forgotPwdUrl = cmp.get("v.communityForgotPasswordUrl");
        if ($A.util.isUndefinedOrNull(forgotPwdUrl)) {
            forgotPwdUrl = cmp.get("v.forgotPasswordUrl");
        }
        var startUrl = cmp.get("v.startUrl");
        if(startUrl){
            if(forgotPwdUrl.indexOf("?") === -1) {
                forgotPwdUrl = forgotPwdUrl + '?startURL=' + decodeURIComponent(startUrl);
            } else {
                forgotPwdUrl = forgotPwdUrl + '&startURL=' + decodeURIComponent(startUrl);
            }
        }
        var attributes = { url: forgotPwdUrl };
        $A.get("e.force:navigateToURL").setParams(attributes).fire();
    },
    
    navigateToSelfRegister: function(cmp, event, helper) {
        var selfRegUrl = cmp.get("v.communitySelfRegisterUrl");
        if (selfRegUrl == null) {
            selfRegUrl = cmp.get("v.selfRegisterUrl");
        }
        var startUrl = cmp.get("v.startUrl");
        if(startUrl){
            if(selfRegUrl.indexOf("?") === -1) {
                selfRegUrl = selfRegUrl + '?startURL=' + decodeURIComponent(startUrl);
            } else {
                selfRegUrl = selfRegUrl + '&startURL=' + decodeURIComponent(startUrl);
            }
        }
        var attributes = { url: selfRegUrl };
        $A.get("e.force:navigateToURL").setParams(attributes).fire();
    },
    
    handleCheckboxChange: function(cmp, event, helper){
        //console.log('Button : '+cmp.get("v.checkBoxValue"));
        /*var checkCmp = cmp.find("checkbox").get("v.checked");
        console.log('var : '+checkCmp);
        if(checkCmp == true){
            cmp.set("v.checkBoxCheck", false);
            console.log('Button : '+cmp.get("v.checkBoxCheck"));
        }*/
        //console.log('Button : '+cmp.get("v.checkBoxValue"));
    }
})