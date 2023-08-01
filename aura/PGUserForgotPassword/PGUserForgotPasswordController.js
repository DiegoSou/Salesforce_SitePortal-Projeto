({
    sendTokenToEmail : function(component, event, helper) 
    {
        let usernameMentor = document.getElementById("usernameMentorForgotPass");

        if(usernameMentor.value == ''){
            helper.showWarning('errorUsernameMentorForgotPass', 'usernameMentorForgotPass', 'Campo não preenchido');
        }else{
            helper.hidingWarning('errorUsernameMentorForgotPass', 'usernameMentorForgotPass');
            helper.sendTokenToEmail(component, helper);
        }
    },

    backToLogin : function(component, event, helper)
    {
        let backToPageEvent = component.getEvent("backToPage");
        let userType = component.get('v.userType');

        backToPageEvent.setParams({
            pageName : 'PGUserLogin',
            detail : { userType : userType }
        });

        backToPageEvent.fire();
    }
})