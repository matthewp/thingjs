var vows = require('vows'),
    assert = require('assert'),
    Thing = require('../thing.js');

debugger;

vows.describe('Mixins').addBatch({

  'with mixins': {
    topic: function() {
      var a = {};
      a.isRightHanded = true;

      var b = {};
      b.isLeftHanded = true;

      var c = Thing.create([ a, b ], {

        isAmbidextrous: function() {
          return this.isRightHanded && this.isLeftHanded;
        }

      });

      return [ a, b, c ];
    },

    'we get an object which': {
      'is prototype of the first base': function(topic) {
        var a = topic[0],
            b = topic[1],
            c = topic[2];

        assert.isTrue(a.isPrototypeOf(c));
      },

      'has properties of both bases': function(topic) {
        var a = topic[0],
            b = topic[1],
            c = topic[2];

        var hasA = typeof c['isRightHanded'] !== 'undefined',
            hasB = typeof c['isLeftHanded'] !== 'undefined';

        assert.isTrue(hasA && hasB);
      },

      'retains its own property': function(topic) {
        var c = topic[2];

        var hasProp = typeof c['isAmbidextrous'] === 'function';
        assert.isTrue(hasProp);
      }
    }
  }

}).export(module);
