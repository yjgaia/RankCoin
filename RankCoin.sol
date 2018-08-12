pragma solidity ^0.4.24;

import "./ERC20.sol";
import "./SafeMath.sol";

contract RankCoin is ERC20 {
	using SafeMath for uint256;
	
	// 토큰 정보
	string constant public NAME = "RankCoin";
	string constant public SYMBOL = "RC";
	uint8 constant public DECIMALS = 18;
	uint256 constant public TOTAL_SUPPLY = 100000000000 * (10 ** uint256(DECIMALS));
	
	mapping(address => uint256) public balances;
	mapping(address => mapping(address => uint256)) public allowed;
	
	// 사용자들 주소
	address[] public users;
	mapping(address => string) public names;
	mapping(address => string) public messages;
	
	function getUserCount() view public returns (uint256) {
		return users.length;
	}
	
	// 유저가 이미 존재하는지
	mapping(address => bool) internal userToIsExisted;
	
	constructor() public {
		
		balances[msg.sender] = TOTAL_SUPPLY;
		
		// 유저 주소 등록
		if (userToIsExisted[msg.sender] != true) {
			users.push(msg.sender);
			userToIsExisted[msg.sender] = true;
		}
		
		emit Transfer(0x0, msg.sender, TOTAL_SUPPLY);
	}
	
	// 주소를 잘못 사용하는 것인지 체크
	function checkAddressMisused(address target) internal view returns (bool) {
		return
			target == address(0) ||
			target == address(this);
	}
	
	//ERC20: 토큰의 이름 반환
	function name() external view returns (string) {
		return NAME;
	}
	
	//ERC20: 토큰의 심볼 반환
	function symbol() external view returns (string) {
		return SYMBOL;
	}
	
	//ERC20: 토큰의 소수점 반환
	function decimals() external view returns (uint8) {
		return DECIMALS;
	}
	
	//ERC20: 전체 토큰 수 반환
	function totalSupply() external view returns (uint256) {
		return TOTAL_SUPPLY;
	}
	
	//ERC20: 특정 유저의 토큰 수를 반환합니다.
	function balanceOf(address user) external view returns (uint256 balance) {
		return balances[user];
	}
	
	//ERC20: 특정 유저에게 토큰을 전송합니다.
	function transfer(address to, uint256 amount) external payable returns (bool success) {
		
		// 주소 오용 차단
		require(checkAddressMisused(to) != true);
		
		require(amount <= balances[msg.sender]);
		
		balances[msg.sender] = balances[msg.sender].sub(amount);
		balances[to] = balances[to].add(amount);
		
		emit Transfer(msg.sender, to, amount);
		
		return true;
	}
	
	//ERC20: spender에 amount만큼의 토큰을 보낼 권리를 부여합니다.
	function approve(address spender, uint256 amount) external payable returns (bool success) {
		
		allowed[msg.sender][spender] = amount;
		
		emit Approval(msg.sender, spender, amount);
		
		return true;
	}
	
	//ERC20: spender에 인출을 허락한 토큰의 양을 반환합니다.
	function allowance(address user, address spender) external view returns (uint256 remaining) {
		return allowed[user][spender];
	}
	
	//ERC20: 허락된 spender가 from으로부터 amount만큼의 토큰을 to에게 전송합니다.
	function transferFrom(address from, address to, uint256 amount) external payable returns (bool success) {
		
		// 주소 오용 차단
		require(checkAddressMisused(to) != true);
		
		require(amount <= balances[from]);
		require(amount <= allowed[from][msg.sender]);
		
		balances[from] = balances[from].sub(amount);
		balances[to] = balances[to].add(amount);
		
		allowed[from][msg.sender] = allowed[from][msg.sender].sub(amount);
		
		emit Transfer(from, to, amount);
		
		return true;
	}
	
	// 토큰을 많이 가진 순서대로 유저의 ID 목록을 가져옵니다.
	function getUserIdsByBalance() view public returns (uint256[]) {
		uint256[] memory userIds = new uint256[](users.length);
		
		for (uint256 i = 0; i < users.length; i += 1) {
			
			uint256 balance = balances[users[i]];
			
			for (uint256 j = i; j > 0; j -= 1) {
				if (balances[users[userIds[j - 1]]] < balance) {
					userIds[j] = userIds[j - 1];
				} else {
					break;
				}
			}
			
			userIds[j] = i;
		}
		
		return userIds;
	}
	
	// 이름을 지정합니다.
	function setName(string _name) public {
		names[msg.sender] = _name;
	}
	
	// 메시지를 지정합니다.
	function setMessage(string message) public {
		messages[msg.sender] = message;
	}
}