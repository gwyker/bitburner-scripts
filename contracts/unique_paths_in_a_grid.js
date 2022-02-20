/** @param {NS} ns **/
export async function main(ns) {
    let answer = uniquePathsInAGrid1(ns, ns.args[0])
    ns.tprint(answer)
}

export function uniquePathsInAGrid1(ns, input) {
    let arr = eval('['+input+']')
    let rows = arr[0]
    let cols = arr[1]
    let validPaths = 0

    function solve(x, y) {
        if (x == cols-1 && y == rows-1) {
            validPaths += 1
            return
        }
        if (x < cols-1) {
            solve(x+1, y)
        }
        if (y < rows-1) {
            solve(x, y+1)
        }
    }
    solve(0, 0)
    return validPaths
}