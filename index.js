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
        
        if (val === null) {
            return;
        }
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
        if (node.val !== null) {
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
    if (val === null) {
        return ' '.repeat(width);
    }
    val = val + '';
    const spaces = width - val.length;
    if (spaces % 2) {
        val = ' '.repeat((spaces - 1) / 2) + val + ' '.repeat((spaces + 1) / 2);
    } else {
        val = ' '.repeat(spaces / 2) + val + ' '.repeat(spaces / 2);
    }
    return val;
}
function getAllNodes(tree, treeHeight, width) {
    let allNodes = [];
    function traverse(node, height) {
        height++;
        const layerIndex = height - 1;
        if (!allNodes[layerIndex]) {
            allNodes[layerIndex] = [];
        }
        // allNodes[layerIndex].push(val2str(node && node.val, width));
        allNodes[layerIndex].push(node);
        if (height >= treeHeight)
            return;

        traverse(node && node.left || null, height);
        traverse(node && node.right || null, height);

    }
    traverse(tree, 0);
    return allNodes;
}
function print(arr) {    
    const buffer=getPrintBuffer(arr);
    buffer.forEach((line,floor)=>{
        console.log(line.join(''));
    });
}
function getPrintBuffer(arr) {
    const tree = fromArr(arr);
    const treeHeight = getHeight(tree);
    const { min, max } = getMaxMin(tree);

    const width = Math.max((min + '').length, (max + '').length);

    const allNodes = getAllNodes(tree, treeHeight, width);
    const buffer=drawAllNodes(allNodes, treeHeight, width);
    return buffer;
}
function space(num) {
    return ' '.repeat(num);
}
function drawAllNodes(allNodes, treeHeight, unitWidth) {
    treeHeight--;
    const w = unitWidth;
    const hw = Math.ceil(w / 2);//halfWidth
    // function renderNode(value, unitWidth) {
    //     if (value === null) {
    //         value = ' ';
    //     }
    //     let ret = value + '';
    //     const zeros = (unitWidth - ret.length) / 2;
    //     return space(Math.ceil(zeros / 2)) + ret + space(Math.floor(zeros / 2));
    // }
    const outputBuffer=[];
    const lineLength=Math.pow(2,allNodes.length-1)*(w+1);
    const lineSpace=space(lineLength).split('');
    allNodes.forEach((line, floor) => {
        let times = treeHeight - floor - 1 > -1 ? Math.pow(2, treeHeight - floor - 1) : 0;
        // console.log('floor',floor,times);
        let startDistance;
        let gap;
        if (floor === treeHeight) {
            startDistance = 0;
            gap = 1;
        } else {
            startDistance = Math.ceil(times * w + times - 1 + 0.5 - w / 2);
            times *= 2;
            gap = (times-1) * w + times ;
        }
        let output = space(startDistance);
        outputBuffer[floor*2+1]=lineSpace.slice();
        line.forEach((node, index) => {
            if (index > 0) {
                output += space(gap);                
            }
            
            if(node){
                if(node.left){
                    outputBuffer[floor*2+1][output.length-Math.ceil((gap-startDistance)/4)]="/"
                }
                if(node.right){
                    outputBuffer[floor*2+1][output.length+w-1+Math.floor((gap-startDistance)/4)]="\\"
                }                                
                output += val2str(node.val, w);                
            }else{
                output += val2str(null, w); 
            }
        });
        outputBuffer[floor*2]=output.split("");
    });
    return outputBuffer;
    
}

if (typeof exports !== 'undefined') {
    module.exports = {
        fromArr,
        print
    }
}
