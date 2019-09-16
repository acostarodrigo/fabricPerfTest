/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

'use strict';

const assert = require('assert');
const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./js-smart-contract-util');
const os = require('os');
const path = require('path');

describe('PerfTestContract-perfTest@0.0.1' , () => {

    const homedir = os.homedir();
    const walletPath = path.join(homedir, '.fabric-vscode', 'wallets', 'local_fabric_wallet');
    const gateway = new fabricNetwork.Gateway();
    const wallet = new fabricNetwork.FileSystemWallet(walletPath);
    const identityName = 'admin';
    let connectionProfile;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
    });

    beforeEach(async () => {

        const discoveryAsLocalhost = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled = true;

        const options = {
            wallet: wallet,
            identity: identityName,
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled
            }
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe('generateId', () =>{
        it('should submit generateId transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'generateId', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('perfTestExists', () =>{
        it('should submit perfTestExists transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'perfTestExists', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createPerfTest', () =>{
        it('should submit createPerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'createPerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readPerfTest', () =>{
        it('should submit readPerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'readPerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updatePerfTest', () =>{
        it('should submit updatePerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'updatePerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deletePerfTest', () =>{
        it('should submit deletePerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'deletePerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('getTransient', () =>{
        it('should submit getTransient transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'getTransient', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('privatePerfTestExists', () =>{
        it('should submit privatePerfTestExists transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'privatePerfTestExists', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createPrivatePerfTest', () =>{
        it('should submit createPrivatePerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'createPrivatePerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readPrivatePerfTest', () =>{
        it('should submit readPrivatePerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'readPrivatePerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updatePrivatePerfTest', () =>{
        it('should submit updatePrivatePerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'updatePrivatePerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deletePrivatePerfTest', () =>{
        it('should submit deletePrivatePerfTest transaction', async () => {
            // TODO: Update with parameters of transaction
            const args = [];

            const response = await SmartContractUtil.submitTransaction('PerfTestContract', 'deletePrivatePerfTest', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
