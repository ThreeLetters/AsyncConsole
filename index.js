"use strict"
module.exports = class AsyncConsole {
constructor() {
this.stdin = process.stdin;
this.stdin.setRawMode(true);
this.stdin.resume();
this.stdin.setEncoding('utf8');
  this.stdin.on('data',function(key) {
this.onKey(key)
    
  }.bind(this)) 
}

onKey(key) {
  
  
}


}
