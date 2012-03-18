var Thing = Object.create(null);
Thing.create = function(proto, props, init) {
  if(typeof props === 'undefined'
      && typeof init === 'undefined'
      && typeof proto === 'object')
    return Object.create(proto);
  else if(typeof props === 'boolean') {
    init = props;
    props = undefined;
  }

  if(!(proto instanceof Array))
    proto = [ proto ];

  var desc = {};
  for(var p in props) {
    desc[p] = {
      value: props[p],
      writeable: true,
      enumerable: true,
      configurable: true
    };
  }

  var o, base;
  while(proto.length > 0) {
    var par = proto.pop();

    base = Object.create(par, base);
  }
  o = Object.create(base, desc);

  if(init) {
    var args = Array.prototype.slice.call(arguments),
        pos = typeof props === 'undefined' ? 2 : 3;

    args.slice(pos);

    o.apply(o, args);
  }

  return o;
};

if(exports !== 'undefined')
  exports.Thing = Thing;
