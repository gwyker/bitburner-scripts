/** @param {NS} ns **/
export async function main(ns) {
    let answer = minimumPathSumInATriangle(ns, ns.args[0])
    ns.tprint(answer)
}

export function minimumPathSumInATriangle(ns, input) {
    let arr = eval(input)
    let minSum = 999999999999

    function tree(row, index, sum) {
        let val = arr[row][index]
        if (row === arr.length-1) {
            // ns.tprint(`adding min of ${sum+val} and minsum is ${minSum}`)
            minSum = Math.min(minSum, sum+val)
            return
        }
        tree(row+1, index, sum+val)
        tree(row+1, index+1, sum+val)
    }
    tree(0, 0, 0)
    return minSum
}