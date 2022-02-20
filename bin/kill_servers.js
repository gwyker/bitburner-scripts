import { getServers } from "/lib/server.js"

/** @param {NS} ns **/
export async function main(ns) {
    let servers = getServers(ns)
    for (const s of servers) {
        if (!s.includes('goop')) {
            continue
        }
        ns.killall(s)
        ns.deleteServer(s)
        ns.tprint('Deleted '+s)
    }
}