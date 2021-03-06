/* global describeModule, chai */
const Rx = require('rxjs');
const operators = require('rxjs/operators');

const mock = {
  rxjs: Rx,
  'rxjs/operators': operators,
  'core/url': {
    getDetailsFromUrl: () => ({}),
  }
};

export default describeModule('search/telemetry',
  () => mock,
  () => {
    describe('#parseKindItem', function () {
      let parseKindItem;

      beforeEach(function () {
        parseKindItem = this.module().parseKindItem;
      });

      it('parses source only', function () {
        chai.expect(parseKindItem('m')).to.deep.equal({
          source: 'm',
          class: undefined,
        });
      });

      it('parses source and class', function () {
        chai.expect(parseKindItem('X|{"class":"EntityGeneric"}')).to.deep.equal({
          source: 'X',
          class: 'EntityGeneric',
        });
      });

      it('parses with missing params', function () {
        chai.expect(parseKindItem('X|')).to.deep.equal({
          source: 'X',
          class: undefined,
        });
      });
    });

    describe('#parseKind', function () {
      let parseKind;

      beforeEach(function () {
        parseKind = this.module().parseKind;
      });

      it('extracts sources and classes', function () {
        chai.expect(parseKind(['m', 'X|{"class":"EntityGeneric"}'])).to.deep.equal({
          sources: ['m', 'X'],
          classes: ['EntityGeneric'],
        });
      });

      it('removes duplicates', function () {
        chai.expect(parseKind(['m', 'n', 'm'])).to.deep.equal({
          sources: ['m', 'n'],
          classes: [],
        });
      });
    });
  });
