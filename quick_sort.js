// Divide and conquer
//  First divide into two smaller sub-arrays (low and high elements)
//  Use recursion to sort the sub-arrays

// Time Complexity:
// Best: O(nlog(n))
// Average: O(nlog(n))
// Worst: O(n^2)

var array = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];

function quickSort(array) {
    // Return if single element array
    if(array.length < 2) {
        return array;
    }

    var pivot = array[0];
    var lesser = [];
    var greater = [];
    for(var i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            lesser.push(array[i]);
        } else {
            greater.push(array[i]);
        }
    }

    return quickSort(lesser).concat(pivot, quickSort(greater))
}

console.log(quickSort(array));