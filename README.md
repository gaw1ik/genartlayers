# Intro
Genartlayers is an app which brings the modern digital art application experience to generative art. Genartlayers transforms your web browser into a generative art powerhouse, providing an environment for coding and manipulating your own generative art algorithms with the modern utilities of a digital art program. 

# If it's your first time using the app (and you want a quick tour):
Click the little [1] on the right side of the window. This will open up Layer 1 of the default project. This project is just an example, but it's pretty fun to mess around with! Move the sliders around and see what happens to the art. 

Once you've had your fill of that, click on the 'Code' tab to see the code that is making this art. You'll notice that there are two code editors. The one on the top is for making parameters (the things that you can control in the Controls tab) and the one on the bottom is the "drawFunction" which is the code that tells genartlayers how to draw your art. You can edit the code in both of these editors to tweak the example algorithm or make an entirely new one. 

You'll notice there are two layers in the default project: layer 0 and layer 1. Layer 0 contains a simple algorithm for drawing a background. You can change it's color. Genartlayers utilizes layering so that algorithms can be handled independently.



# To make your own algorithms:
Select a layer from the right panel (e.g. [1] or [0]), and then click the Code tab. This will open up the code editors.

The editor on the top is for Parameters which are variables you can control (like hue, width, etc), and the editor on the bottom is the Draw Function, which is the code that tells genartlayers how to draw your art.

### Parameters
Parameter controls (like sliders and numeric inputs) are created automatically in the Controls panel when they are defined in the Parameters editor. Parameters can then be used as variables anywhere in the drawFunction and they take on the value of the control allowing you to easily manipulate your algorithms! Take note of the syntax used for the parameters in the example. Be careful and _exact_ with the syntax. Also notice that you can create headers to help organize your control panel.

### drawFunction
The drawFunction is the code that tells genartlayers how to draw your art. Code in genartlayers is written in javascript, but there are many simplifications and included functions provided to you in genartlayers which are discussed below.

Poke around in the examples a bit to see how things get drawn. There's a lot of code in there, but everything comes down to drawing simple shapes including rectangles, circles, and paths. 

Generally speaking, you should declare variables using var as follows. This will keep these variables exclusive to the layer they are on.

```javascript
var hue = 50;
var height = 0.3;
var dog = 1;
```
You can declare global variables as well and use those across layers, but things can get potentially confusing if you declare global variables unintentionally.
```javascript
hue = 50;
height = 0.3;
dog = 1;
```

## Basic shape functions:
Below are the current set of basic shape functions in genartlayers. 

~*Note that the units for location  (x,y) and dimensions  (width, height, radius) are normalized to the artBoard dimensions. For example, x=0.5, y=0.5 will place a shape in the middle of the artBoard.*

~*fillMode is a value 0 (for fill) or 1 (for stroke)*

~*Ranges for color values are as follows...*

*__Hue__: 0-359*

*__Saturation__: 0-100*

*__Lightness__: 0-100*

*__Alpha__: 0-255*

### Rectangle
```javascript
drawRect(x, y, width, height, lineWidth, hue, saturation, lightness, alpha, fillMode)
```
### Circle
```javascript
drawCircle(x, y, radius, lineWidth, hue, saturation, lightness, alpha, fillMode)
```
### Ellipse
```javascript
drawEllipse(x, y, radX, radY, rotation, lineWidth, hue, sat, lit, alpha, fillMode)
```
### Path
```javascript
drawPath(path, lineWidth, hue, saturation, lightness, fillMode, close)
```
### Arc
```javascript
drawArc(x, y, radX, radY, rotation, startAngle, endAngle, lineWidth, hue, sat, lit, alpha, fillMode) 
```
### Text
```javascript
drawText(text, x, y, fontSize, hue, sat, lit)
```

## Saving Algorithms and Projects
After you make changes to your code, hit the SaveCode button to implement them. Make sure you give your code a unique name in the text field above the editors. The layer that the code is on should redraw immediately unless there's an error in your code. Pro-tip: open your browser's console (ctrl+shift+i) to debug while you code. The browser console is awesome, and it's where everyone debugs Javascript.

*You should also save your projects.* A project is a collection of all the layers, algorithms, and parameter values that you have defined for a particular generative art piece. To save a project, give it a name in the text field located top-left next to "Project:" and hit Save. When you return to genartlayers, type in your project's name and hit Open.

Genartlayers uses your browser's local storage, so as long as you're accessing genartlayers from the same computer and same internet browser, you can return to your files and pick up where you left off.

## Exporting images
I will add some buttons for this later, but for now, if you want to export an image of your piece type exportImg(width) into your browser's console and hit enter. "width" is the width of the image in pixels you desire.

Example: 
```javascript 
exportImg(2048)
```
It might be helpful to do some math inside the function, like... If I want to export a 12 x 12 inch piece at 300 DPI I could do....
```javascript 
exportImg(12*300)
```
Your browser should prompt you to download your image.

## Advanced features
Coming soon.

# Future Work
I will provide more documentation soon, but hopefully if you're here, this can get you started. Please feel free to DM me on @genartlayers on instagram at any time if you have any questions about how to do something in this application. I am here to answer your questions!

-Brian

