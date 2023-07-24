({
    backToLogin : function(component, event, helper)
    {
        let backToPageEvent = component.getEvent("backToPage");
        let userType = component.get('v.userType');

        backToPageEvent.setParams({
            pageName : 'userLogin',
            detail : { userType : userType }
        });
        
        backToPageEvent.fire();
    },

    verifyToken : function(component, event, helper)
    {
        let tokenCode = document.getElementById("tokenCode");

        if(tokenCode.value == ''){
            helper.showWarning('errortokenCode', 'tokenCode', 'Campo não preenchido');
        }else{
            helper.hidingWarning('errortokenCode', 'tokenCode');
            helper.verifyToken(component, helper);
        }
    },

    resendToken : function(component, event, helper)
    {
        // // Pegar tentativas de reenvio no localStorage
        // let local_attempts = 0;

        // // PROD
    	// if(window.localStorage['LSSIndex:LOCAL{"namespace":"c"}'])
        // { if(window.localStorage[(JSON.parse(window.localStorage['LSSIndex:LOCAL{"namespace":"c"}']).resendAttempts)]) { local_attempts = window.localStorage[(JSON.parse(window.localStorage['LSSIndex:LOCAL{"namespace":"c"}']).resendAttempts)] } }
        
        // // DEV
        // if(window.localStorage['resendAttempts']) { local_attempts = window.localStorage['resendAttempts']; }

        // component.set('v.resendAttempts', parseInt(local_attempts));
        // helper.resendToken(component, helper);

        console.log('stand by');
    }
})