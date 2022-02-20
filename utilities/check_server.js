/** @param {NS} ns **/
export async function main(ns) {

    // Check a server's stats
    var serv = ns.args[0]
    
    var current_security = ns.getServerSecurityLevel(serv)
    var min_security = ns.getServerMinSecurityLevel(serv)
    
    
    ns.tprint('current security:', current_security + ' (min '+min_security+')')
    
    
    var current_money = ns.getServerMoneyAvailable(serv)
    var max_money = ns.getServerMaxMoney(serv)
    
    ns.tprint('current money:', (current_money/1000000).toFixed(2),'m')
    ns.tprint('max money:', (max_money/1000000).toFixed(2),'m')
}