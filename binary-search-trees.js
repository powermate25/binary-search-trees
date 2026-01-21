import { mergeSort } from "./mergeSort.js"

export const clog = console.log

class Node {
    constructor(data, left = null, right = null) { 
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(arr = []) {
        this.tree = buildTree(arr)
        this.root = this.tree.data
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
    // Immediately filtering duplicates from arr using Set
    // (following project requirements)
    subTree.left = buildTree([... new Set(arrLeftSide)])
    subTree.right = buildTree([... new Set(arrRightSide)])

    return subTree
}





export { Node, Tree, buildTree }
