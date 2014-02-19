var app = app || {};

(function () {

  app.FavoriteLocation = Backbone.Model.extend({

    initialize: function() { 
      this.on('marker_mouseover',this.marker_mouseover);
      this.on('marker_mouseover',this.marker_mouseout);
    },

    marker_mouseover: function() {
      if (!!this.marker) {
        this.marker.setIcon(this.marker_url('6975FF'));
      }
    },

    marker_mouseout: function() {
      if (!!this.marker) {
        this.marker.setIcon(this.marker_url())
      }
    },

    marker_url: function(color) {
      if (!color) { color = 'FE7569' }
      return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•|"+color
    }

  });

  app.FavoriteLocations = Backbone.Collection.extend({
    model: app.FavoriteLocation,
    url: '/api/favorites'
  });


  app.favorite_locations = new app.FavoriteLocations();

})();