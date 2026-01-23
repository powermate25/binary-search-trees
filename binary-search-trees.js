import { mergeSort } from "./mergeSort.js"

export const clog = console.log

// Code
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

class Node {
    constructor(data, left = null, right = null) { 
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(arr = []) {
        this.root = buildTree(arr) 
        
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

    deleteItem(value) {
        this.root = this.delete(value, this.root)
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

    find(value) {
        let curr = this.root
        if(value === curr.data) { return clog(curr) }
        while (curr) {
            if(value === curr.data) { return curr }
            if (value < curr.data ) {curr = curr.left}
            else if (value > curr.data ) {curr = curr.right}
        }
    }

    levelOrderForEach(callback) {
        if(!callback) {throw Error("No callback specified")}
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

    depth() {
        const leaf = this.postOrder()[0].data
        let curr = this.root
        let count = -1
        if(leaf === curr.data) {
            count++
            //clog(count)
            return count 
        }
        while (curr) {
            count++
            if(leaf === curr.data) { 
                //clog(count) 
                return count
            }
            if (leaf < curr.data ) {curr = curr.left}
            else if (leaf > curr.data ) {curr = curr.right}
        }
        return count
    }

    height(value) {
        if (value == null) {return}
        let curr = this.root
        let count = -1
        if (value === curr.data) {
            //clog(curr)
            return this.depth()
        }
        while (curr) {
            count ++
            if(value === curr.data) {
                //clog(curr)
                return this.depth() - count 
            }
            if (value < curr.data ) { curr = curr.left }
            else if (value > curr.data ) { curr = curr.right }
        }
        return null
    }

    isBalanced() {
        const right = this.preOrder()
        const rightSubTree = right[right.length - 1]
        const left = this.postOrder()
        const leftSubTree = left[0]
        const result = this.height(rightSubTree.data) - this.height(leftSubTree.data)
        if (result === 0 || result === 1 || result === -1) {return true}
        else {return false}
    }

}








export { Node, Tree, buildTree }
