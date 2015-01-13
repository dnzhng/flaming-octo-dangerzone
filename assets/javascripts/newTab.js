$.getJSON("http://www.reddit.com/r/EarthPorn/hot.json?sort=new", function(response) {
  var n = Math.round(Math.random()*5)+1;
  imageUrl = response.data.children.filter(isImage)[n].data.url;
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

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function isImage(link) {
  return link.data.url.endsWith("jpg") || link.data.url.endsWith("png");
}


window.onload = function() {
  chrome.topSites.get(buildPopupDom);
}