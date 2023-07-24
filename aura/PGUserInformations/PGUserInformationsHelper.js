({
    convertData : function(data) {
        let newData = Date.parse(data);
        let formatter = new Intl.DateTimeFormat('pt-BR');
        return formatter.format(new Date(newData).setUTCHours(3));
    }
})