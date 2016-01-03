# Basic HTML, CSS, JavaScript, and Testing Tutorial

This will give you an overview of how an HTML page and its resources are 
structured. You will learn the basics of how these resources interact, and how
your JavaScript can manipulate them. You'll also learn a little bit about
testing your code. Basic testing will use Jasmine as that will run in your
browser and requires no other downloads like node.js or selenium. 

I will try to explain as much as I can along the way. There may be some 
concepts that you'll just have to take as further research points from this 
experience. This is really just a primer. 

# Structure

We will, eventually, divide up the code by directories, so we have HTML in this
directory, Javascript in its own `js` directory, Cascading Style Sheets in a
`css` directory, images in an `images` directory, and we'll push tests into a 
`test` directory.

```
-README.md
-hello.html
-hellos.html
-js/
  |-names.js
-css/
  |-hello.css
-images/
  |-hello_my_name_is.png
-test/
  |-jasmine/
     |-SpecRunner.html
     |-lib/ # contains jasmine code
     |-spec/
```

# Method

If you would like, you can check out this repository. It will come down in 
its completed form. You can wind back the source for each step by checking out 
the tags related to each step. Checking out step0 will have you ready to start
step1.

# The Tutorial

Each general step will have its own heading. 

## Step 1 - Adding our Image

Images are normally specifiec using an img tag, e.g.,

```
<img src="images/hello_my_name_is.png" />
```

