/* eslint-disable */
// get balance
web3.eth.getBalance('0x1cda875dc3f79a4c3418627194e7f91be2412180').toString()
web3.fromWei(web3.eth.getBalance('0x05058c65fbe27f5bd2539c387348ef6a396c4570')).toString()

// assign SentenceChain deployed to an instance
let inst
SentenceChain.deployed().then(x => (inst = x))

inst.createSentence(web3.fromAscii('hello'), 0)

inst.SentenceCreated({}, { fromBlock: 0, toBlock: 'latest' })
	.get((error, eventResult) => {
		if (error)
			console.log('Error in myEvent event handler: ' + error);
		else
			console.log('myEvent: ' + JSON.stringify(eventResult.args));
	});

inst.SentenceCreated({}, { fromBlock: 0, toBlock: 'latest' }, (error, eventResult) => {
	if (error)
		console.log('Error in myEvent event handler: ' + error);
	else
		console.log('myEvent: ' + JSON.stringify(eventResult.args));
})

