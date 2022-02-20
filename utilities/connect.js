import { getServerPath } from "/lib/server.js"

/** @param {NS} ns **/
export async function main(ns) {
    let serverPath = getServerPath(ns, ns.args[0])
    const path = serverPath.map(s => 'connect '+s).join(';')

    const terminalInput = document.getElementById("terminal-input");
    terminalInput.value = `home;${path}`;
                
    const handler = Object.keys(terminalInput)[1];
    terminalInput[handler].onChange({target:terminalInput});
    terminalInput[handler].onKeyDown({keyCode:13,preventDefault:()=>null});
}