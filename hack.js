import { moneyFmt } from "./lib/tools.js"

/** @param {NS} ns **/
/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.disableLog('getServerMaxMoney')
    ns.disableLog('getServerMinSecurityLevel')
    ns.disableLog('getServerSecurityLevel')
    ns.disableLog('getServerMoneyAvailable')
    let targets = ns.args[0].split(',')
    let doHack = ns.args.length == 2 ? ns.args[1] : true
    let hostname = ns.args.length == 3 ? ns.args[2] : null
    
    // Infinite loop that continously hacks/grows/weakens the target server
    while(true) {
        let target = targets[Math.floor(Math.random()*targets.length)]
        let moneyThresh = ns.getServerMaxMoney(target) * 0.85;
        let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
        let securityLevel = ns.getServerSecurityLevel(target)
        let moneyAvailable = ns.getServerMoneyAvailable(target)
        if (securityLevel > securityThresh) {

            // If the server's security level is above our threshold, weaken it
            ns.print(`Weakening [${target}] from ${securityLevel.toFixed(1)}`)
            let weakened = await ns.weaken(target);
            await ns.tryWritePort(1, {
                name: hostname,
                action: 'weaken',
                before: securityLevel,
                after: securityLevel-weakened,
                time: null,
            })
            // The amount by which the target server’s security level was decreased. This is equivalent to 0.05 multiplied by the number of script threads.
            let newLevel = ns.getServerSecurityLevel(target)
            ns.print(`Weakened [${target}] to ${newLevel.toFixed(1)} (${(newLevel-securityLevel).toFixed(1)})`)

        } else if (moneyAvailable < moneyThresh) {

            // If the server's money is less than our threshold, grow it
            ns.print(`Growing [${target}] from ${moneyFmt(ns,moneyAvailable)} (max ${moneyFmt(ns,moneyThresh)})`)
            let grown = await ns.grow(target);
            await ns.tryWritePort(1, {
                name: hostname,
                action: 'grow',
                before: moneyAvailable,
                after: moneyAvailable+grown,
                time: null,
            })
            let newMoney = ns.getServerMoneyAvailable(target)
            ns.print(`Grew money of [${target}] to ${moneyFmt(ns,newMoney)} (${moneyFmt(ns,newMoney-moneyAvailable)})`)

        } else {
            
            // Otherwise, hack it
            if (doHack) {
                ns.print(`Hacking [${target}] from ${moneyFmt(ns,moneyAvailable)} (max ${moneyFmt(ns,moneyThresh)})`)
                let stolen = await ns.hack(target);
                await ns.tryWritePort(1, {
                    name: hostname,
                    action: 'hack',
                    before: moneyAvailable,
                    after: moneyAvailable-stolen,
                    time: null,
                })
                let newMoney = ns.getServerMoneyAvailable(target)
                ns.print(`Hacked money of [${target}] to ${moneyFmt(ns,newMoney)} (${moneyFmt(ns,newMoney-moneyAvailable)})`)
            } else {
                await ns.grow(target)
            }

        }
    }
}