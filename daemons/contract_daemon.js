import { solveAllContracts } from "/contracts/solve_all_contracts.js"

/** @param {NS} ns **/
export async function main(ns) {
    while (true) {
        solveAllContracts(ns)
        await ns.asleep(60000)
    }
}