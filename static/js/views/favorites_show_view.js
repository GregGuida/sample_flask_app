var app = app || {};

(function () {

  app.FavoritesShowView = Backbone.View.extend({

    tagName: "div",

    className: "favorites_show_view",

    initialize: function() {
      this.favorite_view = new app.FavoritesListView({ model: this.model });
      this.favorites_map_view = new app.FavoritesMapView({ model: this.model });
      return this;
    },

    render: function() {
      this.$el.html(this.favorites_map_view.el);
      this.$el.html(this.favorite_views.el);
      return this;
    }

  });

})();