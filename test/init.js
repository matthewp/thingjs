var vows = require('vows'),
    assert = require('assert'),
    Thing = require('../thing.js').Thing;

debugger;

vows.describe('Initialization').addBatch({

  'with initing': {
    'a singley inheritted thing': {
      topic: function() {
        var a = {
          init: function() {
            this.word = 'foo';
          },

          getWord: function() {
            return this.word;
          }
        };

        var b = Thing.create(a, {
          init: function() {
            this.word = 'bar';
          }
        }, true);

        return b;
      },

      'we get an object which': {
        'exists': function(topic) {
          assert.isTrue(typeof topic !== 'undefined');
        },

        'inherits from a': function(topic) {
          assert.isTrue(typeof topic.getWord === 'function');
        },

        'but has an initial value created in b': function(topic) {
          assert.equal(topic.getWord(), 'bar');
        }
      }
    },

    'a thing with init args': {
      topic: function() {
        var a = {
          init: function() {
            this.word = 'foo';
          },

          getWord: function() {
            return this.word;
          }
        };

        var b = Thing.create(a, {
          init: function(type, fee) { 
            this.word = 'bar';
            this.type = type;
            this.fee = fee;
          }
        }, true, 'foo', 'fi');

        return b;
      },

      'has the first argument applied': function(topic) {
        assert.equal(topic.type, 'foo');
      },

      'has the second argument applied': function(topic) {
        assert.equal(topic.fee, 'fi');
      }
    }
  }

}).export(module);
