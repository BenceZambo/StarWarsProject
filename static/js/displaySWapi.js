var counter = 1;

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


function nextPage(displayRequest, counterPage){
    counter++;
    if(counter >= 8){
        counter = 7;
    }
    apiRequest(displayRequest, counterPage);
}


function previousPage(displayRequest, counterPage){
    counter--;
    if(counter <=0){
        counter = 1;
    }
    apiRequest(displayRequest, counterPage);
}


function renderTableHTML(pageData){
    removeElementsByClass("planet")
    var table = document.getElementById('planet-table');
    var htmlElement = '';
    let planets = pageData.results;
    let planetsLength = planets.length
    let idCounter = 1;
    for(let i = 0; i < planetsLength; i++){
        htmlElement += '<tr class="planet"><td>' + planets[i].name + '</td>';
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
    removeElementsByClass("residents");
    let lengthOfArray = arrayWithURLs.length
    for(let j = 0; j < lengthOfArray; j++){
        let displayResidentsRequest = new XMLHttpRequest();
        displayResidentsRequest.open('GET', arrayWithURLs[j]);
        displayResidentsRequest.onload = function() {
            var residents = JSON.parse(displayResidentsRequest.responseText);
            var residentsTable = document.getElementById('residents-modal');
            var residentsHTML = '';
            
            residentsHTML += '<tr class="residents"><td>' + residents.name + '</td>';
            residentsHTML += '<td>' + residents.height + '</td>';
            residentsHTML += '<td>' + residents.mass + '</td>';
            residentsHTML += '<td>' + residents.skin_color + '</td>';
            residentsHTML += '<td>' + residents.hair_color + '</td>';
            residentsHTML += '<td>' + residents.eye_color + '</td>';
            residentsHTML += '<td>' + residents.birth_year + '</td>';
            residentsHTML += '<td>' + residents.gender + '</td></tr>';
            
            residentsTable.insertAdjacentHTML('beforeend', residentsHTML);
        }
        displayResidentsRequest.send();
    }
}



function main(){
    var displayRequest = new XMLHttpRequest();
    console.log(counter);
    apiRequest(displayRequest, counter);
    document.getElementById('next-button').onclick = function() {nextPage(displayRequest, counter)};
    document.getElementById('previous-button').onclick = function() {previousPage(displayRequest, counter)};
}

$(document).on("click", ".modal-btn", function () {
    var residentsURL = $(this).data("url");
    var residentsURLArray = residentsURL.split(',');
    var residentsOfChooosenPlanet = renderPopUp(residentsURLArray);
    $(".modal-body").text(residentsOfChooosenPlanet);
    $("#myModal").modal('show');
    
});

$(document).ready(main);