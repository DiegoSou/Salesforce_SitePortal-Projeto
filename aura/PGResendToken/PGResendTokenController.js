({
    resendToken : function(component, event, helper) 
    {
        let localAttempts = parseInt(helper.getLocalStorageData('resendAttempts'));
        console.log('attps ', localAttempts);

        if (localAttempts > 2) 
        { 
            return false; 
        }
        
        const params = event.getParam('arguments');
        helper.callToVerifyUserLogin(component, params.userName, params.userPassword, params.userType);
       
        helper.incrementLocalAttempts(component, localAttempts);
        return true;
    },
})