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
  switch (key) {
    case '\u000D':
      
      break;
    case '\u007F:
      
      break;
    case '\u0008':
      
      break;
    case '\u001B\u005B\u0041':
      
      break;
    case '\u001B\u005B\u0042':
      
      break;
      
      
             }
      
  
}
  
  back() {
    
  }
  enter() {
    
  }
  up() {
    
  }
  down() {
    
  }
  left() {
    
  }
  right() {
    
  }


}
