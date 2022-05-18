const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST(rootNode) {
  // Your code here
  let currentNode = rootNode

  if (!currentNode) { return null }

  while (currentNode.left) {
    currentNode = currentNode.left
  }

  return currentNode.val

}

function findMaxBST(rootNode) {
  // Your code here
  let currentNode = rootNode

  if (!currentNode) { return null }

  while (currentNode.right) {
    currentNode = currentNode.right
  }

  return currentNode.val

}

function findMinBT(rootNode) {
  if (!rootNode) return null;

  let min = Infinity;
  let stack = [];
  stack.push(rootNode);

  while (stack.length) {
    let curr = stack.pop();
    if (curr.val < min) min = curr.val;

    if (curr.right) stack.push(curr.right);
    if (curr.left) stack.push(curr.left);
  }

  return min;
}

function findMaxBT(rootNode) {
  if (!rootNode) return null;

  let max = 0;
  let stack = [];
  stack.push(rootNode);

  while (stack.length) {
    let curr = stack.pop();
    if (curr.val > max) max = curr.val;

    if (curr.right) stack.push(curr.right);
    if (curr.left) stack.push(curr.left);
  }

  return max;
}

function getHeight(rootNode) {
  // Your code here
  //1 set tracker to count how many times

  if (!rootNode) return 0;
  let tracker = 0;
  let queue = [];
  queue.push(rootNode);

  while (queue.length) {
    let temp = [];
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].left) temp.push(queue[i].left);
      if (queue[i].right) temp.push(queue[i].right);
    }

    if (temp.length) tracker++;

    queue = temp;
  }

  return tracker;
}


function countNodes(rootNode) {
  // Your code here
  if (!rootNode) return 0;

  // let counter = 0

  // countNodes(rootNode.left);
  // console.log(counter++);
  // countNodes(rootNode.right)

  return (countNodes(rootNode.left) + countNodes(rootNode.right) + 1)



}

function balancedTree(rootNode) {
  // Your code here

  if (!rootNode) return true;

  let leftHeight = getHeight(rootNode.left)
  let rightHeight = getHeight(rootNode.right)

  if (Math.abs(leftHeight - rightHeight) <= 1 && balancedTree(rootNode.left) && balancedTree(rootNode.right)) {
    return true
  } else {
    return false
  }

}

function getParentNode(rootNode, target) {
  if (!rootNode || target === null) return null;
  if (rootNode.val === target) return null;

  // if (rootNode) {
  //   if (rootNode.left.val === target || rootNode.right.val === target) {
  //     return rootNode;
  //   }
  // }

  let queue = [];
  let parent = {}
  queue.push(rootNode);

  while (queue.length) {
    let curr = queue.shift();
    if (curr.val === target) {
      return parent[curr.val];
    }

    if (curr.left) {
      queue.push(curr.left);
      parent[curr.left.val] = curr;
    }
    if (curr.right) {
      queue.push(curr.right);
      parent[curr.right.val] = curr;
    }
  }

  return undefined;

}



function inOrderPredecessor(rootNode, target) {
  // Your code here
  let newArr = []

  function helper(node) {


    if (node.left) {
      helper(node.left)
    };

    newArr.push(node.val);

    if (node.right) {
      helper(node.right)
    };


    return newArr
  }

  let arr = helper(rootNode)

  let index = arr.indexOf(target)
  console.log(index, target);
  console.log(arr);

  if (index <= 0) {
    return null
  } else {
    return arr[index - 1]
  };


  // if (!rootNode) return null;

  //   if(rootNode){
  //     if((inOrderPredecessor(rootNode.left)) || (inOrderPredecessor(rootNode.right)) === target){
  //      return rootNode.val
  //     };
  //    console.log(rootNode.val);
  // }



}


function deleteNodeBST(rootNode, target) {
  if (!rootNode || !target) return null;
  // Do a traversal to find the node. Keep track of the parent

  // Undefined if the target cannot be found

  let curr = rootNode;
  let parent = null;
  let foundTarget = null;
  while (curr) {
    if (curr.val === target) {
      foundTarget = curr; // assign to "foundTarget" variable to use later;
      break;
    }
    else if (target > curr.val) {
      parent = curr;
      curr = curr.right;
    } else {
      parent = curr;
      curr = curr.left;
    }
  } // line 226 - 231 to find the parent
  if (!foundTarget) return undefined; // target not found, return undefined;

  // Set target based on parent

  // Case 0: Zero children and no parent:
  //   return null
  if (!parent && !foundTarget.left && !foundTarget.right) {
    foundTarget = null;
  }
  // Case 1: Zero children:
  //   set the parent that points to it to null
  else if (!foundTarget.left && !foundTarget.right) {
    if (parent.left === foundTarget) parent.left = null;
    else if (parent.right === foundTarget) parent.right = null;
  }

  // Case 2: Two children:
  //   set the value to its in-order predecessor, then delete the predecessor
  else if (foundTarget.left && foundTarget.right) {
    let predecessor = inOrderPredecessor(rootNode, target);
    deleteNodeBST(rootNode, predecessor);
    foundTarget.val = predecessor;
  }
  // Case 3: One child:
  //   Make the parent point to the child
  else if ((foundTarget.left && !foundTarget.right) || (!foundTarget.left && foundTarget.right)) {
    if (parent.left === foundTarget) {
      if (foundTarget.left) parent.left = foundTarget.left;
      else parent.left = foundTarget.right;
    }
    else if (parent.right === foundTarget) {
      if (foundTarget.left) parent.right = foundTarget.left;
      else parent.right = foundTarget.right;
    }
  }

}

module.exports = {
  findMinBST,
  findMaxBST,
  findMinBT,
  findMaxBT,
  getHeight,
  countNodes,
  balancedTree,
  getParentNode,
  inOrderPredecessor,
  deleteNodeBST
}
