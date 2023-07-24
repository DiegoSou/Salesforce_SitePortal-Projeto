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

    createPassword : function(component, helper)
    {
        let service = component.find('createPassword');
        let toast = component.find('toastComponent');
        
        let nameUser = component.get('v.userName');
        let userType = component.get('v.userType');

        let password = document.getElementById("definePassword").value;

        service.setParams({
            'newPassword' : password,
            'userName' : nameUser
        });

        service.callServiceMethod('changePasswordPortalUser', '', (data) => {

            toast.showToastComponent('success', 'Senha criada com sucesso', 2000);

            if(data.response)
            {
                localStorage.clear();

                let backToPageEvent = component.getEvent("backToPage");
                backToPageEvent.setParams({
                    pageName : 'userLogin',
                    detail : { userType : userType }
                });
                backToPageEvent.fire();
            }
        });
    }
})