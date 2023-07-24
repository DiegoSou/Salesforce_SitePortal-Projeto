({
    afterRender : function(component, helper)
    {
        this.superAfterRender();
        let service = component.find('accountInfor');

        let emailUsuario = component.get('v.userEmail');
        let idUsuario = component.get('v.userId');

        service.setParams({
            'email' : emailUsuario
        });

        service.callServiceMethod('returnAccountDomain', '', (data) => {
            if(data.response != null)
            {
                // console.log('Response call service: ', JSON.stringify(data.response));
                
                component.set('v.name', data.response.name);
                component.set('v.email', data.response.email);
                component.set('v.age', data.response.age);
                component.set('v.birthday', helper.convertData(data.response.birthData));
                component.set('v.genre', data.response.gender);
                component.set('v.cellphone', data.response.mobilePhone);
                component.set('v.state', data.response.stateOfResidence);
                component.set('v.city', data.response.cityOfResidence);
                component.set('v.district', data.response.district);

                component.set('v.enem', data.response.enemPreviousYear);
                component.set('v.noteComposition', data.response.previousRedactionNote);
                component.set('v.whishedCourse', data.response.desiredCourse);
            }       
        });
    },
})