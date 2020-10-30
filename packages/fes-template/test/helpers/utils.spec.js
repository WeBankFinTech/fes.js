import { expect } from 'chai';
import { add, cf } from '@/helpers/utils';

describe('utils.js', () => {
    it('1+2 = 3', () => {
        expect(add(1, 2)).to.equal(3);
    });

    it('1*2 = 2', () => {
        expect(cf(1, 2)).to.equal(2);
    });
});
