RUN(() => {
	
	H1({
		c : 'RankCoin'
	}).appendTo(BODY);
	
	ContractController.getMessage(WalletManager.getWalletAddress(), (test) => {
		console.log(test);
	});
});
