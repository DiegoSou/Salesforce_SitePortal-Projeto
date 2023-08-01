({
    confirmPassword : function(component, event, helper) {
        let password = document.getElementById("definePassword");
        let confirmPassword = document.getElementById("confirmPassword");

        if(password.value == confirmPassword.value && password.value != '' && confirmPassword.value != '')
        {
            helper.hidingWarning('errorDefinePassword', 'definePassword');
            helper.hidingWarning('errorConfirmPassword', 'confirmPassword');
            
            // VERIFICADO
            helper.createPassword(component, helper);
        }
        else if(password.value != confirmPassword.value && password.value != '' && confirmPassword.value != '')
        {
            helper.showWarning('errorDefinePassword', 'definePassword', 'senhas diferentes');
            helper.showWarning('errorConfirmPassword', 'confirmPassword', 'senhas diferentes');
        }
        else if(password.value == '' && confirmPassword.value != '')
        {
            helper.showWarning('errorDefinePassword', 'definePassword', 'campo obrigatório');
            helper.hidingWarning('errorConfirmPassword', 'confirmPassword');
        }
        else if(password.value != '' && confirmPassword.value == '')
        {
            helper.showWarning('errorConfirmPassword', 'confirmPassword', 'campo obrigatório');
            helper.hidingWarning('errorDefinePassword', 'definePassword');
        }
        else if(password.value == '' && confirmPassword.value == '')
        {
            helper.showWarning('errorDefinePassword', 'definePassword', 'campo obrigatório');
            helper.showWarning('errorConfirmPassword', 'confirmPassword', 'campo obrigatório');
        }
    }
})