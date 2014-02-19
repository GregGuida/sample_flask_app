var app = app || {};

(function () {

  app.FavoritesListItemView = Backbone.View.extend({

    tagName: "li",

    className: "favorites_list_item_view",

    template: _.template(
      "<div class='delete'>&times;</div>"+
      "<input class='name' type='text' value='<%- name %>'></input>"+
      "<input class='address' type='text' value='<%- address %>'></input>"+
      "<p class='latlng'>Lat: <%- lat %>&nbsp;&nbsp;&nbsp;Lng: <%- lng %></p>"
    ),

    events: {
      "mouseover": "mouseover",
      "mouseout": "mouseout",
      "change input": "update",
      "click .delete": "destroy"
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      return this;
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    update: function() {
      this.model.save({
        name: this.$el.find(".name").val(),
        address: this.$el.find(".address").val()
      });
      return this;
    },

    destroy: function() {
      this.model.destroy();
      this.$el.remove();
      return this;
    },

    mouseover: function() {
      this.model.marker_mouseover();
    },

    mouseout: function() {
      this.model.marker_mouseout();
    }

  });

})();