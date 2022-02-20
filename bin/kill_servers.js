import { killServer, getServers } from "/lib/server.js"

/** @param {NS} ns **/
/** @param {import(".").NS } ns */
export async function main(ns) {
    killServers(ns, ns.args[0])
}

export function killServers(ns, threshold) {
    if (!threshold) {
        ns.alert('Give a maximum threshold gb for server-killing.')
        return
    }
    let servers = getServers(ns)
    for (const s of servers) {
        if (ns.getServerMaxRam(s) <= threshold && s.includes('goop')) {
            ns.tprint(`Killing ${s}...`)
            killServer(ns, s)
        }
    }
}