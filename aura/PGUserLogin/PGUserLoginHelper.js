({
    showWarning : function(id, idField, message) {
        let error = document.getElementById(id);
        let field = document.getElementById(idField);
        error.textContent = message;
        error.style.color = '#ffffff';
        error.style.backgroundColor = '#fc3030';
        field.style.border = '3px solid #fc3030';
    },
    
    hidingWarning : function(id, idField) {
        let error = document.getElementById(id);
        let field = document.getElementById(idField);
        error.textContent = '';
        error.style.color = '';
        error.style.backgroundColor = '';
        field.style.border = 'none';
    },

    callToVerifyUserLogin : function(component, username, password) 
    {
        component.set('v.loading', true);

        let callServiceLogin = component.find('callServiceLogin');
        let userType = component.get('v.userType');

        callServiceLogin.setParams({
            'username' : username,
            'password' : password,
            'recordTypeName' : userType
        });

        callServiceLogin.callServiceMethod('doPortalUserLogin', '', (data) => {
            
            component.set('v.loading', false);
            let toast = component.find("toastComponent");

            if(data.status == 'CompletedSuccess')
            {
                toast.closeToastComponent();

                let detail = {
                    userId : data.response.recordId,
                    userName : data.response.name,
                    userEmail : data.response.userEmail,
                    userPassword : data.response.password,
                    userType : userType,
                    tokenType : 'login'
                };

                // Encaminha para a página de verificação multifator
                let backToPageEvent = component.getEvent("backToPage");
                backToPageEvent.setParams({
                    pageName : 'verifyToken',
                    detail : detail
                });
                backToPageEvent.fire();
            }
            else
            {
                // Mostra erros
                for(let error of data.errors)
                {
                    switch(error.erroCode)
                    {
                        case 'PortalUserNotExists':
                            toast.showToastComponent('error', error.messageLabelOrText, 5000);    
                            break;
                        default:
                            toast.showToastComponent('error', 'Erro ao realizar login', 5000);
                    }
                }
            }
        });
    },
})