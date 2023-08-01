({
    setView : function(component, newView) 
    {
        // CONSOLE LOG
        console.log('Componente foi criado - ' + newView.getLocalId());

        component.set("v.body", newView);
        component.set("v.currentView", newView.getLocalId());
    },

    clearView : function(component, lastView)
    {
        // CONSOLE LOG
        console.log('Componente foi ocultado - ' + lastView); 

        component.set("v.body", []);
    }
})