// Collection.js
// -------------
define(["jquery","backbone","models/Record"],

  function($, Backbone, Record) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({

    	initialize: function(args) {
    		this.username = args;
    		this.user_agent = "MyRecords/1.0 +http://myrecords.com";
			this.url = "http://api.discogs.com/users/"+ this.username +"/collection/folders/0/releases?page=1&per_page=100";


    	},

      model: Record,
     
      sync: function(method, model, options){  
	    options.timeout = 10000;  
	    options.dataType = "jsonp";  
	    return Backbone.sync(method, model, options);  
	  }  

    });

    // Returns the Model class
    return Collection;

  }

);