$.getJSON("http://www.reddit.com/r/EarthPorn/hot.json?sort=new", function(response) {
  var n = Math.round(Math.random()*5);
  console.log(response.data.children[n].data.url);
  imageUrl = response.data.children[n].data.url;
  $('html').css("background-image", "url("+ imageUrl + ")");
})

function buildPopupDom(mostVisitedURLs) {
  var popupDiv = document.getElementById('most_visited');

  for (var i = 0; i < 5; i++) {
    var a = popupDiv.appendChild(document.createElement('a'));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title.match(/[a-zA-Z]+/)));
  }
}


window.onload = function() {
  chrome.topSites.get(buildPopupDom);
}