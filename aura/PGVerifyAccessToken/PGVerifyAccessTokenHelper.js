({
    showWarning : function(id, idField, message) {
        let error = document.getElementById(id);
        let field = document.getElementById(idField);
        error.textContent = message;
        error.style.color = '#ffffff';
        error.style.backgroundColor = '#fc3030';
        field.style.border = '3px solid #fc3030';
    },
    
    hidingWarning: function(id, idField) {
        let error = document.getElementById(id);
        let field = document.getElementById(idField);
        error.textContent = '';
        error.style.color = '';
        error.style.backgroundColor = '';
        field.style.border = 'none';
    },

    verifyToken : function(component, helper) 
    {
        component.set('v.loading', true);

        let validateService = component.find('callServiceValidade');

        let userType = component.get('v.userType');
        let tokenType = component.get('v.tokenType');

        let tokenCode = document.getElementById("tokenCode").value;
        
        validateService.setParams({
            'token' : tokenCode,
            'useType': tokenType
        });

        validateService.callServiceMethod('validateToken', '', (data) => {
            component.set('v.loading', false);
            let toast = component.find('toastComponent');
	
            if(data.response)
            {
                // autorizado
                helper.setLocalStorage(component, null, null);
            	
                let pageName = '';
                let detail = {};
                
                switch (tokenType)
                {
                    case 'login' :
                        pageName = 'PGUserInformations';
                        
                        detail.userId = component.get('v.userId');
                        detail.userEmail = component.get('v.userEmail');
                        detail.userType = userType;

                        helper.setLocalStorage(component, 'portalInfo', detail);
                        break;

                    case 'Redefinir senha' :
                        pageName = 'PGUserDefinePassword';
            			
                        detail.userName = component.get('v.userName');
                        detail.token = 'verified';
                        detail.userType = userType;

                        break;
                }
                
                helper.setAnotherPage(component, pageName, detail);
            }
            else
            {
                // não autorizado
                for(let error of data.errors)
                {
                    switch(error.erroCode)
                    {
                        case 'InvalidToken':
                            toast.showToastComponent('error', error.messageLabelOrText, 5000);    
                            break;
                        default:
                            toast.showToastComponent('error', 'Erro no processamento do token', 5000);
                    }
                }
            }
        });
    },

    //
    // Outro
    //
    setLocalStorage : function(component, key, value)
    {
        let manageLocalStorageEvent = component.getEvent("manageLocalStorage");

        manageLocalStorageEvent.setParams({
            key : key,
            data : value
        });
        
        manageLocalStorageEvent.fire();
    },
    setAnotherPage : function(component, pageName, detail)
    {
        let backToPageEvent = component.getEvent("backToPage");
        
        backToPageEvent.setParams({
            pageName : pageName,
            detail : detail
        });
        
        backToPageEvent.fire();
    },

    successResend : function(component, helper)
    {
        let toast = component.find('toastComponent');
        toast.showToastComponent('success', 'Token enviado com sucesso', 3000);
    },
    failedResend : function(component, helper)
    {
        let toast = component.find('toastComponent');
        toast.showToastComponent('warning', 'Você não pode reenviar o token mais de três vezes, contate um administrador.', 5000);
    }
})