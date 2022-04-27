// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

// Initialize button
let removeStore = document.getElementById("removeStore");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});


// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});
  
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


// When the button is clicked
removeStore.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  
  
  element = getElementByXpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/a[2]/div[2]/span');

  //<span class="_7CHGi"><a role="store" class="ox0KZ" href="//www.aliexpress.com/store/911604466" target="_blank">Shop911604466 Store</a></span>
  <span class="_7CHGi"><a role="store" class="ox0KZ" href="//www.aliexpress.com/store/911604466" target="_blank">Shop911604466 Store</a></span>

  document.getElementById("debugMsg").innerHTML = element;

  element.remove();
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {

  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}