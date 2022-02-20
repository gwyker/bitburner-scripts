import { killServer, getServers } from "/lib/server.js"

/** @param {NS} ns **/
export async function main(ns) {
    let threshold = ns.args[0]
    let servers = getServers(ns)
    for (const s of servers) {
        if (ns.getServerMaxRam(s) <= threshold && s.includes('goop')) {
            ns.tprint(`Killing ${s}...`)
            killServer(ns, s)
        }
    }
}