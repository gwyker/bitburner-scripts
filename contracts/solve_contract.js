import { generateIPAddresses } from "/contracts/generate_ip_addresses.js"
import { mergeOverlappingIntervals } from "/contracts/merge_overlapping_intervals.js"
import { arrayJumpingGame } from "/contracts/array_jumping_game.js"
import { subarrayWithMaximumSum } from "/contracts/subarray_with_maximum_sum.js"
import { findLargestPrimeFactor } from "/contracts/find_largest_prime_factor.js"
import { uniquePathsInAGrid1 } from "/contracts/unique_paths_in_a_grid.js"
import { sanitizeParenthesesInExpression } from "/contracts/sanitize_parentheses_in_expression.js"
import { minimumPathSumInATriangle } from "/contracts/minimum_path_sum_in_a_triangle.js"
import { spiralizeMatrix } from "/contracts/spiralize_matrix.js"

var SOLVED_CONTRACTS = {
    'Generate IP Addresses': generateIPAddresses,
    'Merge Overlapping Intervals': mergeOverlappingIntervals,
    'Array Jumping Game': arrayJumpingGame,
    'Subarray with Maximum Sum': subarrayWithMaximumSum,
    'Find Largest Prime Factor': findLargestPrimeFactor,
    'Unique Paths in a Grid I': uniquePathsInAGrid1,
    'Sanitize Parentheses in Expression ': sanitizeParenthesesInExpression,
    'Minimum Path Sum in a Triangle': minimumPathSumInATriangle,
    'Spiralize Matrix': spiralizeMatrix,
}

/** @param {NS} ns **/
export async function main(ns) {
    solveContract(ns, ns.args[0], ns.args[1])
}

export function solveContract(ns, filename, hostname) {
    if (!ns.ls(hostname, 'contract').includes(filename)) {
        ns.alert(filename+' not found at hostname '+hostname)
        return
    }
    let type = ns.codingcontract.getContractType(filename, hostname)
    if (!(type in SOLVED_CONTRACTS)) {
        return -1
    }
    let func = SOLVED_CONTRACTS[type]
    let data = ns.codingcontract.getData(filename, hostname)
    let answer = func(ns, data)
    let result = ns.codingcontract.attempt(answer, filename, hostname, {returnReward: true})
    ns.tprint('Type: '+type)
    ns.tprint('Data: '+data)
    ns.tprint('Answer: '+answer)
    return result
}