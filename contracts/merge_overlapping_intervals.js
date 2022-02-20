/** @param {NS} ns **/
export async function main(ns) {
    const answer = mergeOverlappingIntervals(ns, ns.args[0])
    ns.tprint(answer)
}
    
export function mergeOverlappingIntervals(ns, input) {
    let intervals = eval(input)
    let answer = []
    // Get maximum value
    intervals.sort((a, b) => {return b[1] - a[1]})
    let max = intervals[0][1]
    // Sort by first element to get the beginning interval
    intervals.sort((a, b) => {return a[0] - b[0]})
    let cur = [...intervals[0]]
    ns.tprint(cur)
    ns.tprint(max)
    while (cur[1] < max) {
        let found = false
        for (const i of intervals) {
            if (i[0] <= cur[1] && cur[1] < i[1]) {
                // ns.tprint(`moving to ${i[1]} from ${i}`)
                cur[1] = i[1]
                found = true
                break
            }
        }
        if (!found) {
            // ns.tprint(`appending ${cur}`)
            // ns.tprint(JSON.stringify(intervals))
            answer.push(cur)
            // Find the next highest interval
            let filtered = intervals.filter(i => i[0] > cur[1])
            if (filtered.length) {
                cur = filtered[0]
            } else {
                break
            }
        }
    }
    // Append the final interval
    answer.push(cur)
    return JSON.stringify(answer)
}