var ZL = {};

ZL.imageElements = function () {
  let imageNodes = document.getElementsByTagName("img");
  return [].slice.call(imageNodes);
};

ZL.findCIDImageURL = function () {
  let images = ZL.imageElements();
  let imgLinks = [];
  for (let i = 0; i < images.length; i++) {
    let url = images[i].getAttribute("src");
    imgLinks.push(url);
  }
  return JSON.stringify(imgLinks);
};

ZL.replaceImageSrc = function (info) {
  let images = ZL.imageElements();
  let screenWidth = parseInt(window.screen.availWidth * 0.9);
  for (let i = 0; i < images.length; i++) {
    let url = images[i].getAttribute("src");
    if (url.indexOf(info.URLKey) === 0) {
      images[i].setAttribute("src", info.LocalPathKey);
      let width = images[i].getAttribute("width");
      if (!width) {
        images[i].onload = function (e) {
          let _width = e.target.width;
          if (!_width) {
            _width = screenWidth;
          }
          const oldWidth = _width;
          let hasChangeWidth = false;
          if (_width > screenWidth) {
            hasChangeWidth = true;
            _width = screenWidth;
          }
          e.target.style.width = _width + "px";
        };
      } else {
        width = width.replace("px", "");
        if (width != "") {
          width = parseInt(width);
          const oldWidth = width != 0 ? width : screenWidth;
          let hasChangeWidth = false;
          if (width > screenWidth) {
            width = screenWidth;
            hasChangeWidth = true;
          }
          images[i].style.width = width + "px";
        }
      }
      images[i].removeAttribute("width");
      images[i].removeAttribute("height");
      break;
    }
  }
};
