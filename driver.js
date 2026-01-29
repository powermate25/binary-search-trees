import {mergeSort, Node, Tree, buildTree, clog} from "./binary-search-trees.js"
import { prettyPrint } from "./prettyPrint.js"

// Driver
console.log("Driver loaded.")

function randomNumGenerator(length) {
    if(length > 99) {throw new Error("Expecting a length not greater than 99") }
    let arr = []
    
    while (arr.length < length) {
        let randomNum = Math.random().toFixed(2) * 100
        while (randomNum > 99) {
            randomNum = Math.random().toFixed(2) * 100
        }
        num = Number( randomNum.toFixed() )
        arr.push(num)
        arr = [... new Set(arr) ]
    }
    
    return arr
}


const unsortedArr = [3, 2, 1, 13, 8, 5, 0, 18]
const unsortedArr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const unsortedArr3 = [1, 7, 4, 23, 8, 9, 3, 5, 67, 6345, 324, 10, 32, 56, 59, 30, 457, 200, 122, 322, 444, 44]

const tree1 =  new Tree(unsortedArr)
clog( tree1.insert(50) )
clog( tree1.insert(51) )
clog( tree1.insert(52) )
clog( tree1.insert(55) )
clog(tree1.deleteItem(50) )
clog( tree1.find(8) )
clog( tree1.depth(13) )
clog( tree1.rebalance() )
clog( tree1.isBalanced() )


clog( prettyPrint( tree1.root) )

