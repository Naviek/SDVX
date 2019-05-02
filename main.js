let csv = new Array();
let getEle, searchstr, level;

function load() {
	getEle = GETtoDict(location.search.substring(1));
	searchstr = decodeURI(getEle["searchstr"]).toLowerCase();
	level = getEle["level"];
	csv = CSVtoArray("./data/lv" + level + ".csv");
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

function GETtoDict(str) {
	let rel = str.split('&');
	let getEle = {};
	for (let r of rel) {
		e = r.split('=');
		getEle[e[0]] = e[1];
	}
	return getEle;
}

function search() {

	let cnt = 0;
	ans = [];

	for (let line of csv) {
		for (let e of line) {
			if (e.toLowerCase().indexOf(searchstr) !== -1) {
				cnt++;
				ans.push([line[1], e]);
			}
		}
	}

	if (searchstr === "" || searchstr === null || cnt === 0) {
		return 'not found';
	}
	else {
		return ans;
	}
}

function initResult() {
	load();
	let res = search();
	let parent_object = document.getElementById("songs");
	if (res === "not found") {
		let list_element = document.createElement("p");
		list_element.innerHTML = "not found";
		parent_object.appendChild(list_element);
	}
	else {
		for (let e of res) {
			let list_element = document.createElement("li");
			list_element.innerHTML = e[0] + ' ' + e[1];
			parent_object.appendChild(list_element);
		}
	}
}
