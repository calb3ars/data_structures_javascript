class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(data, toNodeData) {
    var node = new Node(data);
    var parent = toNodeData ? this.findBFS(toNodeData) : null;
    if(parent) {
      parent.children.push(node);
    } else {
      if(!this.root) {
        this.root = node;
      } else {
        return 'Root node is already assigned';
      }
    }
  }

  remove(data) {
    if(this.root.data === data) {
      this.root = null;
    }

    var queue = [this.root];
    while(queue.length) {
      var node = queue.shift();
      for(var i = 0; i < node.children.length; i++) {
        if(node.children[i].data === data) {
          node.children.splice(i,1);
        } else {
          queue.push(node.children[i]);
        }
      }
    }
  }

  contains(data) {
    return this.findBFS(data) ? true : false;
  }

  findBFS(data) {
    var queue = [this.root];
    while(queue.length) {
      var node = queue.shift();
      if(node.data === data) {
        return node;
      }
      for(var i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
    return null;
  }

  _preOrder(node, callback) {
    if(node) {
      if(callback) {
        callback(node);
      }
      for(var i = 0; i < node.children.length; i++) {
        this._preOrder(node.children[i], callback);
      }
    }
  }

  _postOrder(node, callback) {
    if(node) {
      for(var i = 0; i < node.children.length; i++) {
        this._postOrder(node.children[i], callback);
      }
      if(callback) {
        callback(node);
      }
    }
  }

  traverseDFS(callback, method) {
    var current = this.root;
    if(method) {
      this['_' + method](current, callback);
    } else {
      this._preOrder(current, callback);
    }
  }

  traverseBFS(callback) {
    var queue = [this.root];
    while(queue.length) {
      var node = queue.shift();
      if(callback) {
        callback(node);
      }
      for(var i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
  }

  print() {
    if(!this.root) {
      return console.log('No root node found');
    }
    var newline = new Node('|');
    var queue = [this.root, newline];
    var string = '';
    while(queue.length) {
      var node = queue.shift();
      string += node.data.toString() + ' ';
      if(node === newline && queue.length) {
        queue.push(newline);
      }
      for(var i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
    console.log(string.slice(0, -2).trim());
  }

  printByLevel() {
    if(!this.root) {
      console.log('No root node found');
    }
    var newline = new Node('\n');
    var queue = [this.root, newline];
    var string = '';
    while(queue.length) {
      var node = queue.shift();
      string += node.data.toString() + (node.data !== '\n' ? '  ' : '');
      if(node === newline && queue.length) {
        queue.push(newline);
      }
      for(var i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
    console.log(string.trim());
  }
}

var tree = new Tree();
tree.add('ceo');
tree.add('cto', 'ceo');
tree.add('dev1', 'cto');
tree.add('dev2', 'cto');
tree.add('dev3', 'cto');
tree.add('cfo', 'ceo');
tree.add('accountant', 'cfo');
tree.add('cmo', 'ceo');
tree.print(); // => ceo | cto cfo cmo | dev1 dev2 dev3 accountant
tree.printByLevel();  // => ceo \n cto cfo cmo \n dev1 dev2 dev3 accountant
console.log('tree contains dev1 is true:', tree.contains('dev1')); // => true
console.log('tree contains dev4 is false:', tree.contains('dev4')); // => false
console.log('--- BFS');
tree.traverseBFS(function(node) { console.log(node.data); }); // => ceo cto cfo cmo dev1 dev2 dev3 accountant
console.log('--- DFS preOrder');
tree.traverseDFS(function(node) { console.log(node.data); }, 'preOrder'); // => ceo cto dev1 dev2 dev3 cfo accountant cmo
console.log('--- DFS postOrder');
tree.traverseDFS(function(node) { console.log(node.data); }, 'postOrder'); // => dev1 dev2 dev3 cto accountant cfo cmo ceo
tree.remove('cmo');
tree.print(); // => ceo | cto cfo | dev1 dev2 dev3 accountant
tree.remove('cfo');
tree.print(); // => ceo | cto | dev1 dev2 dev3
