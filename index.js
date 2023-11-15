class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr, 0, arr.length - 1);
    // prettyPrint(this.root);
    // console.log(this.root);
  }

  buildTree(arr, start, end) {
    // Base Case
    if (start > end) {
      return null;
    }

    // Get middle element and make it root
    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    // Recursively construct the left subtree and make it left child of root
    node.left = this.buildTree(arr, start, mid - 1);
    // Recursively construct the left subtree and make it right child of root
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  // Initial Insert
  insert(data) {
    this.insertRec(this.root, data);
  }

  insertRec(root, data) {
    // If the tree is empty, return a new node
    if (root == null) {
      root = new Node(data);
      return root;
    }

    // Otherwise traverse down the tree
    if (data < root.data) {
      root.left = this.insertRec(root.left, data);
    } else if (data > root.data) {
      root.right = this.insertRec(root.right, data);
    }
    return root;
  }

  // Initial Delete
  delete(data) {
    this.deleteRec(this.root, data);
  }

  deleteRec(root, data) {
    // Base case
    if (root === null) {
      return root;
    }

    if (root.data > data) {
      root.left = this.deleteRec(root.left, data);
      return root;
    } else if (root.data < data) {
      root.right = this.deleteRec(root.right, data);
      return root;
    }

    if (root.left === null) {
      let temp = root.right;
      // root = null;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      // root = null;
      return temp;
    } else {
      let succParent = root;

      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      root.data = succ.data;

      return root;
    }
  }

  find(data) {
    return this.findRec(this.root, data);
  }

  findRec(root, data) {
    if (!root || root.data === data) {
      return root;
    }

    if (data < root.data) {
      return this.findRec(root.left, data);
    } else {
      return this.findRec(root.right, data);
    }
  }

  levelOrder(callback) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(callback ? callback(current) : current.data);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }

    return result;
  }
}

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

let set = new Set([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

let arr = Array.from(set);

arr.sort((a, b) => a - b);

console.log(arr);

const tree = new Tree(arr);
