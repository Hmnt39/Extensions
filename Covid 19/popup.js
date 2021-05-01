function status(response) {
    if (response.status == 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}
var local_div = document.getElementById('local');
var global_div = document.getElementById('global');

fetch('https://api.covid19api.com/summary')
.then(status)
.then(json)
.then(function(data) {
    var val = "India";
    var index = data.Countries.findIndex(function(item, i){
        return item.Country === val
    });
    var  india = '<b>India</b></br>Cases : ' + 
    data.Countries[index].TotalConfirmed + '<br>Recoverd : ' +
    data.Countries[index].TotalDeaths+ '<br>Death : ' +
    data.Countries[index].TotalRecovered ;

    var global = '<b>Global</b></br>Cases : ' + 
    data.Global.TotalConfirmed + '<br>Recoverd : ' +
    data.Global.TotalDeaths + '<br>Death : ' +
    data.Global.TotalRecovered ;

    local_div.innerHTML = india;
    global_div.innerHTML = global;
}).catch(function(error) {
    var main_div = document.getElementById('main');
    main_div.innerHTML = error;
});