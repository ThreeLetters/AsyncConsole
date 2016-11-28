"use strict"
var EOL = require('os').EOL
module.exports = class AsyncConsole {
constructor() {
this.stdin = process.stdin;
this.stdin.setRawMode(true);
this.stdin.resume();
this.stdin.setEncoding('utf8');
  this.stdin.on('data',function(key) {
       if (key == '\u0003') { process.exit(); }
this.onKey(key)
    
  }.bind(this)) 
  this.text = [];
    this.console = [];
    this.cursor = {
        x: 0,
        y: 0
        
    }
  
}

onKey(key) {
  switch (key) {
    case '\u000D': // enter
      this.enter()
      break;
    case '\u007F': // back. (mac)
      this.back()
      break;
    case '\u0008': // back. (win)
      this.back()
      break;
    case '\u001B\u005B\u0041': // up
      this.up()
      break;
    case '\u001B\u005B\u0042': // down
      this.down()
      break;
      case '\u001B\u005B\u0044': // left
          this.left()
          break;
      case '\u001B\u005B\u0043': // right
          this.right()
          break;
      default:
          this.key(key)
          break;
      
             }
      
  
}
  pause() {
      this.stdin.pause()
  }
    resume() {
        this.stdin.resume()
    }
    escape(a) {
        var allowed = "` 1 2 3 4 5 6 7 8 9 0 - = q w e r t y u i o p [ ] | a s d f g h j k l ; ' z x c v b n m , . / ~ ! @ # $ % ^ & * ( ) _ + Q W E R T Y U I O P { } A S D F G H J K L : \\ \" Z X C V B N M < > ?"
 var allow = allowed.split(" ");
 if (a == " ") return true;
 if (allow.indexOf(a) == -1) return false;
 return true;
    }
  fill(a,num,char) {
        a = a || ""
        char = char || " "
        num = num || (process.stdout.columns - 1)
        num -= a.length
        for (var i = 0; i < num; i ++) {
            a += char
        }
        return a
    
    }
    log(a) {
        
        process.stdout.write(a)
    }
    clearLine() {
        this.log(this.fill('\r'))
    }
  enter() {
      this.log(EOL)
      
    if (this.text.length != 0) { 
      var text = this.text.join("")
      this.console.push(this.text)
      this.cursor.y = this.console.length
      this.cursor.x = 0;
      this.text = [];
      this.onEnter(text)
    }
      this.log('>')
  }
     back() {
    if (this.text.length == 0) return;
        
        this.text.splice(this.cursor.x-1,1) 
      this.cursor.x --
        this.log(this.fill('\r>' + this.text.join("")))
           this.sendOrig() 
  }
   
  up() {
     if (this.cursor.y > 0) this.cursor.y --;
      this.text = this.console[this.cursor.y] || []
       this.cursor.x = this.text.length
      this.log(this.fill("\r>" + this.text.join("")))
         this.sendOrig()
  }
  down() {
    if (this.cursor.y < this.console.length) this.cursor.y ++;
       this.text = this.console[this.cursor.y] || []
       this.cursor.x = this.text.length
      this.log(this.fill("\r>" + this.text.join("")))
         this.sendOrig()
  }
  left() {
      if (this.cursor.x > 0) {
          this.cursor.x --;
    this.log('\x1b[1D')
      }
  }
  right() {
     if (this.cursor.x < this.text.length) {
         this.cursor.x ++;
          this.log('\x1b[1C')
     }
  }
    key(key) {
        if (!this.escape(key)) return;

        this.text.splice(this.cursor.x,0,key)
        this.cursor.x ++;
        this.log(this.fill("\r>" + this.text.join("")))
        
        this.sendOrig()
    }
 sendOrig() {
     var amount = process.stdout.columns - this.cursor.x - 3
     this.log(eval('\'\\x1b[' + amount + 'D\''))
         
     
 }
onEnter(t) {
    
    
}
}
