/** @param {NS} ns **/
export async function main(ns) {
    let answer = arrayJumpingGame(ns, ns.args[0])
    ns.tprint(answer)
}

export function arrayJumpingGame(ns, input) {
    let arr = eval('['+input+']')
    // This test entry should return true
    // arr = [4,4,10,2,9,0,5,2,3,1,0,0,0,4]
    function checkPath(pos, depth) {
        let jump = arr[pos]
        // ns.tprint('-'.repeat(depth),'jumping ', jump, ' at pos ', pos)
        // Exit cases
        if (pos == arr.length-1) {
            return true
        } else if (jump == 0) {
            return false
        }
        // Run thru the jump cases
        for (let dist=1;dist<=jump;dist++) {
            // ns.tprint('-'.repeat(depth),'hopping ', dist, ' from pos ', pos)
            let result = checkPath(pos+dist, depth+1)
            jump = arr[pos]
            // ns.tprint('-'.repeat(depth),'got ', result, ' when checking pos:', pos, ' + dist:', dist, ' for jump distance ', jump)
            if (result) {
                return true
            }
        }
        return false
    }

    let result = checkPath(0, 0)
    ns.tprint(arr)
    ns.tprint(result)
    if (result) {
        return '1'
    } else {
        return '0'
    }
}