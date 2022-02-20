/** @param {NS} ns **/
export async function main(ns) {
    var answer = generateIPAddresses(ns, ns.args[0])
    ns.tprint(answer)
}

export function generateIPAddresses(ns, input) {
    input = input.toString()
    // Get all possible group numberings
    var groups = []
    for (const n1 of [1, 2, 3]) {
        for (const n2 of [1, 2, 3]) {
            for (const n3 of [1, 2, 3]) {
                for (const n4 of [1, 2, 3]) {
                    var group = [n1, n2, n3, n4]
                    const sum = group.reduce((a, b) => a+b, 0)  // LMAO.
                    if (sum == input.length && !groups.includes(group)) {
                        groups.push(group)
                    }
                }
            }
        }
    }
    // Get valid groups
    var validGroups = []
    for (const group of groups) {
        var nodes = getNodes(input, group)
        // Apply rules to each node
        if (nodes.every(isValidNode)) {
            validGroups.push(nodes)
        }
    }
    // Return a formatted list of valid IPs
    var validIps = []
    validGroups.forEach(g => validIps.push(g.join('.')))
    return '['+validIps.join(', ')+']'
}


function getNodes(ip, group) {
    var nodes = []
    var idx = 0
    for (const num of group) {
        var node = ip.slice(idx, idx+num)
        nodes.push(node)
        idx += num
    }
    return nodes
}


function isValidNode(node) {
    // Rule #1: Must be no more than 255
    if (parseInt(node) > 255) {
        return false
    } 
    if (node.charAt(0) == '0' && node.length > 1) {
        return false
    }
    return true
}