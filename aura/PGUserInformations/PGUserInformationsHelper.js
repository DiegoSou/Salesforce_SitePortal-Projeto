({
    convertData : function(data) {
        let newData = Date.parse(data);
        let formatter = new Intl.DateTimeFormat('pt-BR');
        return formatter.format(new Date(newData).setUTCHours(3));
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
    }
})