export const clog = console.log

// Code

// MergeSort
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

// BuildTree
function buildTree( arr ) {
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

class Node {
    constructor(data, left = null, right = null) { 
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(arr = []) {
        this.sortedArr = mergeSort(arr) 
        this.root = buildTree(this.sortedArr) 
        
    }

    insert(value) {
        let currNode = this.root
        let temp

        while (currNode) {
            temp = currNode
            if (value < currNode.data) {currNode = currNode.left}
            else if (value > currNode.data) {currNode = currNode.right}
            else { return clog("Trying to insert existing data?") }
        }

        if ( value < temp.data ) { temp.left = new Node(value)} 
        else if (value > temp.data ) {temp.right = new Node(value)}
    }

    delete(value, root) { 

        if (root === null) { return root }

        function getBestNode(curr) {
            curr = curr.right
            while (curr !== null && curr.left !== null){
                curr = curr.left
            }
            return curr
        }

        if (value < root.data) {root.left = this.delete(value, root.left)}
        else if (value > root.data) {root.right = this.delete(value, root.right)}
        // Item found now. Will proceed with deletion cases
        else {
            if (root.left === null) { return root.right}
            if (root.right === null) { return root.left }
            const bestNode = getBestNode(root)
            root.data = bestNode.data
            root.right = this.delete(bestNode.data, root.right)
        }
        return root
    }

    deleteItem(value) {
        this.root = this.delete(value, this.root)
    }

    find(value) {
        let curr = this.root
        if(value === curr.data) { return curr }
        while (curr) {
            if(value === curr.data) { return curr }
            if (value < curr.data ) {curr = curr.left}
            else if (value > curr.data ) {curr = curr.right}
        }
        
        return undefined
    }

    levelOrder(callback) {
        
        const root = this.root
        if (!root) {return} 
        const masterQueue = []
        const result = []
        masterQueue.push(root)
        while (masterQueue.length > 0) {
            let curr = masterQueue[0]
            // clog(curr.data)
            result.push(curr)
            if (curr.left) {masterQueue.push(curr.left)}
            if (curr.right) {masterQueue.push(curr.right)}
            masterQueue.shift()
        }
        return result
    }

    levelOrderForEach(callback) {
        if(!callback) {throw Error("No callback specified")} 
        const result = this.levelOrder()
        return result.forEach( i => callback(i) )

    }

    // InOrder Method 
    inOrder(root = this.root, masterQueue = []) {
        
        if (!root) {return root }
        
        if(root.left) {
            this.inOrder(root.left, masterQueue) 
            masterQueue.push(root.left) 
        }

        if(root) {
            masterQueue.push(root)
        }

        if(root.right) {
            this.inOrder(root.right, masterQueue) 
            masterQueue.push(root.right) 
        }

        return [... new Set(masterQueue)]
    }

    inOrderForEach(callback) {
        if(!callback) {throw Error("No callback specified")} 
        const result = this.inOrder()
        return result.forEach( i => callback(i) )

    }

    // PreOrder Method 
    preOrder(root = this.root, masterQueue = []) {
        if (!root) {return root }
        if(root) {
            masterQueue.push(root)
        }

        if(root.left) {
            this.preOrder(root.left, masterQueue) 
            masterQueue.push(root.left) 
        }
        
        if(root.right) {
            this.preOrder(root.right, masterQueue) 
            masterQueue.push(root.right) 
        }
        
        return [... new Set(masterQueue)]
    }

    preOrderForEach(callback) {
        if(!callback) {throw Error("No callback specified")}
        const result = this.preOrder()
        return result.forEach(i => callback(i)) 
    }

    // PostOrder Method 
    postOrder(root = this.root, masterQueue = []) {
        if (!root) {return root }

        if(root.left) {
            this.postOrder(root.left, masterQueue) 
            masterQueue.push(root.left) 
        }
        
        if(root.right) {
            this.postOrder(root.right, masterQueue) 
            masterQueue.push(root.right) 
        }

        if(root) {
            masterQueue.push(root)
        }
        
        
        return [... new Set(masterQueue)]
    }

    postOrderForEach(callback) {
        if(!callback) {throw Error("No callback specified")}
        const result = this.postOrder()
        return result.forEach(i => callback(i)) 
    }

    depth(value) {
        if (!value) {return this.maximumDepth() }
        let curr = this.root
        let count = 0
        if(value === curr.data) { return count }
        while (curr) {
            if(value === curr.data) { return count}
            if(curr.left || curr.right) {count ++}
            if (value < curr.data ) {curr = curr.left}
            else if (value > curr.data ) {curr = curr.right}
        }
        
        return null
    }

    maximumDepth(root = this.root) {
        if (!root) {return -1}
        const left = this.maximumDepth(root.left) + 1
        const right = this.maximumDepth(root.right) + 1
        return Math.max(left, right)
    }

    deepestLeaves( root = this.root, result = [] ) {
        if (!root.left && !root.right) {
            result.push(root)
            return root
        }

        if (root.left) {let left = this.deepestLeaves(root.left, result)}
        if (root.right) {let right = this.deepestLeaves(root.right, result) }

        let i = 0
        let curr = result[i]
        
        while(i < result.length) {
            curr = curr.data < result[i++].data ? result[i++] : curr
            i += 1
        }
        
        return result 
    }

    height(value) {
        if (value == null) {return}
        let curr = this.root
        let count = -1
        if (value === curr.data) {
            return this.depth()
        }
        
        while (curr) {
            count ++
            if(value === curr.data) {
                return this.maximumDepth() - count 
            }
            if (value < curr.data ) { curr = curr.left }
            else if (value > curr.data ) { curr = curr.right }
        }
        
        return null
    }

    checkBalance(root = this.root) {
        if(!root) {return -1}
        
            const left = this.checkBalance(root.left) + 1
            const right = this.checkBalance(root.right) + 1
            // Breaking the recursion if a node is not balanced.
            // NaN is returned at breakpoint. otherwise depth value returned.
            // Uncomment clog line below to reveal exact breakpoint in console.
            // clog( `left: ${left}. right: ${right}.` )
            if ( Math.abs(left - right) > 1 ) { return }
            
        return Math.max(left, right)
    }

    isBalanced() {
        let result = this.checkBalance()
        return result * 0 === 0
    }

    rebalance() {
        let newSortedArr = []
        this.inOrderForEach(i => newSortedArr.push(i.data) )
        this.root = buildTree(newSortedArr)
    }
    
}


export { mergeSort, Node, Tree, buildTree }
