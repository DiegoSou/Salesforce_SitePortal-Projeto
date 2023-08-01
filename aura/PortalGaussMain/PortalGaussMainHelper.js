({
    //
    // Rotas
    //

    isUserLoginPath : function(component, helper, params)
    {
        if (params.userType !== 'mentor' && params.userType !== 'candidato') return;

        const userLocalStorageInfo = helper.getLocalStorageData('portalInfo');

        if(userLocalStorageInfo !== undefined)
        {
            helper.loadAnotherPage(component, 'PGUserInformations', {userId: userLocalStorageInfo.userId, userEmail: userLocalStorageInfo.userEmail, userType: userLocalStorageInfo.userType});
            
            return;
        }

        helper.loadAnotherPage(component, 'PGUserLogin', {userType : params.userType});
    },

    isDefinePasswordPath : function(component, helper, params)
    {
        helper.loadAnotherPage(component, 'PGUserDefinePassword', {token: params.userToken, userName: params.userName, userType: params.userType});
    },

    isUndefinedPath : function(component, helper, params)
    {
        window.location.href = window.location.origin + "/PortalGauss/?page=login&usr=candidato";
    },

    //
    // Eventos
    //

    // Back to page

    loadAnotherPage : function(component, pageName, attributes) 
    {
        component.find('loadAnotherPageComponent').loadCmp(pageName, attributes);
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

    setLocalStorageData : function(key, value)
    {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    
    clearLocalStorageData : function()
    {
        window.localStorage.clear();
    }
})