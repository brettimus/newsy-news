var React = require("react");
var ReactDOM = require("react-dom");

var ItemFeed = require("./item.react");

var data = require("./fake-data"); // array of data for Items

var items = data.items;

global.React = React;
global.ReactDOM = ReactDOM;

global.T = (function() {
    var target = document.getElementById("react-app");
    var targetCopy = document.createElement("div");
    targetCopy.innerHTML = target.outerHTML;
    targetCopy = targetCopy.innerHTML;

    return  {
        reactify: function() {
            ReactDOM.render(<Item/>, target);
        },
        unreactify: function() {
            target.innerHTML = targetCopy.innerHTML;
        },
    };
})();

// Render the App
ReactDOM.render(<ItemFeed/>, document.getElementById("react-app"));