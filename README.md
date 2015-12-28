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
  |-hellos.js
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

1. We want the page to be interactive and want the user to be able to input some
   data that we can interact with. The best way to do that is with a form. Let's
   add a form to the page:
   ```
  <body>
    <form>
      <label for="name">What's your Name?</label>
      <input type="text" name="name" id="name" />
      <input type="button" onclick="alert(this.form.name.value)" value="say hello"/>
    </form>
   ```

   Pass the form's `name` field to the alert method. (alert is a built in 
   javascript method on all browsers and can be a good tool during development. It
   sucks in production, though, so don't leave alerts in real code.)

1. This doesn't do much more than flash what you type in a browser alert box, so
   let's do something more meaningful, let's create our own javascript function
   add this to the `head` region of your page:
   ```
    <script> 
      function nameIt(nameVal) {
        alert(nameVal);
      }
    </script>
   ```

   We have written a JavaScript function that takes one argument (arguments
   are passed in the parentheses). Inside the function, you use the argument by
   name.

1. To enable this, change your form to call the new `nameIt` function you created
   ```
    <form>
      <label for="name">What's your Name?</label>
      <input type="text" name="name" id="name" />
      <input type="button" onclick="nameIt(this.form.name.value)" value="say hello"/>
    </form>
   ```

   It still does the same thing, but now it does it through your function! Save 
   your file and try it in your browser.

1. Now that we have the form calling your function, we can make it do something
   interesting! From JavaScript, we can manipulate the Document Object Model that
   represents the page we are running in. You can get a reference to an element
   by its `id`, so this is why we had you add `<h1 id="nametag_text">world</h1>`.
   We can now use the id of `nametag_text` to get the section we want to 
   manipulate. Once we have that reference, we can set its textContent value
   ```
    <script> 
      function nameIt(nameVal) {
        var theNode = document.getElementById("nametag_text");
        theNode.textContent = nameVal;

        return true;
      }
    </script>
   ```

   Note: in your JavaScript code case matters! `nameVal` and `nameval` do not refer
   to the same things.

   Reload your page in your browser and you should now be able to manipulate
   the text that appears to be written in the hello-my-name-is sticker.

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
   my earlier instructions. The image reference in the style info for the
   `tag` class is different based on where it is used. Since it was originally 
   written in hello.html, the path to hello_my_name_is.png is relative to the
   html page `background-image: url("images/hello_my_name_is.png");` however,
   now that this is in the CSS file (in a different directory) you need to 
   change the image reference:
   ```
    background-image: url("../images/hello_my_name_is.png");
   ```




