var express = require("express"),
    face    = require("cool-ascii-faces"),
    app     = express(),
    port    = process.argv[2] || 1337; // command line arg or default (1337)

app.use(express.static(__dirname)); // serve the current directory
                                    // NB: if req path is a directory root, serves `index.html`

app.listen(port);
console.log("... Hey.");
console.log("... FYI I'm listening on port", port);
console.log("... " + face());
