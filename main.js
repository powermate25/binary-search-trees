import {mergeSort} from "./mergeSort.js"
import {Node, Tree, buildTree, clog} from "./binary-search-trees.js"
import { prettyPrint } from "./prettyPrint.js"

// Code

const unsortedArr = [3, 2, 1, 13, 8, 5, 0, 18]
const unsortedArr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const sortedArr = mergeSort(unsortedArr2)
// prettyPrint(buildTree(sortedArr))
let treeNode =  new Tree(sortedArr)

// insert(70, treeNode) 

function deleteItemFn(value, tree) {
    const root = tree.root ? tree.root : tree
    clog(root)

    if (root === null) { return root }

    function getBestNode(curr) {
        curr = curr.right
        while (curr !== null && curr.left !== null){
            curr = curr.left
        }
        return curr
    }

    if (value < root.data) {root.left = deleteItemFn(value, root.left)}
    else if (value > root.data) {root.right = deleteItemFn(value, root.right)}
    // Item found now. Will proceed with deletion cases
    else {
        if (root.left === null) { return root.right}
        if (root.right === null) { return root.left }
        const bestNode = getBestNode(root)
        root.data = bestNode.data
        root.right = deleteItemFn(bestNode.data, root.right)
    }
    return root
}


clog("Deletion preview")
treeNode.deleteItem(1)
prettyPrint(treeNode.root)
clog(treeNode)

clog("Insertion preview")
treeNode.insert(100)
prettyPrint(treeNode.root)
clog(treeNode)

clog("Search result")
clog( treeNode.find(3) )
// prettyPrint(treeNode.root)
// clog(treeNode)