var vows = require('vows'),
    assert = require('assert'),
    Thing = require('../thing.js').Thing;

debugger;

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
      },

      'has a property named func': function(topic) {
        var o = Thing.create(topic);

        assert.isTrue(typeof o.func !== 'undefined');
      },

      'has a function named func': function(topic) {
        var o = Thing.create(topic);

        assert.isTrue(typeof o.func === 'function');
      },

      'when properties are added': {
        topic: function(base) {
          var o = Thing.create(base, {
            go: function() { }
          });

          return o;
        },

        'property exists on object': function(o) {
          assert.isTrue(o.hasOwnProperty('go'));
        },

        'property is writable': function(o) {
          var d = Object.getOwnPropertyDescriptor(o, 'go');

          assert.isTrue(d.writable);
        }
      }
    }
  }

}).export(module);
