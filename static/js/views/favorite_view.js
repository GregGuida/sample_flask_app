var app = app || {};

(function () {

  app.FavoriteView = Backbone.View.extend({

    tagName: "div",

    className: "favorite_view",

    template: _.template(
      "<input class='name' type='text' value='<%- name %>'></input>"+
      "<input class='address' type='text' value='<%- address %>'></input>"+
      "<p><%- lat %>,<%- lon %></p>"+
      "<div class='delete'></div>"
    ),

    events: {
      "keypress .name":          "update",
      "keypress .address":       "update",
      "click .delete":           "destroy"
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      return this;
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    destroy: function() {
      return this;
    }

  });

})();