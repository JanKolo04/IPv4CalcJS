window.onload = function() {
	let button = document.querySelector("#submit");

	//submasks lenght checker
	let checker = 0;
	button.addEventListener("click", function() {
		//subasks input value
		let submasks = document.querySelector("#submasksCount").value;
		//ip addresses
		let ip = document.querySelector("#ipaddress").value;

		//validation
		if(ip == "") {
			alert("Nie podano adresu IP!");
		}
		else if(convertToBin(ip) == undefined) {
			alert("Zły adres IP!");
		}
		
		else if((submasks > 0) && (submasks < 11)) {
			if(submasks != checker) {
				create_hosts_input();
				checker = submasks;
			}
			else {
				if(check_count_hosts() == true) {
					allRun();
				}
				else {
					alert("Ilośc hostów jest niepoprawna!");
				}
			}
		}
		else {
			alert("Złe dane zostały wprawdzone w ilości sieci!\nMożesz tylko obliczyć minimum 1 sieci i maksymalnie 10 sieci!");
		}

	});
}; 


let arrayWithMasks = ["128.0.0.0","192.0.0.0","224.0.0.0","240.0.0.0","248.0.0.0","252.0.0.0","254.0.0.0","255.0.0.0","255.128.0.0","255.192.0.0","255.224.0.0","255.240.0.0","255.248.0.0","255.252.0.0","255.254.0.0","255.255.0.0","255.255.128.0","255.255.192.0","255.255.224.0","255.255.240.0","255.255.248.0","255.255.252.0","255.255.254.0","255.255.255.0","255.255.255.128","255.255.255.192","255.255.255.224","255.255.255.240","255.255.255.248","255.255.255.252","255.255.255.254","255.255.255.255"];


function create_hosts_input() {
	//get submasks count
	let submasks = document.querySelector("#submasksCount").value;

	//div hostInputHolder
	let hostInputHolder = document.querySelector("#hostInputHolder");

	//get all inputs where we writeing hostcount
	let counts = document.querySelectorAll(".hostsCount");
	//if lenght counts is bigger than 0 do code
	if(counts.length > 0) {
		//for loop remove all inputs with host count
		for(let i=0; i<counts.length; ++i) {
			//remove
			counts[i].remove();
		}
	}
	//for loop for create good count of inputs 
	for(let i=0; i<submasks; ++i) {
		//create element
		let input = document.createElement("input");
		//set type
		input.type = "number";
		//set classname
		input.className = "input collapsible hostsCount";
		//set placeholder
		input.placeholder = "Host count...";
		//set min and max value
		input.min = "1";
		input.max = "500";
		//set value
		input.value = "1";
		//append input into main
		hostInputHolder.appendChild(input);
	}

	//get new input
	let elem = document.querySelectorAll(".collapsible");
	for(let i=0; i<elem.length; ++i) {
		const startHeight = window.getComputedStyle(elem[i]).height;

		// Remove the collapse class, and force a layout calculation to get the final height
		elem[i].classList.toggle("collapsed");
		const height = window.getComputedStyle(elem[i]).height;

		// Set the start height to begin the transition
		elem[i].style.height = startHeight;

		// wait until the next frame so that everything has time to update before starting the transition
		requestAnimationFrame(() => {
		elem[i].style.transition = '';

			requestAnimationFrame(() => {
			    elem[i].style.height = height
			})
		})
	}
}


function convertToDec(data) {
	//split data
	let dataSplit = data.split('.');
	//var for bin in dec
	let decAddress = "";
	for(let i=0; i<dataSplit.length; ++i) {
		//convert from bin to dec
		decAddress += parseInt(dataSplit[i], 2);
		//if i != last data from split append dot 
		//after append convert data octec 
		if(i != dataSplit.length-1) {
			decAddress += '.';
		}
	}

	return decAddress;
} 


function convertToBin(data) {
	//split address after dot
	const splitArray = data.split('.');
	//array for bin values
	const binArray = [];
	for(let i=0; i<splitArray.length; ++i) {
		//convert from string into int
		let intType = parseInt(splitArray[i]);
		//if number isn't NaN conbert numbers to bin
		if(!isNaN(intType)) {
			//convert numbers from dec to bin
			let bin = intType.toString(2);
			//append 0 to convert number
			let addZero = bin.padStart(8,'0');
			//append convert number to array for bin numbers
			binArray.push(addZero);
		}
	}

	let binAddress = "";
	//if bunArray length is 4 show results
	if(binArray.length == 4) {
		for(let i=0; i<binArray.length; i++) {
			if(i == binArray.length-1) {
				binAddress += binArray[i];
			}
			else {
				binAddress += binArray[i]+".";
			}

		}
		return binAddress;
	}
}

function check_count_hosts() {
	//mask
	let mask = document.querySelector("#mask").value;
	console.log(mask);

	return true;
	//get all count of hosts
	let hosts = document.querySelectorAll(".hostsCount");
	//sum hosts
	let sum = 0;
	for(let i=0; i<hosts.length; ++i) {
		suma += hosts[i].value;
	}
	if()

}


