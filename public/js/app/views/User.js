// View.js
// -------
define(["jquery", "backbone", "models/Record", "models/User", "collections/Collection", "text!templates/Records.html",  "THREE", "tween", "TrackballControls", "CSS3DRenderer"],

    function($, Backbone, Record, Authenticated_User, Collection, template){

        var User = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            user: 'salazr',
            page: '1',

            // View constructor
            initialize: function() {

                _.bind('render', 'updateUser', this);
                var view = this;

                //Update user on init
                view.updateUser();


                
                //Wire up form
                $('form button[type="submit"]').on('click',function(event){
                    event.preventDefault();


                    if ($('form input').val() !== '') {

                            $('.example').html('');
                            $('h1').html('Loading...')
                    
                            view.user = $('form input').val();
                           
                            view.updateUser();


                   }

            })


            },

            // View Event Handlers
            events: {

            },

            updateUser: function(){
                var view = this;
                // Get User's Collection  with hard coded username
                this.collection = new Collection(view.user);

                // console.log(this.collection)

                this.collection.fetch({ 
                                success: function(c,response){
                                    // console.log(c.models[0])
                                    // Calls the view's render method
                                    view.render(c.models[0].attributes.data.releases);

                                    var Auth_User = new Authenticated_User({username: view.user});

                                    // Auth_User.username = 'salazr'
                                    // console.log(Auth_User)
                                    Auth_User.fetch({ 
                                                    success: function(c,response){
                                                        // console.log(response)
                                                        // Calls the view's render method
                                                        $('header h1').html("" + response.data.name + " has " + response.data.num_collection + " records, here's 100 of them");

                                                        // $('.example > h3').html("These are the newest records.")

                                                    }, 
                                                    error: function(c,response){
                                                        console.log(response)

                                                    }  

                                    });  



                                }, 
                                error: function(c,response){
                                    console.log(response)

                                } 
                 });  
            },

            // Renders the view's template to the UI
            render: function(data) {


              // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);



                var table = data;

                    var camera, scene, renderer;
                    var controls;

                    var objects = [];
                    var targets = { sphere: [],  table: [], helix: [], grid: [] };

                    init();
                    animate();

                    function init() {

                        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
                        camera.position.z = 1800;

                        scene = new THREE.Scene();

                        for ( var i = 0; i < table.length; i ++ ) {
                            // console.log(table[i]);
                            var item = table[ i ].basic_information;
                            // console.log(item);
                            var element = document.createElement( 'div' );
                            element.className = 'element';
                            element.style.backgroundColor = 'rgba(51,0,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

                            var number = document.createElement( 'div' );
                            number.className = 'number';
                            number.innerHTML = "" + item.artists[0].name + ": <br /> " + item.title + "";
                            element.appendChild( number );

                            var symbol = document.createElement( 'div' );
                            symbol.className = 'symbol';
                            symbol.innerHTML = "<img src='" + item.thumb + "' />";
                            element.appendChild( symbol );

                            // var details = document.createElement( 'div' );
                            // details.className = 'details';
                            // details.innerHTML = item.title;
                            // element.appendChild( details );

                            var object = new THREE.CSS3DObject( element );
                            object.position.x = Math.random() * 4000 - 2000;
                            object.position.y = Math.random() * 4000 - 2000;
                            object.position.z = Math.random() * 4000 - 2000;
                            scene.add( object );

                            objects.push( object );

                        }



                        // sphere

                        var vector = new THREE.Vector3();

                        for ( var i = 0, l = objects.length; i < l; i ++ ) {

                            var phi = Math.acos( -1 + ( 2 * i ) / l );
                            var theta = Math.sqrt( l * Math.PI ) * phi;

                            var object = new THREE.Object3D();

                            object.position.x = 1000 * Math.cos( theta ) * Math.sin( phi );
                            object.position.y = 1000 * Math.sin( theta ) * Math.sin( phi );
                            object.position.z = 1000 * Math.cos( phi );

                            vector.copy( object.position ).multiplyScalar( 2 );

                            object.lookAt( vector );

                            targets.sphere.push( object );

                        }

                        // table

                        for ( var i = 0; i < objects.length; i ++ ) {

                            var item = table[ i ];

                            var object = new THREE.Object3D();
                            object.position.x = (  160 ) - 1540;
                            object.position.y = - (  200 ) + 1100;

                            targets.table.push( object );

                        }


                        // helix

                        var vector = new THREE.Vector3();

                        for ( var i = 0, l = objects.length; i < l; i ++ ) {

                            var phi = i * 0.175 + Math.PI;

                            var object = new THREE.Object3D();

                            object.position.x = 1100 * Math.sin( phi );
                            object.position.y = - ( i * 8 ) + 450;
                            object.position.z = 1100 * Math.cos( phi );

                            vector.copy( object.position );
                            vector.x *= 2;
                            vector.z *= 2;

                            object.lookAt( vector );

                            targets.helix.push( object );

                        }

                        // grid

                        for ( var i = 0; i < objects.length; i ++ ) {

                            var object = new THREE.Object3D();

                            object.position.x = ( ( i % 5 ) * 400 ) - 800;
                            object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
                            object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

                            targets.grid.push( object );

                        }

                        //

                        renderer = new THREE.CSS3DRenderer();
                        renderer.setSize( window.innerWidth, window.innerHeight );
                        renderer.domElement.style.position = 'absolute';
                        document.getElementById( 'container' ).appendChild( renderer.domElement );

                        //

                        controls = new THREE.TrackballControls( camera, renderer.domElement );
                        controls.rotateSpeed = 0.5;
                        controls.addEventListener( 'change', render );

                        // var button = document.getElementById( 'table' );
                        // button.addEventListener( 'click', function ( event ) {

                        //     transform( targets.table, 2000 );

                        // }, false );

                        var button = document.getElementById( 'sphere' );
                        button.addEventListener( 'click', function ( event ) {

                            transform( targets.sphere, 2000 );

                        }, false );

                        var button = document.getElementById( 'helix' );
                        button.addEventListener( 'click', function ( event ) {

                            transform( targets.helix, 2000 );

                        }, false );

                        var button = document.getElementById( 'grid' );
                        button.addEventListener( 'click', function ( event ) {

                            transform( targets.grid, 2000 );

                        }, false );

                        transform( targets.helix, 5000 );

                        //

                        window.addEventListener( 'resize', onWindowResize, false );

                    }

                    function transform( targets, duration ) {

                        TWEEN.removeAll();

                        for ( var i = 0; i < objects.length; i ++ ) {

                            var object = objects[ i ];
                            var target = targets[ i ];

                            new TWEEN.Tween( object.position )
                                .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                                .easing( TWEEN.Easing.Exponential.InOut )
                                .start();

                            new TWEEN.Tween( object.rotation )
                                .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                                .easing( TWEEN.Easing.Exponential.InOut )
                                .start();

                        }

                        new TWEEN.Tween( this )
                            .to( {}, duration * 2 )
                            .onUpdate( render )
                            .start();

                    }

                    function onWindowResize() {

                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();

                        renderer.setSize( window.innerWidth, window.innerHeight );

                    }

                    function animate() {

                        requestAnimationFrame( animate );

                        TWEEN.update();
                        controls.update();

                    }

                    function render() {

                        renderer.render( scene, camera );

                    }










  
                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return User;

    }

);