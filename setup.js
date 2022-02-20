import {getServers, crackServer} from "/lib/server.js"

/** @param {NS} ns **/
export async function main(ns) {
    if (!ns.args.length) {
        ns.alert('give me a server to hack!')
        return
    }
    let THREADS_PER_PROCESS = 100000000
    let HACK_SCRIPT = 'hack.js'
    let LIB = '/lib/tools.js'
    var target = ns.args[0]
    var targets = ns.args[0].split(',')
    for (const t of targets) {
        crackServer(ns, t)
        if (!ns.getServer(t).hasAdminRights) {
            ns.alert(t+" isn't crackable right now.")
            return
        }
    }
    let servers = getServers(ns)
    function get_threads(script, server) {
        return Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam(script))
    }
    function run_threads(server, threads) {
        let count = 0
        for (let i=0; i<threads;i+=THREADS_PER_PROCESS) {
            count++
            let proc_threads = Math.min(THREADS_PER_PROCESS, (threads-i))
            ns.exec(HACK_SCRIPT, server, proc_threads, target)
        }
    }


    // Run home script
    ns.scriptKill('hack.js', 'home')
    ns.scriptKill('share.js', 'home')
    let t = Math.floor(Math.max(get_threads(HACK_SCRIPT, 'home')-30, get_threads(HACK_SCRIPT, 'home')*.6))
    ns.tprint('===>  Running on home with ', t, ' threads.  <===')
    ns.exec(HACK_SCRIPT, 'home', t, target, 0)

    // Run on all available servers
    let uncracked = []
    let threadCount = 0
    for (const s of servers) {
        if (s === 'home') continue
        // Kill all processes on this server
        ns.scriptKill('hack.js', s)
        ns.scriptKill('share.js', s)
        // Copy our hack files over
        await ns.scp(HACK_SCRIPT, s)
        await ns.scp(LIB, s)
        // Crack it if possible
        crackServer(ns, s)
        // If we've fully cracked it, run our hacking script
        if (ns.getServer(s).hasAdminRights) {
            var threads = get_threads(HACK_SCRIPT, s)
            if (threads > 0) {
                ns.tprint('Running on ', s, ' with ', threads, ' threads.')
                run_threads(s, threads)
                threadCount += threads
            }
        } else {
        // Otherwise, save it for when we can hack it.
                uncracked.push(s)
        }
    }
    ns.tprint(uncracked)
    ns.tprint('===>  ', uncracked.length, ' servers left uncracked.  <===')
    ns.tprint('===>  ', threadCount, ' threads started.  <===')
    // Loop thru our uncracked servers, waiting for the opportunity to crack em
    while (uncracked.length) {
        await ns.asleep(60000)
        for (const s of uncracked) {
            crackServer(ns, s)
            if (ns.getServer(s).hasAdminRights) {
                var threads = get_threads(HACK_SCRIPT, s)
                if (threads > 0) {
                    ns.tprint('Running on ', s, ' with ', threads, ' threads.')
                    ns.toast('Running on '+s+' with '+threads+' threads.', 'success', 200000)
                    run_threads(s, threads)
                }
            }
        }
        // Remove any servers we cracked
        uncracked.filter(s => {
            !ns.getServer(s).hasAdminRights
        })
    }
}