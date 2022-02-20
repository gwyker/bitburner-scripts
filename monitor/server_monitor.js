import { moneyFmt } from "/lib/tools.js"

/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog('ALL')
    ns.tail()
    let s = ns.getServer(ns.args[0])
    let money = s.moneyAvailable
    let security = s.hackDifficulty
    let port = ns.getPortHandle(1)
    port.clear()
    while (true) {
        if (port.empty()) {
            await ns.asleep(300)
            continue
        }
        s = ns.getServer(s.hostname)
        let msg = await ns.readPort(1)
        // if (s.moneyAvailable > money) {
        if (msg.action === 'grow') {
            let diff = s.moneyAvailable - money
            money = s.moneyAvailable
            ns.print(`bot =${msg.name}= added \$${moneyFmt(ns,msg.after-msg.before)} to [${s.hostname}] (\$${moneyFmt(ns, money)})`)
        }
        // if (s.moneyAvailable < money) {
        if (msg.action === 'hack') {
            let diff = money - s.moneyAvailable
            money = s.moneyAvailable
            ns.print(`bot =${msg.name}= stole \$${moneyFmt(ns,msg.before-msg.after)} from [${s.hostname}] (\$${moneyFmt(ns, money)})`)
        }
        // if (s.hackDifficulty < security) {
        if (msg.action === 'weaken') {
            let diff = s.hackDifficulty - security
            security = s.hackDifficulty
            ns.print(`bot =${msg.name}= weakened [${s.hostname}] to ${msg.after.toFixed(1)} (${(msg.after-msg.before).toFixed(1)}) (min ${s.minDifficulty.toFixed(0)})`)
        }
        await ns.asleep(300)
    }
}