var vows = require('vows'),
    assert = require('assert'),
    Thing = require('../thing.js').Thing;

vows.describe('Thing.create').addBatch({

  'with single inheritance': {
    topic: function() {
      var base = Object.create(null);
      base.func = function() { };

      return base;
    },

    'we get an object which': {
      'is instance of base': function(topic) {
        var o = Thing.create(topic);

        assert.isTrue(o instanceof topic);
      }
    }
  }

});
