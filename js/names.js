function nameIt(nameVal) {
  var theNode = document.getElementById("nametag_text");
  theNode.textContent = nameVal;

  return true;
}

function nameThem(nameVals) {
  if ( nameVals != "" ) {
    var names = nameVals.split(',');
    var theNode = document.getElementById("more_tags");
    for ( var count = 0; count < names.length; count++ ) {
      var nameVal = names[count].trim();
      var h1 = document.createElement("h1");
      var namedH1 = document.createTextNode(nameVal);
      h1.appendChild(namedH1);

      var helloDiv = document.createElement("div");
      helloDiv.setAttribute("class", "tag");
      helloDiv.appendChild(h1);

      theNode.appendChild(helloDiv);
    }
  }
  return true;
}
