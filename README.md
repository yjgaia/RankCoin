# RankCoin
RankCoin은 보유량으로 랭킹을 매겨주는 [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) 코인입니다.

## 기능 목록
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `name()` 토큰의 이름 반환
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `symbol()` 토큰의 심볼 반환
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `decimals()` 토큰의 소수점 반환
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `totalSupply()` 전체 토큰 수 반환
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `balanceOf(address user)` 특정 유저의 토큰 수를 반환합니다.
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `transfer(address to, uint256 amount)` 특정 유저에게 토큰을 전송합니다.
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `approve(address spender, uint256 amount)` spender에 amount만큼의 토큰을 보낼 권리를 부여합니다.
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `allowance(address user, address spender)` spender에 인출을 허락한 토큰의 양을 반환합니다.
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `transferFrom(address from, address to, uint256 amount)`허락된 spender가 from으로부터 amount만큼의 토큰을 to에게 전송합니다.
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `getUserIdsByBalance()` 토큰을 많이 가진 순서대로 유저의 ID 목록을 가져옵니다.
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `setName(string _name)` 이름을 지정합니다.
- ![테스트 여부](https://img.shields.io/badge/테스트%20여부-yes-brightgreen.svg) `setMessage(string message)` 메시지를 지정합니다.

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)
