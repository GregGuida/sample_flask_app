var app = app || {};

(function () {

  app.FavoritesIndexView = Backbone.View.extend({

    tagName: "div",

    className: "favorites_index_view",

    initialize: function() {
      this.favorites_list_view = new app.FavoritesListView({ collection: this.collection });
      this.new_favorite_view = new app.NewFavoriteView({ collection: this.collection });
      this.favorites_map_view = new app.FavoritesMapView({ collection: this.collection });
      return this;
    },

    render: function() {
      this.$el.empty();
      this.$el.append(this.favorites_map_view.el);
      this.$el.append(this.new_favorite_view.render().el)
      this.$el.append(this.favorites_list_view.el);
      return this;
    }

  });

})();