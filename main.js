var csv = new Array();

function load() {
	csv = CSVtoArray('./data/lv17.csv');
}

function CSVtoArray(url) {
	let txt = new XMLHttpRequest();
	txt.open('get', url, false);
	txt.send(null);
	let lines = txt.responseText.split('\n');

	let arr = [];

	for (let line of lines) {
		arr.push(line.split(','));
	}

	let arr2 = [];

	for (let i = 0; i < arr[0].length; ++i) {
		let l = [];
		for (let j = 0; j < arr.length; ++j) {
			l.push(arr[j][i]);
		}
		arr2.push(l);
	}
	return arr2;
}

function search(searchValue) {
	let s = document.getElementById(searchValue).value.toLowerCase();

	let cnt = 0;
	ans = [];

	for (let line of csv) {
		for (let e of line) {
			if (e.toLowerCase().indexOf(s) !== -1) {
				cnt++;
				ans.push([line[1], e]);
			}
		}
	}

	if (s === "" || s === null || cnt === 0) {
		alert('not found');
	}
	else {
		for (let e of ans) {
			alert(e[0] + ' ' + e[1]);
		}
	}
}
