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


function network_address() {
	//get ip value
	let IPaddress = document.querySelector('#ipaddress').value;
	//run previous function with convert to bin
	let ipBin = convertToBin(IPaddress);

	//get mask value from select
	let mask = document.querySelector('#masksSelector').value;
	//convert mask to bianry
	let maskBin = convertToBin(mask);

	if(ipBin !== undefined && mask != '') {

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


function broadcast_address() {
	//get mask value from select
	let mask = document.querySelector('#masksSelector').value;
	//convert mask to bianry
	let maskBin = convertToBin(mask);

	//netowrk address
	let netowrkAddress = network_address();
	if(netowrkAddress !== undefined && mask != '0') {
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

function hosts() {
	//network address
	let networkAddress = network_address();
	//broadcast address
	let broadcastAddress = broadcast_address();

	if(networkAddress !== undefined) {
		//split network address
		const splitNetworkAddress = networkAddress.split('.');
		//get last length 
		let lengthSplitNetwork = splitNetworkAddress.length - 1;
		//chnage last value from address
		let lastValueNetoworkAddress = parseInt(splitNetworkAddress[lengthSplitNetwork]) + 1;

		//first host in netowrk
		let firsHost = "";
		for(let i=0; i<splitNetworkAddress.length; ++i) {
			//if i ist last element of splitNetworkAddress
			//append elements from splitNetworkAddress
			if(i!=splitNetworkAddress.length-1) {
				firsHost += splitNetworkAddress[i];
				firsHost+='.';
			}
			//else append modify last value to addres
			else if(i == splitNetworkAddress.length-1) {
				firsHost += lastValueNetoworkAddress;
			}
		}




		//calculate last host in netowrk
		//split broadcast address
		const splitBroadcast = broadcastAddress.split('.');
		//get last length 
		let lengthSplitBroadcast = splitBroadcast.length - 1;
		//chnage last value from address
		let lastvalueBroadcastAddress = parseInt(splitBroadcast[lengthSplitBroadcast]) - 1;

		//first host in netowrk
		let lastHost = "";
		for(let i=0; i<splitBroadcast.length; ++i) {
			//if i ist last element of splitBroadcast
			//append elements from splitBroadcast
			if(i!=splitBroadcast.length-1) {
				lastHost += splitBroadcast[i];
				lastHost+='.';
			}
			//else append modify last value to addres
			else if(i == splitBroadcast.length-1) {
				lastHost += lastvalueBroadcastAddress;
			}
		}

		//array with return value
		const objectWithHosts = {
			"firstHost":firsHost,
			"lastHost":lastHost
		};

		return objectWithHosts;
	}
}


function all_hosts() {
	//get mask value from select
	let mask = document.querySelector('#masksSelector').value;
	//convert mask to bianry
	let maskBin = convertToBin(mask);

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
	let pow = Math.pow(2,wichPow );
	//hosts
	let allHosts = pow-2;
	
	return allHosts;

}


function print_data() {
	//get input value
	let IPaddress = document.querySelector('#ipaddress').value;
	//get mask value from select
	let mask = document.querySelector('#masksSelector').value;
	//object with hosts
	let hostObject = hosts();

	if((network_address() !== undefined) && (mask != "")) {
		//run animation on click
		$("#holder").css("animation-name", "submit");
		//run function with fadeIn in jquery
		$("#text").fadeIn(2500);

		let resultsText = "IP address: "+IPaddress+'<br>'+"Mask: "+mask+'<br>'+"Network address: "+network_address()+'<br>'+
		"Broadcast address: "+broadcast_address()+'<br>'+"First host: "+hostObject['firstHost']+'<br>'+"Last host: "+hostObject['lastHost']+'<br>'+
		"All hosts: "+all_hosts();

		document.querySelector("#text").innerHTML = resultsText;
	}

	else if((mask == '') && (IPaddress == "")) {
		alert("Nie wpisano adresu IP i nie wybrano maski!"); 
	}

	else if(mask == "" && convertToBin(IPaddress) != undefined) {
		alert("Maska nie została wybrana!");
	}
	else if(IPaddress == "" && mask != "") {
		alert("Nie wpisano adresu IP!");
	}
	else if(network_address() == undefined && mask != "") {
		alert("Adres IP jest niepoprawny!");
	}

	else if(mask == "" && network_address() == undefined) {
		alert("Maska nie została wybrana i adres IP jest niepoprawny!");
	}

}







