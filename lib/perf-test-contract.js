/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class PerfTestContract extends Contract {

    async generateId(ctx) {
        const txId = ctx.stub.getTxID();
        const txTimestamp = ctx.stub.getTxTimestamp();

        return uuid(`${txId}_${txTimestamp}`);
    }

    async perfTestExists(ctx, perfTestId) {
        const buffer = await ctx.stub.getState(perfTestId);
        return (!!buffer && buffer.length > 0);
    }

    async createPerfTest(ctx, value) {
        const perfTestId = await this.generateId(ctx);

        const exists = await this.perfTestExists(ctx, perfTestId);
        if (exists) {
            throw new Error(`The perf test ${perfTestId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(perfTestId, buffer);

        return perfTestId;
    }

    async readPerfTest(ctx, perfTestId) {
        const exists = await this.perfTestExists(ctx, perfTestId);
        if (!exists) {
            throw new Error(`The perf test ${perfTestId} does not exist`);
        }
        const buffer = await ctx.stub.getState(perfTestId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePerfTest(ctx, perfTestId, newValue) {
        const exists = await this.perfTestExists(ctx, perfTestId);
        if (!exists) {
            throw new Error(`The perf test ${perfTestId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(perfTestId, buffer);

        return perfTestId;
    }

    async deletePerfTest(ctx, perfTestId) {
        const exists = await this.perfTestExists(ctx, perfTestId);
        if (!exists) {
            throw new Error(`The perf test ${perfTestId} does not exist`);
        }
        await ctx.stub.deleteState(perfTestId);

        return perfTestId;
    }

    // Same as above but for private data

    /**
     * Method to get private data from transient. We only get first value.
     * @param {*} ctx 
     */
    async getTransient(ctx) {        
        const transient = await ctx.stub.getTransient();                
        if (transient.size == 0){ 
            throw new Error (`No transient data detected.`);
        }        
        for (const key in transient.map){        
            // we get the values and validate they have data   
            let value = transient.map[key];  
            var data = value.value.toString('utf8');
                        
            if (!data){
                throw new Error (`No values found on private data: ${data}`);
            }
            return data;
        }        
    }
    async privatePerfTestExists(ctx, perfTestId) {
        const buffer = await ctx.stub.getPrivateData(perfTestId);
        return (!!buffer && buffer.length > 0);
    }

    async createPrivatePerfTest(ctx) {
        const perfTestId = await this.generateId(ctx);

        const value = await this.getTransient(ctx);

        const exists = await this.privatePerfTestExists(ctx, perfTestId);
        if (exists) {
            throw new Error(`The perf test ${perfTestId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putPrivateData(perfTestId, buffer);

        return perfTestId;
    }

    async readPrivatePerfTest(ctx, perfTestId) {
        const exists = await this.privatePerfTestExists(ctx, perfTestId);
        if (!exists) {
            throw new Error(`The perf test ${perfTestId} does not exist`);
        }
        const buffer = await ctx.stub.getPrivateData(perfTestId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePrivatePerfTest(ctx, perfTestId) {
        const newValue = await this.getTransient(ctx);
        const exists = await this.privatePerfTestExists(ctx, perfTestId);
        if (!exists) {
            throw new Error(`The perf test ${perfTestId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putPrivateData(perfTestId, buffer);

        return perfTestId;
    }

    async deletePrivatePerfTest(ctx, perfTestId) {
        const exists = await this.privatePerfTestExists(ctx, perfTestId);
        if (!exists) {
            throw new Error(`The perf test ${perfTestId} does not exist`);
        }
        await ctx.stub.deletePrivateData(perfTestId);
    }

}

module.exports = PerfTestContract;
