class TreeNode {
    constructor(val) {
        this.val = val;
    }
}
function fromArr(arr) {
    if (!arr || !arr.length) {
        return null;
    }

    let root;
    const cbList = [(node) => root = node];

    arr.forEach((val) => {
        if (val === null) {
            return;
        }

        const node = new TreeNode(val);
        const cb = cbList.shift();

        cb(node);
        cbList.push((n) => node.left = n);
        cbList.push((n) => node.right = n);
    });
    return root;
}
function getHeight(root) {
    let max = 0;
    function traverse(node, height) {
        height++;
        if (height > max) {
            max = height;
        }
        if (node.left) {
            traverse(node.left, height);
        }
        if (node.right) {
            traverse(node.right, height);
        }
    }
    traverse(root, 0);
    return max;
}
function getMaxMin(root) {
    let max = -Infinity;
    let min = Infinity;
    function traverse(node) {
        if (node.val > max) {
            max = node.val;
        }
        if (node.val < min) {
            min = node.val;
        }
        if (node.left) {
            traverse(node.left);
        }
        if (node.right) {
            traverse(node.right);
        }
    }
    traverse(root);
    return { max, min };
}
function print(arr) {
    const tree = fromArr(arr);
    const height = getHeight(tree);
    const { min, max } = getMaxMin(tree);
    const width = Math.max((min + '').length, (max + '').length);
}
print([1,2,2,3,4,4,3]);
if (typeof exports !== 'undefined') {
    module.exports = {
        fromArr,
        print
    }
}
