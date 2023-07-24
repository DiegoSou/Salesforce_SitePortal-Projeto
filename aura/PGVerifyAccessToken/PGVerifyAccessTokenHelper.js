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
            	
                let pageName = '';
                let detail = {};
                switch (tokenType)
                {
                    case 'login' :
                        pageName = 'userInformations';
                        helper.setupLocalStorage(component.get('v.userId'), component.get('v.userEmail'), userType);

                        detail.userId = component.get('v.userId');
                        detail.userEmail = component.get('v.userEmail');
                        detail.userType = userType;
                        break;

                    case 'Redefinir senha' :
                        pageName = 'definePassword';
            			
                        detail.userName = component.get('v.userName');
                        detail.token = 'verified';
                        detail.userType = userType;
                        break;
                }
                
                let backToPageEvent = component.getEvent("backToPage");
                backToPageEvent.setParams({
                    pageName : pageName,
                    detail : detail
                });
                backToPageEvent.fire();
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
    setupLocalStorage : function(userId, userEmail, userType)
    {
        let newLocalStorage = {
            userId: userId,
            userEmail: userEmail,
            userType: userType
        };

        window.localStorage.setItem(
            'portalInfo',
            JSON.stringify(newLocalStorage)
        );
    },

    resendToken : function(component, helper)
    {
        console.log('stand by');

        // let toast = component.find('toastComponent');
        // let attmps = component.get('v.resendAttempts');

        // if(attmps >= 3) {
        //     toast.showToastComponent('warning', 'Você não pode reenviar o token mais de três vezes, contate um administrador.', 5000);
        //     return;
        // }
        
        // toast.showToastComponent('success', 'Token enviado com sucesso', 3000);
        // attmps += 1;

        // // Adiciona attempt no atributo do componente
        // component.set('v.resendAttempts', attmps);

        // // Adiciona attempt no localstorage
        // window.localStorage.setItem('resendAttempts', attmps);
        // window.localStorage.resendAttempts = attmps;
        
		// console.log(JSON.stringify(window.localStorage));
        
        // // Manda evento - resendToken
        // helper.fireBackToPageEvent(component, 'resendToken', {
        //     "username" : component.get('v.name'),
        //     "password" : component.get('v.password'),
        //     "type" : component.get('v.userType')
        // });
    }
})