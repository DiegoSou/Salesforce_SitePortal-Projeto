({
    // url - https://projetogauss--dev.sandbox.my.salesforce-sites.com/PortalGauss/?page={tipo da página}&usr={tipo do usuário}
    
    //
    // Mapeamento das rotas
    //
    
    doInit : function(component, event, helper)
    {
        const locationParams = new URLSearchParams(window.location.search);
        const pageType = locationParams.get("page");
        
        switch (pageType) 
        { 
            case "login":
                helper.isUserLoginPath(
                    component,
                    helper,
                    {
                        userType: locationParams.get("usr")
                    }
                );
                break;

            case "define":
                helper.isDefinePasswordPath(
                    component,
                    helper,
                    {
                        userType: locationParams.get("usr"),
                        userName: locationParams.get("name"),
                        userToken: locationParams.get("token")
                    }
                );
                break;
                
            default :
                helper.isUndefinedPath(
                    component,
                    helper,
                    {}
                );       
        }
    },
    
    //
    //  Handler de Eventos
    //

    backToPageEvent : function(component, event, helper) 
    {
        helper.loadAnotherPage(component, event.getParam('pageName'), event.getParam('detail'));
    },

    managelocalStorageEvent : function(component, event, helper)
    {
        const key = event.getParam('key');
        const data = event.getParam('data');

        if (data)
        {
            helper.setLocalStorageData(key, data);
            return;
        }
        
        // else
        helper.clearLocalStorageData();
    }
})