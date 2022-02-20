/** @param {NS} ns **/
export async function main(ns) {

}

export function moneyFmt(ns, num) {
    let kil = 1000
    let mil = 1000000
    let bil = 1000000000
    let tril = 1000000000000
    if (Math.abs(num) > tril) {
        return `${Math.round(num/tril).toFixed(1)}t`.replace('.0','')
    } else if (Math.abs(num) > bil) {
        return `${Math.round(num/bil).toFixed(1)}b`.replace('.0','')
    } else if (Math.abs(num) > mil) {
        return `${Math.round(num/mil).toFixed(1)}m`.replace('.0','')
    } else if (Math.abs(num) > kil) {
        return `${Math.round(num/kil).toFixed(1)}k`.replace('.0','')
    } else {
        return `${Math.round(num).toFixed(1)}`.replace('.0','')
    }
}