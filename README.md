

Example of how to use the web3 sdk

## Installation

npm
```bash
npm install dragonlabz-implementical-web3-sdk 
```

yarn
```bash
yarn add dragonlabz-implementical-web3-sdk 
```

## Usage

ES6 usage
```javascript
import Web3Sdk from 'dragonlabz-implementical-web3-sdk';

const web3 = Web3Sdk();

useEffect(() => {
web3.getOffChainSignature([1,2,3]).then(console.log).catch(console.log);
}, []);
```

Web usage
```html
<script type="module">
    import Web3Sdk from './web_usage.js';
    const web3Sdk = new Web3Sdk();
    web3Sdk.getOffChainSignature([1, 2, 3]).then((result)=> console.log('offchain signature: ', result));
</script>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

