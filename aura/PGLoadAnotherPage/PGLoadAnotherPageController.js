({
    // public method 
    loadCmp : function(component, event, helper)
    {
        let lastView = component.get('v.currentView'); if (lastView) {component.find(lastView).set('v.isTrue', 'false');}

        let params = event.getParam('arguments');
        if(params)
        {
            let pageName = params.pageName;
            let attributes = params.attributes;

            component.set('v.details', attributes);

            // contrato de componentes
            switch (pageName)
            {
                case 'userLogin' :
                    component.find('userLogin').set('v.isTrue', 'true');
                    break;

                case 'definePassword' :
                    component.find('definePassword').set('v.isTrue', 'true');
                    break;

                case 'verifyToken' :
                    component.find('verifyToken').set('v.isTrue', 'true');
                    break;

                case 'forgotPassword' :
                    component.find('forgotPassword').set('v.isTrue', 'true');
                    break;

                case 'userInformations' :
                    component.find('userInformations').set('v.isTrue', 'true');
                    break;

                default :
                    console.log('Página não encontrada -', pageName); return;
            }

            component.set('v.currentView', pageName);
        }
    }    
})