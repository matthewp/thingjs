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
      writable: true,
      enumerable: true,
      configurable: true
    };
  }

  var o, baseDesc = {}, base = proto.pop();
  do {
   var par = proto.pop();

   if(par) {
     for(var p in base) {
      baseDesc[p] = Object.getOwnPropertyDescriptor(base, p);
     }

     base = Object.create(par, baseDesc);
   }
  } while(proto.length > 0);

  o = Object.create(base, desc);

  if(init) {
    var args = Array.prototype.slice.call(arguments),
        pos = typeof props === 'undefined' ? 2 : 3;

    args = args.slice(pos);

    o.init.apply(o, args);
  }
 
  return o;
};

if(typeof exports !== 'undefined')
  exports.Thing = Thing;
