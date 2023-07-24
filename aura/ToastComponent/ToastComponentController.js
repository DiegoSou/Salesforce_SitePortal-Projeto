({
    showToast : function(component, event, helper) 
    {
        if(component.get('v.repeatToast') == true)
        {
            component.set('v.repeatToast', false);

            let params = event.getParam('arguments');
            if (params) {
                let param1 = params.typeParam;
                let param2 = params.messageParam;
                let param3 = params.time;

                component.set('v.typeToast', param1);
                component.set('v.message', param2);

                switch (component.get('v.typeToast'))
                {
                    case 'success':
                        component.set('v.typeIcon', 'utility:success');
                        break;
                    case 'error':
                        component.set('v.typeIcon', 'utility:error');
                        break;
                    case 'info':
                        component.set('v.typeIcon', 'utility:info');
                        break;
                    case 'warning':
                        component.set('v.typeIcon', 'utility:warning');
                        break;
                }

                component.set('v.showToast', true);

                setTimeout(function(){
                    component.set('v.repeatToast', true);
                    component.set('v.showToast', false);
                }, param3);
            }
        }
    },

    closeToast : function(component, event, helper)
    {
        component.set('v.showToast', false);
    }
})