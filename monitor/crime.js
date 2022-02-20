/** @param {NS} ns **/
export async function main(ns) {
    let p = ns.getPlayer()
    let killed = p.numPeopleKilled
    let karma = ns.heart.break()
    ns.tprint(`People killed: ${killed}`)
    ns.toast(`People killed: ${killed}`)
    ns.tprint(`Karma: ${karma.toFixed(1)}`)
    ns.toast(`Karma: ${karma.toFixed(1)}`)
    while (true) {
        let p = ns.getPlayer()
        if (p.numPeopleKilled != killed) {
            ns.tprint(`People killed: ${p.numPeopleKilled} (+${p.numPeopleKilled-killed})`)
            ns.toast(`People killed: ${p.numPeopleKilled} (+${p.numPeopleKilled-killed})`)
            killed = p.numPeopleKilled
        }
        let newKarma = ns.heart.break()
        if (newKarma != karma) {
            ns.tprint(`Karma lowered: ${newKarma.toFixed(1)} (${(newKarma-karma).toFixed(1)})`)
            ns.toast(`Karma lowered: ${newKarma.toFixed(1)} (${(newKarma-karma).toFixed(1)})`)
            karma = newKarma
        }
        await ns.asleep(1000)
    }
}