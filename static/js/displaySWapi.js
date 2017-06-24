

function apiRequest(displayRequest, counter){
    displayRequest.open('GET', 'http://swapi.co/api/planets/?page=' + counter);
    displayRequest.onload = function() {
        var pageData = JSON.parse(displayRequest.responseText);
        renderTableHTML(pageData)
    }
    displayRequest.send();
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function nextPage(displayRequest, counter){
    counter++;
    console.log(counter);
    if(counter >= 8){
        counter = 7;
    }
    apiRequest(displayRequest, counter);
}


function previousPage(displayRequest, counter){
    counter--;
    console.log(counter);
    if(counter <=0){
        counter = 1;
    }
    apiRequest(displayRequest, counter);
}


function renderTableHTML(pageData){
    removeElementsByClass("planet")
    var table = document.getElementById('planet-table');
    var htmlElement = '';
    let planets = pageData.results;
    let idCounter = 1;
    for(let i = 0; i < planets.length; i++){
        htmlElement += '<tr class="planet">' + '<td>' + planets[i].name + '</td>';
        htmlElement += '<td>' + planets[i].diameter + '</td>';
        htmlElement += '<td>' + planets[i].climate + '</td>';
        htmlElement += '<td>' + planets[i].gravity + '</td>';
        htmlElement += '<td>' + planets[i].terrain + '</td>';
        htmlElement += '<td>' + planets[i].surface_water + '</td>';
        htmlElement += '<td>' + planets[i].population + '</td>';
        htmlElement += '<td><button class="modal-btn" id="' + idCounter + '"' + 'data-url=' + planets[i].residents + '>Open Modal</button></td></tr>';
        idCounter += 1;

    }
    table.insertAdjacentHTML('beforeend', htmlElement);
}


function renderPopUp(arrayWithURLs){
    let lengthOfArray = arrayWithURLs.length
    for(let j = 0; j < lengthOfArray; j++){
        let displayResidentsRequest = new XMLHttpRequest();
        displayResidentsRequest.open('GET', arrayWithURLs[j]);
        displayResidentsRequest.onload = displayResidentsPage() {
            var residentsData = JSON.parse(displayResidentsRequest.responseText);
            
        }
        displayRequest.send();
    }
}



function main(){
    var displayRequest = new XMLHttpRequest();
    var counter = 1;
    console.log(counter);
    apiRequest(displayRequest, counter);
    document.getElementById('next-button').onclick = function() {nextPage(displayRequest, counter)};
    document.getElementById('previous-button').onclick = function() {previousPage(displayRequest, counter)};
}

$(document).on("click", ".modal-btn", function () {
    var residentsURL = $(this).data("url");
    var residentsURLArray = residentsURL.split(',');
    renderPopUp(residentsURLArray);
    
});

$(document).ready(main);