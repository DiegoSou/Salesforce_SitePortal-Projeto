({
    logoutUser : function(component, event, helper) 
    {
        helper.setLocalStorage(component, null, null);
        helper.setAnotherPage(
            component,
            'PGUserLogin',
            { userType : component.get('v.userType') }
        );
    }
})