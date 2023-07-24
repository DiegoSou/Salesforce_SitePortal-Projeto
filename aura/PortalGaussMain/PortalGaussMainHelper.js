({
    //
    // Caminhos que o usuário pode fazer
    //
    // login
    isUserLoginPath : function(component, helper, params)
    {
        const userLocalStorageInfo = helper.getLocalStorageData(params.userType, helper);
        
        if(userLocalStorageInfo !== undefined)
        {
            helper.loadAnotherPage(component, 'userInformations', {userId: userLocalStorageInfo.userId, userEmail: userLocalStorageInfo.userEmail, userType: userLocalStorageInfo.userType});
            
            return;
        }

        helper.loadAnotherPage(component, 'userLogin', {userType : params.userType});
    },

    // definir senha
    isDefinePasswordPath : function(component, helper, params)
    {
        helper.loadAnotherPage(component, 'definePassword', {token: params.userToken, userName: params.userName, userType: params.userType});
    },

    // redefinir senha
    isRedefinePasswordPath : function(component, helper, params)
    {
        helper.loadAnotherPage(component, 'definePassword', {token: params.userToken, userName: params.userName, userType: params.userType});
    },

    // caminho não definido
    isUndefinedPath : function(component, helper, params)
    {
        window.location.href = window.location.origin + "/PortalGauss/?page=login";
    },

    //
    // Local Storage
    //
    getLocalStorageData : function(userType, helper)
    {
        let storageDataDev = helper.accessLocalStorageDev();
        let storageDataProd = helper.accessLocalStorageProd();

        console.log('string: ', JSON.stringify(window.localStorage));

        if (storageDataDev)
        {
            return storageDataDev;
        }

        if (storageDataProd)
        {
            return storageDataProd;
        }
    },
    accessLocalStorageDev : function()
    {
        let storageData;
        const key = 'portalInfo';

        if(window.localStorage[key])
        {
            storageData = JSON.parse(window.localStorage[key]);
        }

        return storageData
    },
    accessLocalStorageProd : function()
    {
        let storageData;
        const key = 'LSSIndex:LOCAL{"namespace":"c"}';

        if(window.localStorage[key])
        {
            const storageIndex = JSON.parse(window.localStorage[key]).portalInfo;

            if (window.localStorage[storageIndex])
            {
                storageData = JSON.parse(window.localStorage[storageIndex]);
            }
        }

        return storageData; 
    },

    //
    // Outro
    //

    loadAnotherPage : function(component, pageName, attributes) {component.find('loadAnotherPageComponent').loadCmp(pageName, attributes);}
})