*Note*: the image used here came from [wikimedia commons](https://commons.wikimedia.org/wiki/File:Hello_my_name_is_sticker.svg)

However, we eventually want to write on the image and since the JavaScript we
will be writing manipulates the HTML and not the actual image, we are going to
use a trick of layering HTML on top of the image so it looks as one. The best
way to do that is to make the image the background of a block section of the
HTML page. A `div` tag is the best way to do this. We will style that div tag
with CSS.

1. Open hello.html in a text editor:

   ```
   <html>
     <head>
       <title>hello my name is</title>
     </head>
     <body>
       <img src="images/hello_my_name_is.png" height="143px" width="200px" />
     </body>
   </html>
   ```

   ![basic image reference](doc/hello1.png)

## Step 2 - Making our image writeable.

1. We want to, eventually, programmatically write on the image, so to do that
   we will need to layer on top of it. The best way to do so is to make it a
   background image. We're going to do that with CSS. Add a style attribute to the
   head. As well, create a div in the body and give it the class of `tag`
   ```
   <html>
    <head>
      <title>hello my name is</title>
      <style>
        .tag {
          height: 200px;
          background-image: url("images/hello_my_name_is.png");
          background-size: 200px 143px;
          background-repeat: no-repeat;
          background-position: center;
          font-family: "courier",monospace;
        }
        .tag h1 {
          padding-top: 100px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="tag">
        <h1 id="nametag_text">world</h1>
      </div>
    </body>
  </html>
  ```
  Save `hello.html` and refresh the page in your browser:

  ![div with background image and world written on it](doc/hello2.png)

  Look at that! Now, we have text superimposed on the image.

## Step 3 - Making our page interactive

1. We want the page to be interactive, and want the user to be able to input some
   data with which our page can interact. The best way to do that is with a form. 
   Let's add a form to the page just beneath the body tag:
   ```
   <body>
     <form>
       <label for="helloname">What's your Name?</label>
       <input type="text" name="helloname" id="name" />
       <input type="button" onclick="alert(this.form.helloname.value)" value="say hello"/>
     </form>
   ```

   ![the form](doc/hello3.png)

   Pass the form's `helloname` field to the alert method. (alert is a built in 
   javascript method on all browsers and can be a good tool during development. It
   sucks in production, though, so don't leave alerts in real code.)

   Save hello.html, refresh your browser, type a name in the form and click the
   "say hello" button:

   ![the form](doc/hello4.png)

   Yeah! Getting somewhere.

## Step 4 - On to some JavaScript

1. This doesn't do much more than flash what you type in a browser alert box, so
   let's get set up to do something more meaningful, let's create our own 
   javascript function and call it instead. 
   
   Add this to the `head` region of your page:
   ```
    <script> 
      function nameIt(nameVal) {
        alert(nameVal);
      }
    </script>
   ```

   We have written a JavaScript function that takes one argument (arguments
   are passed in the parentheses). Arguments are how you pass information (or context)
   from where the user action occurs to where you are going to use it. Inside the 
   function, you use the argument by name to reference it. Notice, now we 
   alert `nameVal` instead of the form


1. To enable this, change your form to call the new `nameIt` function you created
   ```
    <form>
      <label for="helloname">What's your Name?</label>
      <input type="text" name="helloname" id="name" />
      <input type="button" onclick="nameIt(this.form.helloname.value)" value="say hello"/>
    </form>
   ```

   It still does the same thing, but now it does it through your function! Save 
   hello.html, refresh your browser, type a name in the form, and click the
   "say hello" button, again.

   ![the form](doc/hello4.png)

   You should see the alert, again. If you do not, check your capitalization. If you
   try to `alert(nameval)` when you used `nameVal` for an argument name in your
   function declaration, you will not see anything happen in your browser window, 
   but you can probably figure out the problem if you look in the javascript 
   console. 
   
   If you are using a modern version of Internet Explorer, Firefox, or 
   Chrome, you have access to developer tools, which are *extremely* handy. Here's
   how to open Chrome's tools:

   open the `developer tools`

   ![find the developer menu](doc/hello-error-open-console.png)

   look in the `console`

   ![the error in the console](doc/hello-error-console.png)

   Were you able to fix the problem? *phew!*

## Step 5 - More meaningful JavaScript

1. Now that we have the form calling your function, we can make it do something
   interesting! From JavaScript, we can manipulate the Document Object Model that
   represents the page we are running in. You can get a reference to an element
   by its `id`, so this is why we had you add the id of *nametag_text* to our h1 tag
   `<h1 id="nametag_text">world</h1>`. We can now use the id of `nametag_text` 
   to get the section we want to manipulate. Once we have that reference, we 
   can set its textContent value
   ```
    <script> 
      function nameIt(nameVal) {
        var theNode = document.getElementById("nametag_text");
        theNode.textContent = nameVal;

        return true;
      }
    </script>
   ```

   *Note*: in case your JavaScript code ran smoothly earlier and you didn't 
   have to debug things, this is a reminder that in JavaScript, case matters! 
   `nameVal` and `nameval` do not refer to the same things.

   Reload your page in your browser and you should now be able to manipulate
   the text that appears to be written in the hello-my-name-is sticker.

## Step 6 - Breaking up the monolith - external CSS

1. Projects get bigger and you will need to share JavaScript and CSS across many
   pages. To do this, you want to put them into their own files. Let's start with
   the style information. Create a new directory called `css` and create a file 
   called `hello.css` in there. 

1. Open hello.css in an editor and copy everything in your style tags into 
   hello.css
   ```
    .tag {
      height: 200px;
      background-image: url("images/hello_my_name_is.png");
      background-size: 200px 143px;
      background-repeat: no-repeat;
      background-position: center;
      font-family: "courier",monospace;
    }
    .tag h1 {
      padding-top: 100px;
      text-align: center;
    }
   ```
   Note: do not include the style tag in your CSS file, it is HTML and not valid
   CSS.

1. Now edit `hello.html` again and delete your existing `<style>...</style>` 
   tag and its content. Replace it with a reference to your new stylesheet:
   ```
     <link rel="stylesheet" type="text/css" href="css/hello.css"/>
   ```

   Reload hello.html in your browser and.... *hey what's going on?* I 
   suspect you can't see your image anymore. That's because I oversimplified
   my earlier instructions. 

1. Instead of just giving you the answer, let's head
   back to the console in the Developer tools:
   
   ![the css error in the console](doc/hello-error-css.png)

   Notice that it is looking for `hello_my_name_is.png` in an images directory 
   within the css directory. That's not where it is! To fix this you could move
   your images to be below your css folder, but that's an atypical directory 
   structure. You should have your images directory as a sibling to your css
   directory. 
   
1. The image reference in the style info for the `tag` class is different 
   based on where it is used. Since it was originally 
   written in hello.html, the path to hello_my_name_is.png is relative to the
   html page `background-image: url("images/hello_my_name_is.png");` however,
   now that this is in the CSS file (in a different directory) you need to 
   change the image reference:

   ```
    background-image: url("../images/hello_my_name_is.png");
   ```

   We've now moved your CSS into its own file and when we create a new page 
   later, we wil be able to share the CSS code in that page. This is the DRY
   principle, Do not Repeat Yourself. The thing to watch for is when you see 
   yourself starting to copy code for reuse, you should look to find a way
   to write it once and share it. 

## Step 7 - Breaking up the monolith - external JavaScript

1. Speaking of sharing, let's get that Javascript moved into its own file. 
   Make a directory in our project folder called `js` and write a blank file 
   in there named `names.js`

   I create blank files from my terminal window like this `touch js/names.js`. 
   If you're on mac or linux you can do this too. 
   
   Now, open both js/names.js and hello.html up in your text editor and cut 
   the text out of the `<script></script>` tags (not including the script tags, 
   themselves as they are HTML and not valid JavaScript). Now, switch to your 
   `names.js` file and paste the contents of your clipboard into it:
   ```
   function nameIt(nameVal) {
     var theNode = document.getElementById("nametag_text");
     theNode.textContent = nameVal;
   
     return true;
   }
   ```

   Save `names.js` 

1. Now you should have a proper javascript file, but your page won't run the
   code as we need to change the page so it knows about the new script file.

   Switch over to editing hello.html and find the existing empty script tags:
   ```
   <script></script>
   ```

   To look like this:
   ```
   <script src="js/names.js"> </script>
   ```

   Now, the extremely observent people in the group will have noticed that 
   this looks different than our css link tag, which we were able to create as
   an "empty" html tag, which means a tag that won't have anything nested within
   it, (hence empty) and there is a shortened syntax for that `<foo />`, which
   is, functionally the same as `<foo></foo>` but a little shorter to type. The
   *script* tag, however, does not get this advantage. If you try to create 
   your script tag as an empty tag, your page doesn't render properly (at 
   least in the chrome browser).

   Save hello.html and refresh your browser, it should work the same as it 
   did before. You, now, have a well separated project and things are 
   starting to look kind of professional!

