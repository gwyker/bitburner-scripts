/** @param {NS} ns **/
export async function main(ns) {
    let answer = findLargestPrimeFactor(ns, ns.args[0])
    ns.tprint(answer)
}

export function findLargestPrimeFactor(ns, input) {
    let num = eval(input)
    let factors = []
    let i = 2
    while (i <= num) {
        if ((num/i) === Math.round((num/i))) {
            num /= i
            factors.push(i)
            i = 2
        } else {
            i++
        }
    }
    return Math.max(...factors)
}