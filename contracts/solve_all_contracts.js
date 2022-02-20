import { solveContract } from "/contracts/solve_contract.js"
import { getServers } from "/lib/server.js"

/** @param {NS} ns **/
export async function main(ns) {
    solveAllContracts(ns)
}

export function solveAllContracts(ns) {
    var servers = getServers(ns)
    for (const s of servers) {
        var contracts = ns.ls(s, 'contract')
        if (contracts.length) {
            ns.print('-------------------------')
            ns.print(s)
            ns.print(contracts)
            ns.print(contracts.map(c => ns.codingcontract.getContractType(c, s)))
        }
        for (const contract of contracts) {
            var type = ns.codingcontract.getContractType(contract, s)
            var result = solveContract(ns, contract, s)
            if (result == -1) {
                continue
            }
            if (!result) {
                ns.toast(`Failed ${contract} (${type}) in server [${s}] :: ${result}`, 'warning', null)
                ns.tprint(`Failed ${contract} (${type}) in server [${s}] :: ${result}`)
                continue
            }
            ns.toast(`Solved ${contract} (${type}) in server [${s}] :: ${result}`, 'success', null)
            ns.tprint(`Solved ${contract} (${type}) in server [${s}] :: ${result}`)
        }
    }
}