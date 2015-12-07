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
