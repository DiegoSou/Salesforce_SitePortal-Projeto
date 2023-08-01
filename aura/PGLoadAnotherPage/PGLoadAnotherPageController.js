({
    loadCmp : function(component, event, helper)
    {
        const lastView = component.get("v.currentView"); if(lastView) {helper.clearView(component, lastView);}
        const params = event.getParam("arguments"); if(!params) {return;}
        
        const pageName = params.pageName;
        const attributes = params.attributes;

        if (pageName)
        {
            let cmpName = 'c:'+pageName;
                
            $A.createComponents([
                ["aura:if",{
                            "isTrue" : "true",
                            "aura:id" : pageName
                        }],
                        [cmpName,attributes]
                ],
                function(components, status, errorMessages)
                {
                    if (status === "SUCCESS") 
                    {
                        var auraIfWrapper = components[0];
                        var cmpCreated = components[1];
                        
                        auraIfWrapper.set("v.body", cmpCreated);

                        helper.setView(component, auraIfWrapper);
                    }
                    else if (status === "ERROR") { console.log('Componente não existe - ' + pageName); }
                }
            );
        }
    }    
})




// contrato de componentes
// switch (pageName)
// {
//     case 'userLogin' :
//         component.find('userLogin').set('v.isTrue', 'true');
//         break;

//     case 'definePassword' :
//         component.find('definePassword').set('v.isTrue', 'true');
//         break;

//     case 'verifyToken' :
//         component.find('verifyToken').set('v.isTrue', 'true');
//         break;

//     case 'forgotPassword' :
//         component.find('forgotPassword').set('v.isTrue', 'true');
//         break;

//     case 'userInformations' :
//         component.find('userInformations').set('v.isTrue', 'true');
//         break;

//     default :
//         console.log('Página não encontrada -', pageName); return;
// }
