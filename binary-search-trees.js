import { mergeSort } from "./mergeSort.js"

export const clog = console.log

class Node {
    constructor(data, left, right) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(arr = []) {
        this.root = root
    }
}


function buildTree(arr) {
    const length = arr.length
    if(length < 1) {return null}

    const middle = Math.floor( length/2 )
    const arrRoot = arr[middle]
    const arrLeftSide = arr.slice(0, middle)
    const arrRightSide = arr.slice(middle+1, length)
    
    const subTree = new Node(arrRoot)
   
    subTree.left = buildTree(arrLeftSide)
    subTree.right = buildTree(arrRightSide)  

    return subTree
} 


export { buildTree }

let testA = [1, 5, 2, 1, 2, 3]
 
let setA = [... new Set(testA)]
clog(setA) 