var app = app || {};

(function () {

  app.FavoritesMapView = Backbone.View.extend({

    tagName: "div",

    className: "favorites_map_view",

    // template: _.template(
    //   "<input class='name' type='text' value='<%- name %>'></input>"+
    //   "<input class='address' type='text' value='<%- address %>'></input>"+
    //   "<p><%- lat %>,<%- lon %></p>"+
    //   "<div class='delete'></div>"
    // ),

    // events: {
    //   "keypress .name":          "update",
    //   "keypress .address":       "update",
    //   "click .delete":           "destroy"
    // },

    initialize_map: function() {
      var self = this;

      this.map = new google.maps.Map(this.el, {
        zoom: 10,
        center: new google.maps.LatLng(0, 0)
      });

      var bounds = new google.maps.LatLngBounds();

      this.collection.each(function(model){
        var latlng = new google.maps.LatLng( model.get('lat'), model.get('lng') );
        model.marker = new google.maps.Marker({
          position: latlng,
          map: self.map,
          title: model.get('name'),
          icon: model.marker_url()
        });

        bounds.extend(latlng);
      });

      this.map.fitBounds(bounds);
    },

    initialize: function() {
      
      if (this.collection) {
        // theres more than one point
        // this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.collection, "remove", this.render);
        this.listenTo(this.collection, "sync", this.render);
      }
      else {
        // only one point
        this.listenTo(this.model, "sync", this.render);
      }

      return this;
    },

    render: function() {
      this.initialize_map();
      return this;
    }

  });

})();