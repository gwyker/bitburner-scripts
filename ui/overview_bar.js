const doc = eval("document");

/** @param {NS} ns **/
export async function main(ns) {
	const HUDElement = doc.querySelector('tbody');
	
	const statName = "Wis";
	let statValue = 0
    let percent = 50;

	var text = getTextElement(statName, statValue)
	var bar = getBarElement(percent)
	HUDElement.querySelectorAll('.jss13.css-hadb7u')[HUDElement.querySelectorAll('.jss13.css-hadb7u').length-1].parentElement.after(text);
	text.after(bar);
	
	ns.atExit(() => { text.remove(); bar.remove(); }); // Removes stat on script kill

	while(true){
		statValue++;

		// Updating elements
		// Very inneficient

		text.remove(); bar.remove();
		
		text = getTextElement(statName, statValue)
		bar = getBarElement(percent)
	HUDElement.querySelectorAll('.jss13.css-hadb7u')[HUDElement.querySelectorAll('.jss13.css-hadb7u').length-1].parentElement.after(text);
		text.after(bar);

		await ns.sleep(100000);
	}
}

function getTextElement(statName, statValue) {
	return htmlToElement(`
	<tr class="MuiTableRow-root css-1bspkzr">
		<th class="jss11581 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row">
			<p class="jss11586 MuiTypography-root MuiTypography-body1 css-19s0bfh">
				${statName}&nbsp;
			</p>
		</th>
		<td class="jss11581 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
			<p class="jss11586 MuiTypography-root MuiTypography-body1 css-19s0bfh">
				${statValue}
			</p>
		</td>
		<td class="jss11581 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
			<p class="jss11586 MuiTypography-root MuiTypography-body1 css-19s0bfh" id="overview-str-hook">
			</p>
		</td>
	</tr>`)
}

function getBarElement(percent) {
	return htmlToElement(`
	<tr class="MuiTableRow-root css-1bspkzr">
		<th class="jss11581 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row" colspan="2" style="padding-bottom: 2px; position: relative; top: -3px;">
			<span class="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-13t0qb2" role="progressbar" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100">
				<span class="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate css-he79ev" style="transform: translateX(-${100-percent}%);">
				</span>
			</span>
		</th>
	</tr>
	`)
}

// https://stackoverflow.com/a/35385518/11131159
function htmlToElement(html) {
    var template = doc.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}