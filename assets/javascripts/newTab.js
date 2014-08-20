$.getJSON("http://www.reddit.com/r/wallpapers/hot.json?sort=new", function(response) {
  imageUrl = response.data.children[0].data.url;
  $('body').css("background-image", "url("+ imageUrl + ")");
})

function buildPopupDom(mostVisitedURLs) {
  var popupDiv = document.getElementById('most_visited');

  for (var i = 0; i < 5; i++) {
    var a = popupDiv.appendChild(document.createElement('a'));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title.toLowerCase().match(/[a-zA-Z]+/)));
  }
}


window.onload = function() {
  chrome.topSites.get(buildPopupDom);
}