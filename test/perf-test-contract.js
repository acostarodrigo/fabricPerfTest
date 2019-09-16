/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { PerfTestContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('PerfTestContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PerfTestContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"perf test 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"perf test 1002 value"}'));
    });

    describe('#perfTestExists', () => {

        it('should return true for a perf test', async () => {
            await contract.perfTestExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a perf test that does not exist', async () => {
            await contract.perfTestExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createPerfTest', () => {

        it('should create a perf test', async () => {
            await contract.createPerfTest(ctx, '1003', 'perf test 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"perf test 1003 value"}'));
        });

        it('should throw an error for a perf test that already exists', async () => {
            await contract.createPerfTest(ctx, '1001', 'myvalue').should.be.rejectedWith(/The perf test 1001 already exists/);
        });

    });

    describe('#readPerfTest', () => {

        it('should return a perf test', async () => {
            await contract.readPerfTest(ctx, '1001').should.eventually.deep.equal({ value: 'perf test 1001 value' });
        });

        it('should throw an error for a perf test that does not exist', async () => {
            await contract.readPerfTest(ctx, '1003').should.be.rejectedWith(/The perf test 1003 does not exist/);
        });

    });

    describe('#updatePerfTest', () => {

        it('should update a perf test', async () => {
            await contract.updatePerfTest(ctx, '1001', 'perf test 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"perf test 1001 new value"}'));
        });

        it('should throw an error for a perf test that does not exist', async () => {
            await contract.updatePerfTest(ctx, '1003', 'perf test 1003 new value').should.be.rejectedWith(/The perf test 1003 does not exist/);
        });

    });

    describe('#deletePerfTest', () => {

        it('should delete a perf test', async () => {
            await contract.deletePerfTest(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a perf test that does not exist', async () => {
            await contract.deletePerfTest(ctx, '1003').should.be.rejectedWith(/The perf test 1003 does not exist/);
        });

    });

});