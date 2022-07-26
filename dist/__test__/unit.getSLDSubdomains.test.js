"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../index");
dotenv_1.default.config();
const opId = process.env.OPERATOR_ID;
const opKey = process.env.OPERATOR_PVKEY;
describe('test getSLDSubdomains function', () => {
    jest.setTimeout(1000 * 20);
    // As of now, this test requires there to be a domain by the name of "sld1.hbar" registered
    // and has one or more subdomains registered under it.
    it('should be able to query SLDInfo for a domain', async () => {
        if (!opId || !opKey) {
            fail('This test requires data from the env file');
        }
        const h = new index_1.HashgraphNames(opId, opKey);
        const domain = 'sld1.hbar';
        const subdomains = await h.getSLDSubdomains(domain);
        expect(subdomains.length).toBeGreaterThan(0);
        const index = subdomains[0].indexOf(domain);
        expect(index).not.toEqual(-1);
    });
});