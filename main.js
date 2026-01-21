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

function deleteItem(value, tree) {
    let currNode = tree.tree
    while (currNode) {
        if (value === currNode.data) {
            clog("🚨 Found root!")
            break
        }
        // First case deletion: Leaf node with no children
        if (value < currNode.data ) {
            let next = currNode.left
            if (!next.left && !next.right && value === next.data) {
                clog("🔔 Item found on left and deleted")
                currNode.left = null
                break  
            }
            currNode = currNode.left
        }
        else if (value > currNode.data ) {
            let next = currNode.right
            if (!next.left && !next.right && value === next.data) {
                clog("🔔 Item found on right and deleted")
                currNode.right = null
                break  
            }
            currNode = currNode.right
        }
        clog("🚨 Item not found!") 
    }
    clog("Deletion preview")
    prettyPrint( tree.tree ) 
}

deleteItem(324, treeNode)