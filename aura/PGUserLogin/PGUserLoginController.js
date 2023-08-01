({
    verifyUser : function(component, event, helper)
    {
        let username = document.getElementById("usernameInput").value;
        let password = document.getElementById("passwordInput").value;

        // VERIFICAÇÕES DOS CAMPOS
        if(username == '' && password == '')
        {
            helper.showWarning('errorUsername', 'usernameInput', 'campo obrigatório');
            helper.showWarning('errorPassword', 'passwordInput', 'campo obrigatório');
        }
        else if(username == '' && password != '')
        { 
            helper.showWarning('errorUsername', 'usernameInput', 'campo obrigatório');
            helper.hidingWarning('errorPassword', 'passwordInput');
        }
        else if(username != '' && password == '')
        {
            helper.showWarning('errorPassword', 'passwordInput', 'campo obrigatório');
            helper.hidingWarning('errorUsername', 'usernameInput');
        }
        else{
            helper.hidingWarning('errorUsername', 'usernameInput');
            helper.hidingWarning('errorPassword', 'passwordInput');
            
            // VERIFIED
            helper.callToVerifyUserLogin(component, username, password);
        }
    },

    showAnotherPortal : function(component, event, helper)
    {
        // Encaminha para o outro portal de usuário
        let userType = component.get('v.userType') == 'candidato' ? 'mentor' : 'candidato';

        window.location.href = window.location.origin + "/PortalGauss/?page=login&usr=" + userType;
    },

    forgotPassword : function(component, event, helper)
    {
        // Encaminha para a página de esqueci a senha
        let userType = component.get('v.userType');

        let backToPageEvent = component.getEvent("backToPage");
        
        backToPageEvent.setParams({
            pageName : 'PGUserForgotPassword',
            detail : { userType : userType }
        });

        backToPageEvent.fire();
    },
})