import { getServers } from "/lib/server.js"
import { moneyFmt } from "/lib/tools.js"

/** @param {NS} ns **/
export async function main(ns) {
    let servers = getServers(ns).map(ns.getServer)
    let threshold = ns.args.length == 2 ? ns.args[1] : ns.getHackingLevel()
    servers.sort((a,b) => (a.moneyMax - b.moneyMax))
    for (const s of servers) {
        if (!s.moneyAvailable) continue
        if (!s.hasAdminRights) continue
        if (threshold && s.requiredHackingSkill > threshold) continue
        ns.tprint(`----------${s.hostname}-----------`)
        ns.tprint(`Hack skill: ${s.requiredHackingSkill}`)
        ns.tprint(`Growth: ${s.serverGrowth}`)
        ns.tprint(`Security level: ${s.hackDifficulty} (min ${s.minDifficulty})`)
        ns.tprint(`Money: ${moneyFmt(ns, s.moneyAvailable)} / ${moneyFmt(ns, s.moneyMax)}`)
    }
}