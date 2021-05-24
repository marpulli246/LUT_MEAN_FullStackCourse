     
request = new XMLHttpRequest;
request.open('GET', 'http://api.airvisual.com/v2/states?country=Finland&key=a9cccd06-2db2-400b-bf14-68f967fa2440', true);


request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    // Success!
    data = JSON.parse(request.responseText);
    //console.log(data.data.current.pollution.aqicn);
    console.log(data.data)
  } 
  else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();