RUN(() => {
	
	H1({
		style : {
			fontSize : 30,
			fontWeight : 'bold',
			padding : 10
		},
		c : UUI.BUTTON_H({
			icon : IMG({
				style : {
					height : 40,
					marginBottom : -8
				},
				src : 'resource/icon.png'
			}),
			spacing : 10,
			title : 'RankCoin'
		})
	}).appendTo(BODY);
	
	P({
		style : {
			padding : 10
		},
		c : ['RankCoin은 보유량으로 랭킹을 매겨주는 ERC-20 코인입니다.\n그냥 만들어 봤습니다.', A({
			style : {
				marginLeft : 5,
				color : '#3366CC',
				fontWeight : 'bold'
			},
			href : 'https://github.com/Hanul/RankCoin',
			c : '소스코드'
		})]
	}).appendTo(BODY);
	
	let myCoinPanel;
	let myNamePanel;
	let myMessagePanel;
	P({
		style : {
			padding : 10
		},
		c : [
		'내 지갑 주소: ' + WalletManager.getWalletAddress(),
		myCoinPanel = DIV(),
		myNamePanel = DIV(),
		myMessagePanel = DIV(),
		A({
			style : {
				color : '#3366CC',
				fontWeight : 'bold'
			},
			c : '코인 전송',
			on : {
				tap : () => {
					let to = prompt('받을 사람의 지갑 주소');
					if (to !== TO_DELETE) {
						let amount = prompt('몇 코인을 전송하시겠습니까?');
						if (amount !== TO_DELETE) {
							amount *= Math.pow(10, 18);
							ContractController.transfer(to, amount);
						}
					}
				}
			}
		})]
	}).appendTo(BODY);
	
	ContractController.on('ChangeName', (params) => {
		console.log('ChangeName', params);
	});
	
	ContractController.on('ChangeMessage', (params) => {
		console.log('ChangeMessage', params);
	});
	
	ContractController.on('Transfer', (params) => {
		console.log('Transfer', params);
	});
	
	ContractController.on('Approval', (params) => {
		console.log('Approval', params);
	});
	
	NEXT([
	(next) => {
		ContractController.balanceOf(WalletManager.getWalletAddress(), (balanceStr) => {
			
			if (balanceStr.length > 18) {
				let index = balanceStr.length - 18;
				balanceStr = balanceStr.substring(0, index) + '.' + balanceStr.substring(index);
			} else {
				let appendix = '0.';
				REPEAT(18 - balanceStr.length, () => {
					appendix += '0';
				});
				balanceStr = appendix + balanceStr;
			}
			
			let str = balanceStr.split('.');
			if (str[0].length >= 5) {
				str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
			}
			if (str[1] && str[1].length >= 5) {
				str[1] = str[1].replace(/(\d{3})/g, '$1 ');
			}
			
			myCoinPanel.append(DIV({
				c : ['내 보유 코인: ', str[0], '.', SPAN({
					style : {
						fontSize : '0.5em'
					},
					c : str[1]
				})]
			}));
			next();
		});
	},
	
	(next) => {
		return () => {
			
			ContractController.getName(WalletManager.getWalletAddress(), (name) => {
				if (name === '') {
					myNamePanel.append(SPAN({
						c : '이름이 지정되어 있지 않습니다.'
					}));
				} else {
					myNamePanel.append(SPAN({
						c : '내 이름: ' + name
					}));
				}
				myNamePanel.append(A({
					style : {
						marginLeft : 5,
						color : '#3366CC',
						fontWeight : 'bold'
					},
					c : '이름 변경',
					on : {
						tap : () => {
							let name = prompt('이름을 입력해주세요.');
							if (name !== TO_DELETE) {
								ContractController.setName(name);
							}
						}
					}
				}));
				
				next();
			});
		};
	},
	
	() => {
		return () => {
			
			ContractController.getMessage(WalletManager.getWalletAddress(), (message) => {
				if (message === '') {
					myMessagePanel.append(SPAN({
						c : '메시지가 지정되어 있지 않습니다.'
					}));
				} else {
					myMessagePanel.append(SPAN({
						c : '내 메시지: ' + message
					}));
				}
				myMessagePanel.append(A({
					style : {
						marginLeft : 5,
						color : '#3366CC',
						fontWeight : 'bold'
					},
					c : '메시지 변경',
					on : {
						tap : () => {
							let message = prompt('메시지를 입력해주세요.');
							if (message !== TO_DELETE) {
								ContractController.setMessage(message);
							}
						}
					}
				}));
			});
		};
	}]);
	
	let width = WIN_WIDTH() / 3;
	
	let loadingRankPanel;
	let rankList = UUI.PANEL({
		style : {
			flt : 'left',
			width : width
		},
		contentStyle : {
			padding : 10
		},
		c : [H2({
			style : {
				fontSize : 20,
				fontWeight : 'bold',
				marginBottom : 10
			},
			c : '랭킹'
		}), loadingRankPanel = P({
			c : '랭킹을 불러오는 중입니다.'
		})]
	}).appendTo(BODY);
	
	ContractController.getUsersByBalance((users) => {
		
		loadingRankPanel.remove();
		
		EACH(users, (user, rank) => {
		
			ContractController.getRank(user, console.log);
			
			let fontSize = 25 - rank;
			if (fontSize < 5) {
				fontSize = 5;
			}
			
			let nameWrapper;
			let item = DIV({
				style : {
					marginBottom : 30,
					fontSize : fontSize
				},
				c : ['#' + (rank + 1), nameWrapper = SPAN({
					style : {
						marginLeft : 10
					},
					c : user
				})]
			}).appendTo(rankList);
			
			NEXT([
			(next) => {
				ContractController.balanceOf(user, (balanceStr) => {
					
					if (balanceStr.length > 18) {
						let index = balanceStr.length - 18;
						balanceStr = balanceStr.substring(0, index) + '.' + balanceStr.substring(index);
					} else {
						let appendix = '0.';
						REPEAT(18 - balanceStr.length, () => {
							appendix += '0';
						});
						balanceStr = appendix + balanceStr;
					}
					
					let str = balanceStr.split('.');
					if (str[0].length >= 5) {
						str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
					}
					if (str[1] && str[1].length >= 5) {
						str[1] = str[1].replace(/(\d{3})/g, '$1 ');
					}
					
					item.append(DIV({
						c : ['보유 코인: ', str[0], '.', SPAN({
							style : {
								fontSize : fontSize * 0.5
							},
							c : str[1]
						})]
					}));
					next();
				});
			},
			
			(next) => {
				return () => {
					
					ContractController.getName(user, (name) => {
						if (name !== '') {
							nameWrapper.empty();
							nameWrapper.append(SPAN({
								c : name
							}));
							nameWrapper.append(SPAN({
								style : {
									marginLeft : 5,
									fontSize : fontSize * 0.8
								},
								c : '(' + user + ')'
							}));
						}
						next();
					});
				};
			},
			
			() => {
				return () => {
					
					ContractController.getMessage(user, (message) => {
						if (message !== '') {
							item.append(DIV({
								c : '메시지: ' + message
							}));
						}
					});
				};
			}]);
		});
	});
	
	let exchangeList = UUI.PANEL({
		style : {
			flt : 'left',
			width : width
		},
		contentStyle : {
			padding : 10
		},
		c : [H2({
			style : {
				fontSize : 20,
				fontWeight : 'bold',
				marginBottom : 10
			},
			c : '거래'
		}), P({
			c : '거래 기능은 개발중입니다.'
		})]
	}).appendTo(BODY);
	
	let bannerList = UUI.PANEL({
		style : {
			flt : 'left',
			width : width
		},
		contentStyle : {
			padding : 10
		},
		c : [H2({
			style : {
				fontSize : 20,
				fontWeight : 'bold',
				marginBottom : 10
			},
			c : '배너'
		}), P({
			c : ['RankCoin을 사용하는 서비스나 게임의 배너 광고를 꽁짜로 달아드립니다.\n문의 : ', A({
				style : {
					color : '#3366CC'
				},
				src : 'mailto:hanul@hanul.me',
				c : 'hanul@hanul.me'
			})]
		})]
	}).appendTo(BODY);
	
	CLEAR_BOTH().appendTo(BODY);
});
