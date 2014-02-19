var app = app || {};

(function () {

  app.FavoriteLocationRouter = Backbone.Router.extend({

    routes: {
      "":                 "index",
      "favorites":        "index",
      "favorites/:id":    "show"
    },

    index: function() {
      var favorites_index_view = new app.FavoritesIndexView({ collection: app.favorite_locations });
      $("#content").html(favorites_index_view.render().el);
      app.favorite_locations.fetch();
    },

    show: function(id) {
      var favorites_show_view = new app.FavoritesShowView({ collection: app.favorite_locations.where({ "id": id }) });
      $("#content").html(favorites_show_view.render().el);
      app.favorite_locations.where({ "id": id }).fetch(); 
    }

  });

})();
