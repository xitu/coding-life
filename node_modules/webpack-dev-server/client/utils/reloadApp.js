/* global __webpack_hash__ */
import hotEmitter from "webpack/hot/emitter.js";
import { log } from "./log.js";

function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  } // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement plugin


  var webpackHash = // eslint-disable-next-line camelcase
  typeof __webpack_hash__ !== "undefined" ? // eslint-disable-next-line camelcase
  __webpack_hash__ : status.previousHash || "";
  var isInitial = status.currentHash.indexOf(webpackHash) === 0;

  if (isInitial) {
    var isLegacyInitial = webpackHash === "" && hot === false && liveReload === true;

    if (isLegacyInitial) {
      status.previousHash = status.currentHash;
    }

    return;
  }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    log.info("App hot update...");
    hotEmitter.emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

export default reloadApp;