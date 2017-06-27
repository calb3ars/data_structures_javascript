class HashTable {
  constructor(size) {
    this.values = {};
    this.numberOfValues = 0;
    this.size = size;
  }

  add(key, value) {
    var hash = this.calculateHash(key); // hashing of values to prevent collisions
    // if the hashed key value doesn't exist, create it
    if(!this.values.hasOwnProperty(hash)) {
      this.values[hash] = {};
    }
    // if unique value, increase the number of values
    if(!this.values[hash].hasOwnProperty(key)) {
      this.numberOfValues++;
    }
    // assign key/value pair
    this.values[hash][key] = value;
  }

  remove(key) {
    var hash = this.calculateHash(key);
    if(this.values.hasOwnProperty(hash) && this.values[hash].hasOwnProperty(key)) {
      delete this.values[hash][key];
      this.numberOfValues--;
    }
  }

  calculateHash(key) {
    return key.toString().length % this.size;
  }

  search(key) {
    var hash = this.calculateHash(key);
    if(this.values.hasOwnProperty(hash) && this.values[hash].hasOwnProperty(key)) {
      return this.values[hash][key];
    } else {
      return null;
    }
  }

  length() {
    return this.numberOfValues;
  }

  print() {
    var string = '';
    for(var value in this.values) {
      // values[value] returns a key
      // values[value][key] returns a value
      for(var key in this.values[value]) {
        string += this.values[value][key] + ' ';
      }
    }
    console.log(string.trim());
  }
}

var hashTable = new HashTable(3);
hashTable.add('first', 1);
hashTable.add('second', 2);
hashTable.add('third', 3);
hashTable.add('fourth', 4);
hashTable.add('fifth', 5);
hashTable.print(); // => 2 4 1 3 5
console.log('length gives 5:', hashTable.length()); // => 5
console.log('search second gives 2:', hashTable.search('second')); // => 2
hashTable.remove('fourth');
hashTable.remove('first');
hashTable.print(); // => 2 3 5
console.log('length gives 3:', hashTable.length()); // => 3
