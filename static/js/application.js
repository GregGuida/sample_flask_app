var app = app || {};

$(function() {
  new app.FavoriteLocationRouter();
  Backbone.history.start({pushState: true});
});