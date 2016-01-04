describe("names", function() {

  beforeEach(function() {
    var testNode;
    testNode = document.createElement("div");
    testNode.setAttribute("id","nametag_text");
    document.body.appendChild(testNode);
  });
  afterEach(function() {
    var toDel = document.getElementById("nametag_text");
    toDel.parentElement.removeChild(toDel);
  });

  it("should set the 'nametag_text' node's content", function() {
    var testVal = "foo";
    nameIt(testVal);
    expect(document.getElementById("nametag_text").textContent).toEqual(testVal);
  });

});
describe("multinames", function() {

  beforeEach(function() {
    var testNode;
    testNode = document.createElement("div");
    testNode.setAttribute("id","more_tags");
    document.body.appendChild(testNode);
  });
  afterEach(function() {
    var toDel = document.getElementById("more_tags");
    toDel.parentElement.removeChild(toDel);
  });

  it("should create 2 children under more_tags when 2 names are passed in", function() {
    var testVal = "foo,bar";
    nameThem(testVal);
    expect(document.getElementById("more_tags").childNodes.length).toEqual(2);
  });

  it("should create 1 child under more_tags when 1 name is passed in", function() {
    var testVal = "foo";
    nameThem(testVal);
    expect(document.getElementById("more_tags").childNodes.length).toEqual(1);
  });

  it("should create 1 child under more_tags when 1 name with spaces is passed in", function() {
    var testVal = "Billy Jo";
    nameThem(testVal);
    expect(document.getElementById("more_tags").childNodes.length).toEqual(1);
  });

  it("should append to more_tags when called more than once", function() {
    var testVal0 = "foo";
    var testVal1 = "bar";
    nameThem(testVal0);
    nameThem(testVal1);
    expect(document.getElementById("more_tags").childNodes.length).toEqual(2);
  });
/*
  it("should create 0 children under more_tags when an empty string is passed in", function() {
    var testVal = "";
    nameThem(testVal);
    expect(document.getElementById("more_tags").childNodes.length).toEqual(0);
  });

  it("should create children under more_tags with the right style", function() {
    var testName = "foo";
    var expectedClass = "tag";
    nameThem(testName);
    expect(document.getElementById("more_tags").firstChild.getAttribute("class")).toEqual(expectedClass);
  });

  it("should create children under more_tags's children with the name in there", function() {
    var testName = "foo";
    nameThem(testName);
    expect(document.getElementById("more_tags").firstChild.firstChild.textContent).toEqual(testName);
  });
*/
});
