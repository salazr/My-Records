My Records (discogs client)
==================================

![Screenshot](https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/542833_10151410091917287_2066860662_n.jpg)

[Website](http://salazarstudios.com/myrecords)

##Description
This is a discogs client designed to display users' collections.

It's currently in development by [josue](http://josuesalazar.net).

##Future features
-grouping by genre, and other filters
-zooming in to a record when double clicking
-playing a video/audio clip somehow after a click
-more than 100 at a time
-style tweaks (fitting full album titles better) 

 
Tech: backbone.js, require.js, jquery, bootstrap, jasmine, node, three.js, tween.js, trackballgestures, css3drenderer
<br />Credits: three.js css3d periodic table demo

###Running this locally
   1. Download and install [Node.js](http://nodejs.org/#download)
   2. Clone this repository
   3. On the command line, type `npm install nodemon -g` to install the [nodemon](https://github.com/remy/nodemon) library globally.  If it complains about user permissions type `sudo npm install nodemon -g`.
   3. On the command line, navigate to inside of the **My Records** folder and type `npm install`
   4. Next, type `nodemon` (this will start your Node.js web server and restart the server any time you make a file change thanks to the wonderful  library)
   5. To view the demo page, go to `http://localhost:8001`
   6. To view the Jasmine test suite page, go to `http://localhost:8001/specRunner.html`
   7. Enjoy using Backbone, Require, Lodash, Almond, jQuery, jQueryUI, jQuery Mobile, Twitter Bootstrap, and Jasmine (enjoyment optional)


####Credit
Greg Franko for the Backbone.js Require.js Boilerplate
<br />THREE.js project for the scene frameworks and renderers

##### License
Copyright (c) 2013 Josue Salazar
Licensed under the MIT license.		
		  

	

