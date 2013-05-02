var inverted = true;

function updateIcon() {
  inverted = !inverted;
  var path = {19: "icon19.png",
              38: "icon38.png"};
  if (inverted) {
    path = {19: "icon19-inverted.png",
            38: "icon38-inverted.png"};
  }
  chrome.browserAction.setIcon({path: path});
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    invert(tabs[0]);
  });
}

function invert(tab) {
  var code = "img { -webkit-filter: none; }";
  if (inverted)
    code = "img { -webkit-filter: invert(); }";
  chrome.tabs.insertCSS(tab.id, {
    code: code,
    allFrames: true
  });
}

chrome.browserAction.onClicked.addListener(updateIcon);
chrome.tabs.onCreated.addListener(invert);
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == 'complete')
    invert(tab);

  });

updateIcon();