var Thing = Object.create(null);
Thing.create = function(proto, props, initialize) {
  var init;
  if(typeof props === 'undefined'
      && typeof init === 'undefined'
      && !(proto instanceof Array))
    return Object.create(proto);
  else if(typeof props === 'boolean') {
    init = props;
    props = undefined;
  } else {
    init = initialize;
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
     var all = {};
     for(var p in base) {
      all[p] = base[p];

      baseDesc[p] = Object.getOwnPropertyDescriptor(all, p);
     }

     base = Object.create(par, baseDesc);
   }
  } while(proto.length > 0);

  o = Object.create(base, desc);

  if(init) {
    var args = Array.prototype.slice.call(arguments)
                .slice(typeof props === 'undefined' ? 2 : 3);

    o.init.apply(o, args);
  }
 
  return o;
};

if(typeof exports !== 'undefined')
  exports.create = Thing.create;
