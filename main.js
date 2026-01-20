import {mergeSort} from "./mergeSort.js"
import {buildTree, clog} from "./binary-search-trees.js"
import { prettyPrint } from "./prettyPrint.js"

// Code

const unsortedArr = [3, 2, 1, 13, 8, 5, 0, 18]
const unsortedArr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const sortedArr = mergeSort(unsortedArr2)
// clog(sortedArr)
let treeNode = buildTree(sortedArr) 
clog(treeNode) 
// prettyPrint(treeNode)