# Advanced Topics 

You understand a lot about the structure of an HTML project, but there are a 
few more things to understand that will be helpful:

* Testing
* Evolving the example
* Deployment

I will introduce you to testing and we will add a slightly more sophisticated
version of our lession. 

However, I am not going to walk you through deployment 
as an example. Deployment will depend upon your hosting situation. You will 
want to understand tools like scp, rcp, sftp, oh my! You'll need to pre-process 
your javascript files (uglify, minify) for production. Then, you only want to 
put the files needed for the website into production, so you want to avoid 
deploying your tests and any documentation to the production site. 

As well, once you've decided how you'll deploy, there are a number of tools
and scripting languages to automate deployment. One of the best tools for 
automating the processing and deployment of static websites is 
[gulp](http://gulpjs.com/). 

Anyway... on to testing and the next steps of the example!

## Step 8 - Testing your JavaScript

Ahh, testing. This is super important when a project lives over a long
period of time. It's extremely easy to forget what behavior you meant to 
implement, the last time you were in the code, when you're working on a
project by yourself. It's even _more_ difficult if you are working on a project
with someone else. Sharing code can be difficult, so it's a good idea to 
have executable definitions of what you belive properly functioning code is.

To do this, you should add tests. There are a ton of different ways you can
add tests. I'm going to walk you through one way of doing it: 
[Jasmine](http://jasmine.github.io/). Jasmine was simple to add here, 
because we'll include the jasmine code right in this project, make a small 
test file, and run that file by opening it in the browser. It will just test
the javascript we execute in the test. This is a unit test. If, instead, we 
want to test our HTML page (a functional test) you can use 
[Selenium](http://www.seleniumhq.org/). There are multiple ways to execute
selenium tests, but you need a lot of external dependencies to execute that
I chose not to show you that, here. 

What I want you to understand is that **tests are important** and not very
difficult to add to your project, so keep following this!

1. If you've brought this down locally using git, you've had a 
   directory named `test` in your source tree the whole time. Now we're going
   to use it. I have included a copy of Jasmine's source. If you are starting
   a new project, download a new copy. To add a jasmine test, create the 
   `spec` directory under the `test/jasmine` directory, e.g., from the top of 
   the project directory, 
   ```
   mkdir test/jasmine/spec
   ``` 
   
   the `test/jasmine` directory should contain the jasmine source code

1. Create a test Runner HTML file to execute your Jasmine tests. This file 
   brings together the jasmine libraries for running your tests, all of 
   your source files and all of your tests (specs). Create 
   `test/jasmine/SpecRunner.html` and add the following content:

   ```
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Jasmine Spec Runner v2.4.0</title>
      <link rel="shortcut icon" type="image/png" href="lib/jasmine-2.4.0/jasmine_favicon.png">
      <link rel="stylesheet" href="lib/jasmine-2.4.0/jasmine.css">
      <script src="lib/jasmine-2.4.0/jasmine.js"></script>
      <script src="lib/jasmine-2.4.0/jasmine-html.js"></script>
      <script src="lib/jasmine-2.4.0/boot.js"></script>
    
      <!-- include source files here... -->
      <script src="../../js/names.js"></script>
    
      <!-- include spec files here... -->
      <script src="spec/names_spec.js"></script>
    
    </head>
    
    <body>
    </body>
    </html>
   ```
   
   We are going to test our js/names.js javascript file you need to add a
   reference to it that is relative to SpecRunner.html. As well, you need a 
   reference to your test file. I'm going to have you create names_spec.js 
   in a subdirectory called spec, so add that now. 

1. Now, let's create the test file. Create `test/jasmine/spec/names_spec.js` and 
   open it in a text editor. Then, paste in the following code:

   ```
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
   ```

   **wait what?**

   I know that's a lot of code and I will explain some of it in a moment. First,
   let's see your test run!

1. Open SpecRunner.html in your browser. If everything is set up right, the test
   should pass and you should see something like this:

   ![whoooop, whooooop, passing tests!](doc/hello-passing-jasmine.png)

1. Now, just to make sure our test is doing something, let's make it fail. One
   way would be to change what the test is looking for, but, instead, I'm going 
   to recommend you break the JavaScript. 

   Open names.js in a text editor and change the DOM id that the nameIt function
   is looking for:

   Passing

   ```
   function nameIt(nameVal) {
     var theNode = document.getElementById("nametag_text");
     theNode.textContent = nameVal;
   
     return true;
   }
   ```

   Failing
   ```
   function nameIt(nameVal) {
     var theNode = document.getElementById("xnametag_text");
     theNode.textContent = nameVal;
   
     return true;
   }
   ```

   Subtle change, I'm sure, but I changed nametag_text to **xnametag_text** so
   now the test fails

   ![boooo, failing test!](doc/hello-failing-jasmine.png)

### Picking apart the test code

This syntax is Jasmine, which is a JavaScript DSL (Domain Specific Language) 
for writing unit tests. (I know, they claim to be BDD, but most people really 
write unit tests despite claiming to be testing behavior with this tool. Any 
time you test in isolation, you are testing a unit, even if you can describe the 
intended behavior with rich, human-readable language, like we do in Jasmine. If 
you want to do true BDD on browser-based projects, look into driving 
[Selenium](http://www.seleniumhq.org/) with Jasmine, or use 
[Mocha](https://mochajs.org/) with the excellent 
[chai JavaScript assertions](http://chaijs.com/) to drive your browser through 
Selenium. The deal is, if you're not testing it the way your user experiences it, 
you're not testing behavior.) I'm not just picking on BDD here, it's really just
funny how people will latch on to a name for something even if they aren't doing
it. Some people use well-known unit testing frameworks to drive behavioral or 
integration tests and they call them unit tests, despite needing a huge 
dependency chain configured and running just to support the tests. 

The point is, you are testing what you are testing, and testing is a good thing, 
so don't get caught up in the name of your tooling. You chose the tooling, 
hopefully, because it makes you productive and not because of an industry 
buzzword. 

Anyway, enough controversial topics for the day. Let's deconstruct the Jasmine 
code so you can benefit from what we've done here.

While this is the Jasmine DSL, the general concepts will apply to most 
unit testing frameworks.

On the first line we call a jasmine function named `describe` and we pass a 
string and a function to it. The string shows up in our test output

```
describe("names", function() {
```

![names](doc/hello-jasmine-display-names.png)

The function encapsulates all of the rest of the code for the test. 

Before we get to the actual test, let's get the housekeeping steps covered. 
Notice there are two methods being called: `beforeEach` and `afterEach`. Most 
unit testing frameworks have methods the will run to set up and tear down for 
each of the tests in their scope. That's what these do.

In my implementation, I am creating the DOM elements that my nameIt function 
interacts with when it is added to an html page in the `beforeEach` method. 
This way, when it tests my method, all the right pieces will be in place:

```
  beforeEach(function() {
    testNode = document.createElement("div");
    testNode.setAttribute("id","nametag_text");
    document.body.appendChild(testNode);
  });

```

If you are running multiple tests, you also want to clean up after yourself 
before running a new test or else you cannot really trust the results. Some 
engineers will try to write progressive tests that build upon the results of 
previous tests. These can be very brittle and hard to maintain. Some purists 
will tell you that you're doing it wrong if you do it that way. I will say that
I try to avoid doing that, but people have their reasons, sometimes it's for
performance (setup and teardown can take a lot of time), and sometimes it's 
because they're black-box testing and cannot change the code, but, in reality 
sometimes it's for misguided reasons. Heck... there are worse sins than 
testing, such as, NOT TESTING!

Oh yeah, I digress... I'm using `afterEach` to wipe out the div I create in 
`beforeEach`, so the DOM will be clean for the next test I write:

```
  afterEach(function() {
    var toDel = document.getElementById("nametag_text");
    toDel.parentElement.removeChild(toDel);
  });
```

Now on to the actual test.

```
  it("should set the `nametag_text` node's content", function() {
    var testVal = "foo";
    nameIt(testVal);
    expect(document.getElementById("nametag_text").textContent).toEqual(testVal);
  });
```

We call the `it` method. Yeah... `it`. Seems weird, but stick with me. Remember,
we are in a `describe` method for something we called "names" and we are going 
to call `it` and supply that with a descriptive phrase. Try to read this as a
sentence. Describe "names" it "should set the nametag_text node's content".
See? Then in that test (encapsulated in a JavaScript function) we set the 
variable `testVal`, pass it to our nameIt function as an argument, and we 
describe our expectation:

```
    expect(document.getElementById("nametag_text").textContent).toEqual(testVal);
```

We, expect the "nametag_text" node's text to equal the value we passed into our 
nameIt function. That string we pass into the `it` method as our first argument 
is displayed in the test results page in your browser:

![names](doc/hello-jasmine-display-should.png)

So, you should be able to find your results, easily. As well, if you do a nice 
job of writing accurate and descriptive messages, you can share these results 
with non-technical (or slightly-less-technical) people who are involved with 
your project. They can look at your tests and understand the behavior you have 
described. Some people would say the behavior of your code, but, in reality, if
you write poor or inaccurate descriptions, they won't know what it's really 
doing. 


