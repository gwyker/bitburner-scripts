/** @param {NS} ns **/
export async function main(ns) {
    let answer = subarrayWithMaximumSum(ns, ns.args[0])
    ns.tprint(answer)
}

export function subarrayWithMaximumSum(ns, input) {
    // input = '8,0,6,-6,-8,4,5,9,5,3,-9,-8,6,-1,-6,-8,8,8,-7,-5,9'
    let arr = eval('['+input+']')
    let answer = 0
    for (const [start,val] of arr.entries()) {
        // Get the sum for all possible subarrays starting from this position
        for (let end=start;end<arr.length;end++) {
            let sub = arr.slice(start, end)
            let sum = sub.reduce((a, b) => a+b, 0)
            if (sum > answer) answer = sum
        }
    }
    return answer
}