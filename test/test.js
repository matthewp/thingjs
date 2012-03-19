var vows = require('vows'),
    assert = require('assert'),
    Thing = require('../thing.js').Thing;

vows.describe('Thing.create').addBatch({

  'with single inheritance': {
    topic: function() {
      var base = {};
      base.func = function() { };

      return base;
    },

    'we get an object which': {
      'is prototype of base': function(topic) {
        var o = Thing.create(topic);

        var doesInherit = topic.isPrototypeOf(o);
        assert.isTrue(doesInherit);
      }
    }
  }

}).export(module);
