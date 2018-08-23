// Adds one element from the array each iteration and sorts it into place

// Time Complexity
// Best: O(n)
// Average: O(n^2)
// Worst: O(n^2)

var array = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];

function insertionSort(array) {
    for(var i = 0; i < array.length; i++) {
        var el = array[i];
        var j = i - 1;
        while(el >= 0 && array[j] > el) {
            console.log("array " + array);
            array[j + 1] = array[j]; // keep shifting downward until you find the spot where el should live
            j--;
        }
        // we've found the spot where el should live, let's insert it
        array[j + 1] = el;
        console.log("array : " + array);
    }
    return array;
}

console.log(insertionSort(array));
