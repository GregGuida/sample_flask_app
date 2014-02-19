var app = app || {};

(function () {

  app.NewFavoriteView = Backbone.View.extend({

    tagName: "div",

    className: "new_favorite_view",

    template: _.template(
      "<button class='submit' type='submit' value=''>+</button>"+
      "<input class='name' type='text' value='' placeholder='New Favorite Name'></input>"+
      "<input class='address' type='text' value='' placeholder='New Address'></input>"
    ),

    events: {
      "click .submit":           "attempt_submit"
    },

    initialize: function() {
      //this.listenTo(this.model, "change", this.render);
      return this;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    attempt_submit: function() {
      if (this.$el.find(".name").val() == "") {
        this.$el.find(".name").css({"background-color":"#FFEEEE"})
        return this;
      }
      if (this.$el.find(".address").val() == "") {
        this.$el.find(".address").css({"background-color":"#FFEEEE"})
        return this;
      } 

      this.collection.create({
        name: this.$el.find(".name").val(),
        address: this.$el.find(".address").val()
      });

      this.render();
      return this;
    },

    destroy: function() {
      return this;
    }

  });

})();