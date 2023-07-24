({
    // Seta localInfo
    // url - https://projetogauss--dev.sandbox.my.salesforce-sites.com/PortalGauss/?page={tipo da página}&usr={tipo do usuário}
    
    doInit : function(component, event, helper)
    {
        const locationParams = new URLSearchParams(window.location.search);
        
        const pageType = locationParams.get("page");
        const userType = 'candidato';
        
        switch (pageType) 
        { 
            case "login" :
                helper.isUserLoginPath(
                    component,
                    helper,
                    {
                        userType: userType
                    }
                );
                break;

            case "define" :
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

            case "redefine" :
                helper.isRedefinePasswordPath(
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
    // Outro
    //
    
    backToPageEvent : function(component, event, helper) {helper.loadAnotherPage(component, event.getParam('pageName'), event.getParam('detail'));}
})
