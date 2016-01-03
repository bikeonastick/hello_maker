describe("names", function() {
  var testNode;
  var song;

  beforeEach(function() {
    testNode = document.createElement("div");
    testNode.setAttribute("id","nametag_text");
    document.body.appendChild(testNode);
  });
  afterEach(function() {
    var toDel = document.getElementById("nametag_text");
    toDel.parentElement.removeChild(toDel);
  });

  it("should set the `nametag_text` node's content", function() {
    var testVal = "foo";
    nameIt(testVal);
    expect(document.getElementById("nametag_text").textContent).toEqual(testVal);
  });

});
