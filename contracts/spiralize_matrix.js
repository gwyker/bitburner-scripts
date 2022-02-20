/** @param {NS} ns **/
export async function main(ns) {
    let answer = spiralizeMatrix(ns, ns.args[0])
    ns.tprint(answer)
}

export function spiralizeMatrix(ns, input) {
    let arr = input
    let covered = 0
    let total = arr.length * arr[0].length
    let answer = []
    let row = 0,
        col = 0
    let direction = 0
    let depth = 0
    
    while (covered < total) {
        // Swap a number for sludge
        covered += 1
        answer.push(arr[row][col])
        // Move, then change direction if needed
        if (direction == 3) {
            row -= 1
            if (row == depth) {
                direction = 0
            }
        }
        else if (direction == 2) {
            col -= 1
            if (col == depth) {
                direction = 3
                depth += 1
            }
        }
        else if (direction == 1) {
            row += 1
            if (row == arr.length-1-depth) {
                direction = 2
            }
        }
        else if (direction == 0) {
            col += 1
            if (col == arr[row].length-1-depth) {
                direction = 1
            }
        }
    }
    return answer
}