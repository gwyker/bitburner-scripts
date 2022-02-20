/** @param {NS} ns **/
export async function main(ns) {
    var HACK_SCRIPT = 'hack.js'
    var LIB = '/lib/tools.js'

    // How much RAM each purchased server will have. In this case, it'll
    // be 8GB.
    if (ns.args.length < 2) {
        ns.tprint('it goes purchase_servers.js {ram} {hack target}')
        return
    }
    var ram = ns.args[0];
    var target = ns.args[1];
    ns.tprint(ram)
    var max_ram = ns.getPurchasedServerMaxRam(ram)
    ns.tprint('Max ram: ', max_ram)
    ns.tprint('Cost per ', ram, 'gb server: ', (ns.getPurchasedServerCost(ram)/1000000), 'm')
    
    // Iterator we'll use for our loop
    var i = 0;
    
    function get_threads(script, server) {
        return Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam(script))
    }
    
    
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            // If we have enough money, then:
            //  1. Purchase the server
            var hostname = ns.purchaseServer("goop-" + i, ram);
            //  2. Copy our hacking script onto the newly-purchased server
            await ns.scp(HACK_SCRIPT, hostname);
            await ns.scp(LIB, hostname)
            //  3. Run our hacking script on the newly-purchased server with x threads
            ns.exec(HACK_SCRIPT, hostname, get_threads(HACK_SCRIPT, hostname), target);
            //  4. Increment our iterator to indicate that we've bought a new server
            ++i;
            ns.toast('Bought "'+hostname+'" ('+ram+'gb) for '+ns.getPurchasedServerCost(ram)/1000000+'m', 'info', null)
        }
        await ns.asleep(300)
    }
}