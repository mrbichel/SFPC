var blockchain = require('blockchain.info');

var blockexplorer = blockchain.blockexplorer;




// pseudo 


// get most recent block 

// for each transaction get words
// compare to word list or check if hash is hex encoded words


blockexplorer.getLatestBlock(function(error, data) {

	//console.log(data);


	for(tx in data.txIndexes) {
		//console.log(data.txIndexes[tx]);


		blockexplorer.getTx(data.txIndexes[tx], function(error, data) {

				console.log(data.txIndexes[tx]);


		});

	}

});

