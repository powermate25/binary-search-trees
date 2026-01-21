import {mergeSort} from "./mergeSort.js"
import {Node, Tree, buildTree, clog} from "./binary-search-trees.js"
import { prettyPrint } from "./prettyPrint.js"

// Code

const unsortedArr = [3, 2, 1, 13, 8, 5, 0, 18]
const unsortedArr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const sortedArr = mergeSort(unsortedArr2)
// prettyPrint(buildTree(sortedArr))
let treeNode =  new Tree(sortedArr)

function insert(value, tree) {
    let currNode = tree.tree
    let temp

    while (currNode) {
        temp = currNode
        if (value < currNode.data) {currNode = currNode.left}
        else if (value > currNode.data) {currNode = currNode.right}
        else { return clog("Trying to insert existing data?") }
    }

    if ( value < temp.data ) { temp.left = new Node(value)} 
    else if (value > temp.data ) {temp.right = new Node(value)}
    clog("Insertion preview")
    prettyPrint( tree.tree )  
}

//insert(70, treeNode)

function deleteItem(value, tree, past, future) {
    let base = tree.tree
    let currNode
    base ? currNode = tree.tree : currNode = tree

    if (!currNode) { return clog("Item not found!")}
    if (value === currNode.data) {clog("🔔 Found!")}
    if (value === currNode.data) {
        let curr = currNode
        clog(curr)
        // Case 1 - no children
        if (!curr.left && !curr.right) {curr.data = null }
        //Case 2 - one child
        else if (curr.left && !curr.right) {
            curr.data = curr.left.data
            curr.left = curr.left.left
        }
        else if (!curr.left && curr.right) {
            curr.data = curr.right.data
            curr.right = curr.right.right
        }
        // Last case - two children
        else if (!curr.left && curr.right) {
            clog(past)
            clog(future) 
            curr.data = curr.right.data
            curr.right = curr.right.right
        }

        return
    }


    if (value < currNode.data) {
        past = currNode
        future = currNode.left
        clog("Moving left!")
        deleteItem(value, currNode.left, past, future)
    }
    else if (value > currNode.data) {
        past = currNode
        future = currNode.right
        clog("Moving right!")
        deleteItem(value, currNode.right, past, future) 
    }
}

deleteItem(23, treeNode)
clog("Deletion preview")
prettyPrint( treeNode.tree )
clog(treeNode.tree ) 