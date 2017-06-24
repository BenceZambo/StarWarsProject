var displayRequest = new XMLHttpRequest();
var table = document.getElementById('planet-table');
var counter = 1;
displayRequest.open('GET', 'http://swapi.co/api/planets/?page=' + counter);
displayRequest.onload = function() {
    var pageData = JSON.parse(displayRequest.responseText);
    renderTableHTML(pageData)
}


function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


document.getElementById('next-button').onclick = function nextPage(){
    counter++;
    if(counter >= 8){
        counter = 7;
    }
    displayRequest.open('GET', 'http://swapi.co/api/planets/?page=' + counter);
    displayRequest.onload = function() {
        var pageData = JSON.parse(displayRequest.responseText);
        renderTableHTML(pageData);
    }
    displayRequest.send();
}


document.getElementById('previous-button').onclick = function previousPage(){
    counter--;
    if(counter <=0){
        counter = 1;
    }
    displayRequest.open('GET', 'http://swapi.co/api/planets/?page=' + counter);
    displayRequest.onload = function() {
        var pageData = JSON.parse(displayRequest.responseText);
        renderTableHTML(pageData);
    }
    displayRequest.send();
}


function renderTableHTML(pageData){
    removeElementsByClass("planet")
    var htmlElement = '';
    let planets = pageData.results;
    for(let i = 0; i < planets.length; i++){
        htmlElement += '<tr class="planet">' + '<td>' + planets[i].name + '</td>';
        htmlElement += '<td>' + planets[i].diameter + '</td>';
        htmlElement += '<td>' + planets[i].climate + '</td>';
        htmlElement += '<td>' + planets[i].gravity + '</td>';
        htmlElement += '<td>' + planets[i].terrain + '</td>';
        htmlElement += '<td>' + planets[i].surface_water + '</td>';
        htmlElement += '<td>' + planets[i].population + '</td>' + '</tr>';
    }
    table.insertAdjacentHTML('beforeend', htmlElement);
}

displayRequest.send();