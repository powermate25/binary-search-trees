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
        const num = Number( randomNum.toFixed() )
        arr.push(num)
        arr = [... new Set(arr) ]
    }
    
    return arr
}

// 1. New binary tree from random array generator
const randomUnsortedArr = randomNumGenerator(27)
clog("Random unsorted array")
clog(randomUnsortedArr)

clog("1. New balanced binary tree from random generated array")
const randomTree = new Tree(randomUnsortedArr)

clog("Balanced tree root")
clog(randomTree.root)

// 2. Checking tree balance
clog("2. Checking tree balance")
clog("Expecting result: true")
clog( randomTree.isBalanced() )

// 3. Printing in order
clog("3. Printing in order")
clog("Level Order")
clog( randomTree.levelOrder() )

clog("Pre Order")
clog( randomTree.levelOrder() )

clog("Post Order")
clog( randomTree.postOrder() )

clog("In Order")
clog( randomTree.inOrder() )

// 4. Unbalancing tree
clog("4. Unbalancing tree by inserting new values greater than 100")
clog( randomTree.insert(101) )
clog( randomTree.insert(111) )
clog( randomTree.insert(125) )

clog("Unbalanced tree preview")
clog( prettyPrint(randomTree.root) )

// 5. Confirming unbalanced tree
clog("5. Confirming unbalanced tree")
clog("Expecting result: false")
clog( randomTree.isBalanced() )

// 6. Rebalancing tree
clog("6. Rebalancing tree")
clog( randomTree.rebalance() )

// 7. Confirming balanced tree
clog("7. Confirming balanced tree")
clog("Expecting result: true")
clog( randomTree.isBalanced() )

// 8. Printing out tree elements
clog("8. Printing out tree elements")
clog("Level Order")
clog( randomTree.levelOrder() )

clog("Pre Order")
clog( randomTree.levelOrder() )

clog("Post Order")
clog( randomTree.postOrder() )

clog("In Order")
clog( randomTree.inOrder() )


// PrettyPrint
clog("Final tree preview")
clog( prettyPrint(randomTree.root) )
