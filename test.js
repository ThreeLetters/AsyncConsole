var asyncconsole = require('./index.js')
var prompt = new asyncconsole(' > ', function(data) {
    console.log("Your input: " + data)
});
