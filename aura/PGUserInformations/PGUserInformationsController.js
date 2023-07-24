({
    logoutUser : function(component, event, helper) 
    {
        localStorage.clear();
        let userType = component.get('v.userType');
        let backToPageEvent = component.getEvent("backToPage");
        
        backToPageEvent.setParams({
            pageName : 'userLogin',
            detail : { userType : userType }
        });

        backToPageEvent.fire();
    }
})