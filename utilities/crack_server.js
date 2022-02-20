import { crackServer } from "/lib/serverlib.ns"

/** @param {NS} ns **/
export async function main(ns) {
    crackServer(ns, ns.args[0])
}