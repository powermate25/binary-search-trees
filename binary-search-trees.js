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

        /* if(root.left && root.right) {
            this.inOrderForEach(root.left, masterQueue) 
            masterQueue.push(root.left)
            masterQueue.push(root.right)
            
        } */
        /* if(root.left) {
            this.inOrderForEach(root.left, masterQueue)  
            masterQueue.push(root.left) 
        } */
        /* if(root.right) {
            masterQueue.push(root.right)
            root.right = this.inOrderForEach(root.right, masterQueue)
        }  */

        // if(root.right) {masterQueue.push(root.right)}
        
        return [... new Set(masterQueue)]
    }
    inOrderForEach(callback) {
        if(!callback) {throw Error("No callback specified")} 
        const result = this.inOrder()
        return result.forEach( i => callback(i) )

    }

    preOrder(root = this.root, masterQueue = []) {
        if (!root) {return root }
        
        if(root.left) {
            this.preOrder(root.left, masterQueue) 
            masterQueue.push(root.left) 
        }
        if(root) {
            masterQueue.push(root)
        }
        if(root.right) {
            this.preOrder(root.right, masterQueue) 
            masterQueue.push(root.right) 
        }
        
        return [... new Set(masterQueue)]
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
