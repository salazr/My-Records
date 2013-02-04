// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var User = Backbone.Model.extend({

		    	initialize: function(args) {
		    		// console.log(args);
		    		this.user_agent = "MyRecords/1.0 +http://myrecords.com";
					this.url = "http://api.discogs.com/users/"+ args.username +"";


		    	},

		     
		      sync: function(method, model, options){  
			    options.timeout = 10000;  
			    options.dataType = "jsonp";  
			    return Backbone.sync(method, model, options);  
			  },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return User;

    }

);
