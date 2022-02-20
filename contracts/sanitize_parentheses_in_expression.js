/** @param {NS} ns **/
export async function main(ns) {
    let answer = sanitizeParenthesesInExpression(ns, ns.args[0])
    ns.tprint(answer)
}

export function sanitizeParenthesesInExpression(ns, input) {
    input = '()'
    function isValid(s) {
        let open_parens = 0
        for (const c of s) {
            if (c == '(') {
                open_parens++
            }
            if (c == ')') {
                open_parens--
            }
            if (c.match(/^[0-9a-z]+$/)) {
                continue
            }
            if (open_parens < 0) {
                return false
            }
        }
        return open_parens === 0 ? true : false
    }

    function solve(s) {
        let subs = []
        for (let i=0;i<s.length;i++) {
            if (s[i] === '(' || s[i] === ')') {
                subs.push(s.slice(0, i) + s.slice(i+1))
            }
        }
        return subs
    }

    let strings = [input]
    let parensToRemove = 0
    let validStrings = []
    while (parensToRemove < input.length) {
        // Get all possible strings that have 1 more paren removed from the current strings
        ns.print(`At level ${parensToRemove} we have ${strings.length} candidate strings.`)
        validStrings = strings.filter(isValid)
        if (validStrings.length) {
            break
        }
        strings = [].concat(...strings.map(solve))
        parensToRemove++
    }
    validStrings = [...new Set(validStrings)]
    ns.print(`We found ${validStrings.length} valid strings at level ${parensToRemove}.`)
    return validStrings
}