var vows = require('vows'),
    assert = require('assert'),
    Thing = require('../thing.js').Thing;

debugger;

vows.describe('Multiple inheritance').addBatch({

  'with multiple inheritance': {
    topic: function() {
      var a = {};
      a.isRightHanded = true;

      var b = {};
      b.isLeftHanded = true;

      var c = Thing.create([ a, b ], {

        get isAmbidextrous () {
          return this.isRightHanded
            && this.isLeftHanded;
        }

      });

      return [ a, b, c ];
    },

    'we get an object which': {
      'is prototype of both bases': function(topic) {
        var a = topic[0],
            b = topic[1],
            c = topic[2];

        assert.isTrue(b.isPrototypeOf(c));
      },
    }
  }

}).export(module);
