function Node(data) {
  this.data = data;
  this.isWord = false;
  this.prefixes = 0;
  this.children = {};
}

// class Trie {
//   constructor() {
//     this.root = new Node('');
//   };
//
//   add(word) {
//     if(!this.root) {
//       return null;
//     }
//     this._addNode(this.root, word);
//   };
//
//   _addNode(node, word) {
//     if(!node || !word) {
//       return null;
//     }
//     node.prefixes++;
//     var letter = word.charAt(0);
//   }
//
// }

function Trie() {
  this.root = new Node('');
}

// add Node to Trie
Trie.prototype.add = function(word) {
  if(!this.root) {
    return null;
  }
  this._addNode(this.root, word);
};

// Add node functionality
Trie.prototype._addNode = function(node, word) {
  if(!node || !word) {
    return null;
  }
  node.prefixes++;
  var letter = word.charAt(0);
  var child = node.children[letter];
  if(!child) {
    child = new Node(letter);
    node.children[letter] = child;
  }
  var remainder = word.substring(1);
  if(!remainder) {
    child.isWord = true;
  }
  this._addNode(child, remainder);
};

// public API to remove node
Trie.prototype.remove = function(word) {
  // return if no root
  if(!this.root) {
    return;
  }
  if(this.contains(word)) {
    // if trie contains (defined later) word, remove the word
    this._removeNode(this.root, word);
  }
};

// remove node functionality
Trie.prototype._removeNode = function(node, word) {
  if(!node || !word) {
    return;
  }
  node.prefixes--;
  var letter = word.charAt(0);

  var child = node.children[letter];
  if(child) {
    var remainder = word.substring(1);
    if(remainder) {
      // if only one child prefix, delete it
      if(child.prefixes === 1) {
        delete node.children[letter];
      } else {
        // remove remainder (defined later)
        this._removeNode(child, remainder);
      }
    } else {
      if(child.prefixes === 0) {
        // delete the letter
        delete node.children[letter];
      } else {
        // else no prefixes, child is not word
        child.isWord = false;
      }
    }
  }
};

// contains node public API
Trie.prototype.contains = function(word) {
  if(!this.root) {
    return false;
  }
  return this._contains(this.root, word);
};

// contains functionality
Trie.prototype._contains = function(node, word) {
  // of node or word don't exist, return false
  if(!node || !word) {
    return false;
  }
  // set letter to first char of word
  var letter = word.charAt(0);
  // child = letter match of node's children
  var child = node.children[letter];

  if(child) {
    // if child exists, remainder = rest of the word
    var remainder = word.substring(1);
    if(!remainder && child.isWord) {
      // if no remainder left and isWord is true, return true
      return true;
    } else {
      // else if isWord is false, keep looking
      return this._contains(child, remainder);
    }
  } else {
    // when you run out of children, return false
    return false;
  }
};

Trie.prototype.countWords = function() {
  if(!this.root) {
    return console.log('No root node found');
  }
  var queue = [this.root];
  var counter = 0;
  // keep looping while there's a queue (while there are children)
  while(queue.length) {
    var node = queue.shift();
    if(node.isWord) {
      counter++;
    }
    for(var child in node.children) {
      if(node.children.hasOwnProperty(child)) {
        // push all children into queue
        queue.push(node.children[child]);
      }
    }
  }
  return counter;
};

Trie.prototype.getWords = function() {
  var words = [];
  var word = '';
  this._getWords(this.root, words, word);
  return words;
};

Trie.prototype._getWords = function(node, words, word) {
  for(var child in node.children) {
    if(node.children.hasOwnProperty(child)) {
      // if there's a child, add it to word
      word += child;
      if(node.children[child].isWord) {
        // if we find a word, push to words array
        words.push(word);
      }
      this._getWords(node.children[child], words, word);
      word = word.substring(0, word.length - 1);
    }
  }
};

Trie.prototype.print = function() {
  if(!this.root) {
    return console.log('No root node found');
  }
  var newline = new Node('|');
  var queue = [this.root, newline];
  var string = '';

  while(queue.length) {
    // grab first element from queue & add to string
    var node = queue.shift();
    string += node.data.toString(); + ' ';
    if(node === newline && queue.length) {
      queue.push(newline);
    }
    for(var child in node.children) {
      // if node has children
      if(node.children.hasOwnProperty(child)) {
        queue.push(node.children[child]);
      }
    }
  }
  // remove the last space and newline character from string
  console.log(string.slice(0, -2).trim());
};

Trie.prototype.printByLevel = function() {
  if(!this.root) {
    return console.log('No root node found');
  }
  var newline = new Node('\n'); // adds newline character instead of pipe
  var queue = [this.root, newline];
  var string = '';
  while(queue.length) {
    var node = queue.shift();
    string += node.data.toString() + (node.data !== '\n' ? ' ' : '');
    if(node === newline && queue.length) {
      queue.push(newline);
    }
    for(var child in node.children) {
      if(node.children.hasOwnProperty(child)) {
        queue.push(node.children[child]);
      }
    }
  }
  console.log(string.trim());
};

var trie = new Trie();
trie.add('one');
trie.add('two');
trie.add('fifth');
trie.add('fifty');

trie.print();
trie.printByLevel();
console.log('words are: one, two, fifth, fifty', trie.getWords());
console.log('trie count words is 4:', trie.countWords());
console.log('trie contains one is true:', trie.contains('one'));
console.log('trie contains on is false:', trie.contains('on'));
trie.remove('one');
console.log('trie count words is 3:', trie.countWords());
console.log('words are two, fifth, fifty:', trie.getWords());
// ['two', 'fifth', 'fifty']
