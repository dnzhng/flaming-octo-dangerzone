$.getJSON("http://www.reddit.com/r/wallpapers/hot.json?sort=new", function(response) {
  imageUrl = response.data.children[0].data.url;
  $('body').css("background-image", "url("+ imageUrl + ")");
})