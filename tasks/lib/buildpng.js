var page = require('webpage').create();
var system = require('system');

var address = system.args[1];
var output = system.args[2];
var dimension = system.args[3];

page.viewportSize = {
    width: dimension,
    height: dimension
};

page.open(address, function(status){
    if (status !== "success") {
        console.log("Unable to load file");
    } else {
        // console.log('Rendering ' + address + ' to ' + output + ' using dimension: ' + dimension);
        page.render(output);
        phantom.exit();
    }
})
