// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/Record", "views/User", "collections/Collection"],
        
    function($, Backbone, Record, User, Collection) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                
                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new User();

            }
    
        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);