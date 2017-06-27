class myArray {
  constructor() {
    this.array = [];
  }

  add(data) {
    this.array.push(data);
  }
}

var newArray = new myArray;
newArray.add(5);
console.log(newArray.array);
