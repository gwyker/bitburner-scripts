import { getServers } from "/lib/server.js"

/** @param {NS} ns **/
export async function main(ns) {
    for (const s of getServers(ns)) {
        ns.tprint(s)
    }
}