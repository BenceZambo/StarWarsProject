var displayRequest = new XMLHttpRequest();
displayRequest.open('GET', 'http://swapi.co/api/planets/?page=1');
displayRequest.onload = function() {
    var pageData = JSON.parse(displayRequest.response.text);
}
displayRequest.send();