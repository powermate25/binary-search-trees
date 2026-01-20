console.log("MergeSort loaded.")
function mergeSort(arr){

    let length = arr.length
    if ( length <= 1 ) { return arr }
    let middleIndex = Math.floor(length / 2)
    let left = arr.slice(0, middleIndex)
    let right = arr.slice(middleIndex, length)

    left = mergeSort(left) 
    right = mergeSort(right)

    function merge(leftArr, rightArr) {
        let result = []
        let x = 0
        let z = 0

        while ( x < leftArr.length && z < rightArr.length) {
            if (leftArr[x] < rightArr[z]) {
                result.push(leftArr[x])
                x += 1
            } 
            else {
                result.push(rightArr[z])
                z += 1
            }
        }
       return result.concat(leftArr.slice(x)).concat(rightArr.slice(z))
    }
    return merge(left, right)
}

export { mergeSort }