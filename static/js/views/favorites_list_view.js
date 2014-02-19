var app = app || {};

(function () {

  app.FavoritesListView = Backbone.View.extend({

    tagName: "ul",

    className: "favorites_list",

    initialize: function() {
      this.listenTo(this.collection, "add", this.add_item);
      this.listenTo(this.collection, "remove", this.remove_item);
      this.listenTo(this.collection, "sync", this.render);
      return this;
    },

    remove_item: function(){
      return this;
    },

    render: function() {
      var self = this;
      this.$el.empty();
      this.collection.each(function(favorite){
        var view = new app.FavoritesListItemView({ model: favorite })
        self.$el.append(view.render().el);
      });
      return this;
    }

  });

})();