RUN(() => {
	
	H1({
		c : 'RankCoin'
	}).appendTo(BODY);
	
	let list = DIV().appendTo(BODY);
	
	ContractController.getUserIdsByBalance((users) => {
		EACH(users, (user) => {
			
			let item = DIV({
				c : user
			}).appendTo(list);
			
			NEXT([
			(next) => {
				ContractController.balanceOf(user, (balance) => {
					item.append(P({
						c : balance
					}));
					next();
				});
			},
			
			(next) => {
				return () => {
					
					ContractController.getName(user, (name) => {
						item.append(P({
							c : name
						}));
						next();
					});
				};
			},
			
			() => {
				return () => {
					
					ContractController.getMessage(user, (message) => {
						item.append(P({
							c : message
						}));
					});
				};
			}]);
		});
	});
});
