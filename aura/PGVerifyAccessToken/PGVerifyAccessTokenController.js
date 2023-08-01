({
    backToLogin : function(component, event, helper)
    {
        helper.setAnotherPage(
            component,
            'PGUserLogin',
            { userType: component.get('v.userType') }
        );
    },

    verifyToken : function(component, event, helper)
    {
        let tokenCode = document.getElementById("tokenCode");

        if(tokenCode.value == '')
        {
            helper.showWarning('errortokenCode', 'tokenCode', 'Campo não preenchido');
            return;
        }

        helper.hidingWarning('errortokenCode', 'tokenCode');
        helper.verifyToken(component, helper);
    },

    resendToken : function(component, event, helper)
    {
        let userName = component.get('v.userName');
        let userPassword = component.get('v.userPassword');
        let userType = component.get('v.userType');

        let resendComponent = component.find('resendTokenComponent');
        let resendStatus = resendComponent.resendToken(userName, userPassword, userType);

        if (resendStatus)
        {
            helper.successResend(component, helper);
        }
        else
        {
            helper.failedResend(component, helper);
        }
    }
})