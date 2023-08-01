({
    callToVerifyUserLogin : function(component, userName, userPassword, userType) 
    {
        const callServiceLogin = component.find('callServiceLogin');

        callServiceLogin.setParams({
            'username' : userName,
            'password' : userPassword,
            'recordTypeName' : userType
        });

        callServiceLogin.callServiceMethod('doPortalUserLogin', '', (data) => {});
    },

    // Local Storage

    getLocalStorageData : function(key)
    {
        // acessar em dev
        const storageDataDev = () => {
            let storageData;
    
            if(window.localStorage[key])
            {
                storageData = JSON.parse(window.localStorage[key]);
            }
    
            return storageData;
        };

        // acessar em prod
        const storageDataProd = () => {
            let storageData;
    
            if(window.localStorage['LSSIndex:LOCAL{"namespace":"c"}'])
            {
                const storageIndex = JSON.parse(window.localStorage['LSSIndex:LOCAL{"namespace":"c"}'])[key];
    
                if (window.localStorage[storageIndex])
                {
                    storageData = JSON.parse(window.localStorage[storageIndex]);
                }
            }
    
            return storageData; 
        }
        
        const dev = storageDataDev();
        const prod = storageDataProd();

        if (dev) return dev;
        if (prod) return prod;
    },

    incrementLocalAttempts : function(component, localAttempts)
    {
        if (!localAttempts)
        {
            localAttempts = 0;
        }

        let manageLocalStorageEvent = component.getEvent("manageLocalStorage");

        manageLocalStorageEvent.setParams({
            key : 'resendAttempts',
            data : localAttempts+1
        });
        
        manageLocalStorageEvent.fire();
    }
})