function select_great_mask(hostCount) {
	//mask
	let mask = "";
	//short mask prefix
	let shortMaskPrefix = "";
	//loop to select great mask for needed hosts
	for(let i=0; i<arrayWithMasks.length; ++i) {
		//convert mask to bianry
		let maskBin = convertToBin(arrayWithMasks[i]);

		//counter for 1
		let counter = 0;
		for(let i=0; i<maskBin.length; ++i) {
			if(maskBin[i] == '1') {
				counter++;
			}
		}

		//to wich pow code must calculate
		let wichPow = 32-counter;
		//pow
		let pow = Math.pow(2,wichPow);
		//hosts
		let allHosts = pow-2;

		if(allHosts >= hostCount) {
			mask = arrayWithMasks[i];
			shortMaskPrefix = counter;
		}
	}
	let maskBin = convertToBin(mask);

	let returnArray = {
		"mask": maskBin,
		"prefix": shortMaskPrefix
	};

	return returnArray;
}


function network_address(ip, newIP, maskBinOld) {
	//variable with ip in bin
	let ipBin = "";
	//check wich ip we must use
	if(newIP == "") {
		//convert ip to bin
		ipBin = convertToBin(String(ip));
	}
	else {
		//split ip addressses
		let splitIp = newIP.split('.');
		//if last part of ip is 255
		if(splitIp[3] == '255') {
			//add 1 to 3 part of ip
			let newPart = parseInt(splitIp[2]) + 1;
			//and put all together
			newIP = splitIp[0]+'.'+splitIp[1]+'.'+String(newPart)+'.0';
		}
		else {
			//but if last part is not 255
			//add 1 to last part of ip
			let newPart = parseInt(splitIp[3]) + 1;
			//and put all together
			newIP = splitIp[0]+'.'+splitIp[1]+'.'+splitIp[2]+'.'+String(newPart);
		}
		//convert ip to bin
		ipBin = convertToBin(String(newIP));	
	}

	//convert maskBin into string
	let maskBin = String(maskBinOld);

	if(ipBin !== undefined && maskBin != '0') {
		//network addres in binary
		let networkAddresBin = "";
		for(let i=0; i<ipBin.length; ++i) {
			//if ipBin[i] and maskBin[i] != '.'
			//append AND validation to networkAddresBin
			if(ipBin[i] != '.' && maskBin != '.') {
				networkAddresBin += (ipBin[i]&maskBin[i]);
			}
			//else ipBin[i] and maskBin[i] == '.'
			//append dot to networkAddresBin
			else if(ipBin[i] == '.' && maskBin[i] == '.') {
				networkAddresBin += '.';
			}

		}

		//var to networkAddress in dec
		let networkAddres = convertToDec(networkAddresBin);

		return networkAddres;
	
	}
	else {
		return undefined;
	}
}


function broadcast_address(ip, newIP, maskBinOld) {
	//convert maskBin into string
	let maskBin = String(maskBinOld);

	//netowrk address
	let netowrkAddress = String(network_address(ip, newIP, maskBinOld));

	if(netowrkAddress !== undefined && maskBin != '0') {
		//NOT mask bin
		let notMaskBin = "";
		for(let i=0; i<maskBin.length; ++i) {
			//if char in mas bin is 1 add 0
			if(maskBin[i] == '1') {
				notMaskBin+='0';
			}
			//if char in mas bin is 0 add 1
			else if(maskBin[i] == '0') {
				notMaskBin+='1';
			}
			//if char in mas bin is . add .
			else if(maskBin[i] == '.') {
				notMaskBin+='.';
			}
		}

		//convert NOT bin mask to dec
		let maskNotDec = convertToDec(notMaskBin);
		//split not dec mask 
		let splitMaskNotDec = maskNotDec.split('.');
		//split netowrk address
		let splitNetworkAddress = netowrkAddress.split('.');
		//broadcast address
		let broadcastAddress = "";
		for(let i=0; i<splitNetworkAddress.length; ++i) {
			//add data to new var
			broadcastAddress += (parseInt(splitMaskNotDec[i]) + parseInt(splitNetworkAddress[i]));
			//add dot after add data to new var
			if(i != splitNetworkAddress.length-1) {
				broadcastAddress += '.';
			}
		}

		return broadcastAddress;

	}
}


function allRun() {
	//holder for text
	let holder = document.querySelector("#textHolderDiv");
	//ip from input
	let ip = document.querySelector("#ipaddress").value;
	//other ip
	let newIp = "";

	//select all input with hosts class
	let allHosts = document.querySelectorAll(".hostsCount");

	//if isset p with results delete
	if(document.querySelectorAll(".text").length > 0) {
		let resultText = document.querySelectorAll(".text");
		//loop to delete old results
		for(let i=0; i<resultText.length; ++i) {
			//delete old results
			resultText[i].remove();
		}
	}

	for(let i=0; i<document.querySelector("#submasksCount").value; ++i) {
		//create p
		let p = document.createElement("P");
		//set classname
		p.className = "text"
		//set text for <p>
		let x = i+1;
		//mask in dec
		let mask = select_great_mask(allHosts[i].value);
		p.innerHTML = x+'. '+network_address(ip, newIp, mask["mask"])+' --> '+broadcast_address(ip, newIp, mask["mask"])+' /'+mask["prefix"];
		//append into holder
		holder.appendChild(p);
		newIp = broadcast_address(ip, newIp, mask["mask"]);
	}

	$("#textHolderDiv").css("animation-name", "submit");
	$(".text").css("animation-name", "submitText");



}









