class myArray {
  constructor() {
    this.array = [];
    this.length = 0;
  }

  add(data) {
    this.array.push(data);
    this.length++;
  }

  remove(data) {
    this.array = this.array.filter(function(element) {
      return element !== data;
    });
    this.length--;
  }

  search(data) {
    var foundIndex = this.array.indexOf(data);
    if(~foundIndex) {
      return foundIndex;
    }
    return null;
  }

  getAtIndex(index) {
    return this.array[index];
  }

  length() {
    this.length;
  }

  print() {
    console.log(this.array.join(" "));
  }
}

var newArray = new myArray;
newArray.add(5);
console.log("length is " + newArray.length);
console.log(newArray.array);
newArray.add(6);
console.log(newArray.array);
console.log("length is " + newArray.length);
newArray.remove(5);
console.log(newArray.array);
console.log("length is " + newArray.length);
console.log(newArray.search(5));
console.log(newArray.search(6));
newArray.add(7);
newArray.add(8);
newArray.add(9);
newArray.print();
