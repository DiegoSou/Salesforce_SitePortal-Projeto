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

    sendTokenToEmail : function(component, helper)
    {
        component.set('v.loading', true);

        let username = document.getElementById("usernameMentorForgotPass");
        let userType = component.get('v.userType');

        let service = component.find("forgotPasswordService");

        service.setParams({
            'username': username.value,
            'recordTypeName': helper.capitalizeFirst(userType)
        });

        service.callServiceMethod('requestNewPasswordByEmail', '', (data) => {
            component.set('v.loading', false);
            let toast = component.find('toastComponent');

            if(data.status == 'CompletedSuccess')
            {
                // Carrega a página VerifyToken
                
                toast.closeToastComponent();
                let detail = {
                    userId : data.response.recordId,
                    userName : data.response.name,
                    userEmail : data.response.userEmail,
                    userPassword : data.response.password,
                    userType : userType,
                    tokenType : 'Redefinir senha'
                };

                // Constrói evento
                let backToPageEvent = component.getEvent("backToPage");
                backToPageEvent.setParams({
                    pageName : 'PGVerifyAccessToken',
                    detail : detail
                });
                
        
        		// Limpa local storage e manda evento
        		localStorage.clear();
                backToPageEvent.fire();
            }
            else
            {
                for(let error of data.errors)
                {
                    switch(error.erroCode)
                    {
                        case 'InvalidUsername':
                            toast.showToastComponent('error', error.messageLabelOrText, 5000);    
                            break;
                        default:
                            toast.showToastComponent('error', 'Erro ao enviar token para o email', 5000);
                    }
                }
            }
        });
    },

    //
    //  Outros
    //
    capitalizeFirst : function(somestring)
    {
        const firstLetter = somestring.charAt(0);

        const firstLetterCap = firstLetter.toUpperCase();

        const remainingLetters = somestring.slice(1);

        return  firstLetterCap + remainingLetters;
    }
})