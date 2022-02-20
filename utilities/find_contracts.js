import { getServers } from "/lib/server.js"

/** @param {NS} ns **/
export async function main(ns) {
    findContracts(ns, ns.args[0])
}

export function findContracts(ns, type='') {
    var servers = getServers(ns)
    for (const s of servers) {
        var contracts = ns.ls(s, 'contract')
        if (contracts.length) {
            // Skip if no contracts of the specified type
            let types = contracts.map(c => ns.codingcontract.getContractType(c, s))
            if (type && !types.includes(type)) {
                continue
            }
            // Print each contract along with its type
            ns.tprint(`---------${s}-----------`)
            for (const c of contracts) {
                let cType = ns.codingcontract.getContractType(c, s)
                let cData = ns.codingcontract.getData(c, s)
                if (type && cType !== type) {
                    continue
                }
                ns.tprint(`${cType} :: ${c} :: ${cData}`)
            }
        }
    }
}