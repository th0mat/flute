/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;


describe('counter actions', () => {
  it('should pass', () => {
    expect(3+5).to.be.equal(8);
  });

  it('should fail', () => {
    expect(3+5).to.be.equal(9);
  });


});
