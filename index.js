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
        const node = new TreeNode(val);
        const cb = cbList.shift();
        cb(node);
        if (val === null) {
            return;
        }

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
        if(node.val!==null){
            if (node.val > max) {
                max = node.val;
            }
            if (node.val < min) {
                min = node.val;
            }
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
function val2str(val, width) {
    if(val===null){
        return ' '.repeat(width);
    }
    val=val+'';

    const spaces=width-val.length;
    if(spaces%2){        
        val=' '.repeat((spaces-1)/2)+val+' '.repeat((spaces+1)/2);
    }else {
        val=' '.repeat(spaces/2)+val+' '.repeat(spaces/2);
    }
    return val;
}
function print(arr) {
    const tree = fromArr(arr);
    console.log('tree', tree);
    const treeHeight = getHeight(tree);
    const { min, max } = getMaxMin(tree);
    
    const width = Math.max((min + '').length, (max + '').length);

    const allNodes = [];
    function traverse(node, height) {
        height++;
        const layerIndex = height - 1;
        if (!allNodes[layerIndex]) {
            allNodes[layerIndex] = [];
        }
        allNodes[layerIndex].push(val2str(node && node.val, width));
        if (height >= treeHeight)
            return;

        traverse(node && node.left || null, height);
        traverse(node && node.right || null, height);

    }
    traverse(tree, 0);
    console.log('allNodes', allNodes);
    drawAllNodes(allNodes);
}
function drawAllNodes(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        const line = arr[i];
        console.log(line.join(' '));
        // for(let j=0;j<line.length;j++){
        //     const val=line[j];
        //     console.log(val);
        // }
    }
}
print([1, 5, 2, 3, 4, null, 3]);
if (typeof exports !== 'undefined') {
    module.exports = {
        fromArr,
        print
    }
}
