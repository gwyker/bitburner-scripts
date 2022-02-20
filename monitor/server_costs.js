import { moneyFmt } from "/lib/tools.js"

/** @param {NS} ns **/
export async function main(ns) {
    let maxRam = ns.getPurchasedServerMaxRam()
    for (var i = 1; i <= 999; i++) {
        let gb = Math.pow(2, i)
        if (gb > maxRam) {
            break
        }
        let cost = ns.getPurchasedServerCost(gb)
        ns.tprint(`${gb}gb -- ${moneyFmt(ns, cost)}  (${moneyFmt(ns, cost*25)})`)
    }   
}