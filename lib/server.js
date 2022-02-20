/** @param {NS} ns **/
export async function main(ns) {
}
export function getServers(ns) {
    let paths = getServerPaths(ns)
    return Object.keys(paths).filter(s => s !== 'home')
}

export function getServerPath(ns, target) {
    let paths = getServerPaths(ns)
    return paths[target]
}

export function getServerPaths(ns) {
    ns.disableLog('ALL')
    let paths = {}
    function getNode(serv, path) {
        if (serv === 'home' && path.length) {
            return
        }
        if (path.includes(serv)) {
            return
        }
        // Add this server to the end of the path
        path.push(serv)
        // If we already have a shorter path to this server, skip adding the path
        if (!(serv in paths && paths[serv].length < path.length)) {
            paths[serv] = [...path]
        }
        // Scan children
        var children = ns.scan(serv)
        // For each child, run getNode
        children.forEach(c => {getNode(c, [...path])})
        return
    }
    
    getNode('home', [])
    ns.enableLog('ALL')
    return paths
}

export function crackServer(ns, serv) {
    var s = ns.getServer(serv)
    var p = ns.getPlayer()
    if (!s.sshPortOpen && ns.fileExists('BruteSSH.exe')) {
        ns.brutessh(serv)
    }
    if (!s.ftpPortOpen && ns.fileExists('FTPCrack.exe')) {
        ns.ftpcrack(serv)
    }
    if (!s.smtpPortOpen && ns.fileExists('relaySMTP.exe')) {
        ns.relaysmtp(serv)
    }
    if (!s.httpPortOpen && ns.fileExists('HTTPWorm.exe')) {
        ns.httpworm(serv)
    }
    if (!s.sqlPortOpen && ns.fileExists('SQLInject.exe')) {
        ns.sqlinject(serv)
    }
    var s = ns.getServer(serv)
    if (!s.hasAdminRights && s.openPortCount >= s.numOpenPortsRequired && s.requiredHackingSkill <= p.hacking) {
        ns.nuke(serv)
    }
}

export function killServer(ns, target) {
    ns.killall(target)
    ns.deleteServer(target)
}