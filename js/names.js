function nameIt(nameVal) {
  var theNode = document.getElementById("nametag_text");
  theNode.textContent = nameVal;

  return true;
}

function nameThem(nameVals) {
  var names = nameVals.split(',');
  var theNode = document.getElementById("more_tags");
  for ( var count = 0; count < names.length; count++ ) {
    var nameVal = names[count].trim();
    var helloDiv = document.createElement("div");
    helloDiv.setAttribute("id","tag" + count);
    helloDiv.setAttribute("class", "tag");

    var h1 = document.createElement("h1");
    var namedH1 = document.createTextNode(nameVal);
    h1.appendChild(namedH1);
    helloDiv.appendChild(h1);

    theNode.appendChild(helloDiv);
  }
  return true;
}
