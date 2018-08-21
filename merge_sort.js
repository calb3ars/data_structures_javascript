// Divide and Conquer

// Divide the list into n sublists, each containing 1 element
// merge sublists to produce new sorted sublists until you've built up the original length list

// Time complexity:
// Best: O(nlog(n))
// Average: O(nlog(n))
// Worst: O(nlog(n))

var array = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];

function mergeSortTopDown(array) {
    if(array.length < 2) {
        return array;
    }

    var middle = Math.floor(array.length / 2);
    var left = array.slice(0, middle);
    var right = array.slice(middle);
    return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right))
}

function mergeTopDown(left, right) {
    var array = [];
    while (left.length && right.length) {
        // build up the array again
        if(left[0] < right[0]) {
            array.push(left.shift())
        } else {
            array.push(right.shift())
        }
    }
    return array.concat(left.slice()).concat(right.slice());
}

console.log(mergeSortTopDown(array));