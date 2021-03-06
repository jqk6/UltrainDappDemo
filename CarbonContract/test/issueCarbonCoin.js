/**
 * @author rayguo@ultrain.io
 */
const U3Utils = require('u3-utils/dist/es5');
const { createU3, format } = require('u3.js/src');
const config = require('../config');

const chai = require('chai');
require('chai')
    .use(require('chai-as-promised'))
    .should();

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

describe('Contract\'s test cases', function() {

    it('create and issue a token', async () => {

        let SYMBOL = 'CARB';

        const u3 = createU3(config);
        let account = 'ben';
        const tx = await u3.transaction(account, token => {

            token.create(account, '10000000.0000 ' + SYMBOL);
            token.issue(account, '10000000.0000 ' + SYMBOL, 'issue');

        });

        //wait util it was packed in a block
        let tx_trace = await u3.getTxByTxId(tx.transaction_id);
        while (!tx_trace.irreversible) {
            await U3Utils.wait(1000);
            tx_trace = await u3.getTxByTxId(tx.transaction_id);
            if (tx_trace.irreversible) {
                console.log(tx);
                break;
            }
        }

    });
});
