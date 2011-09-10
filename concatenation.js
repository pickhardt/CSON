(function() {
  var root;
  var __hasProp = Object.prototype.hasOwnProperty;
  if (typeof window !== "undefined") {
    root = window;
    root.exports = root.CSON = {};
  } else {
    root = global;
  }
  CSON.parse = function() {
    throw "An optimized CSON.parse is not yet implemented. Use CoffeeScript's compiler itself for now.";
  };
  CSON.stringify = function(obj, options) {
    var arrayEnder, arraySeparator, arrayStarter, elem, finalString, formattedArray, formattedKeyVals, i, key, myIndentation, myType, partialString, val, _ref;
    if (options == null) {
      options = {};
    }
    if (!(options.arrayLines != null)) {
      options.arrayLines = true;
    }
    if (!(options.indentLevel != null)) {
      options.indentLevel = 0;
    }
    if (!(options.indentWith != null)) {
      options.indentWith = "  ";
    }
    if (!(options.useCurlyBrackets != null)) {
      options.useCurlyBrackets = true;
    }
    myIndentation = "";
    for (i = 0, _ref = options.indentLevel; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      myIndentation += options.indentWith;
    }
    myType = CSON._type(obj);
    switch (myType) {
      case "array":
        formattedArray = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = obj.length; _i < _len; _i++) {
            elem = obj[_i];
            _results.push(CSON.stringify(elem, {
              indentLevel: options.indentLevel + 1,
              indentWith: options.indentWith,
              useCurlyBrackets: false
            }));
          }
          return _results;
        })();
        arraySeparator = options.arrayLines ? "\n" + myIndentation + options.indentWith : ", ";
        arrayStarter = options.arrayLines ? "\n" + myIndentation + options.indentWith : "";
        arrayEnder = options.arrayLines ? "\n" + myIndentation : "";
        return "[" + arrayStarter + formattedArray.join(arraySeparator) + arrayEnder + "]";
      case "string":
        return "\"" + obj + "\"";
        break;
      case "object":
        formattedKeyVals = [];
        for (key in obj) {
          if (!__hasProp.call(obj, key)) continue;
          val = obj[key];
          if (!(key != null)) {
            continue;
          }
          partialString = "" + myIndentation + options.indentWith;
          partialString += CSON.stringify(key, {
            indentLevel: options.indentLevel + 1,
            indentWith: options.indentWith,
            useCurlyBrackets: false
          });
          partialString += ": ";
          partialString += CSON.stringify(val, {
            indentLevel: options.indentLevel + 1,
            indentWith: options.indentWith,
            useCurlyBrackets: false
          });
          formattedKeyVals.push(partialString);
        }
        finalString = "";
        finalString += "\{";
        finalString += "\n";
        finalString += formattedKeyVals.join("\n");
        finalString += "\n" + myIndentation + "\}";
        return finalString;
      default:
        return "" + (String(obj));
    }
  };
  CSON._type = function(obj) {
    var classToType, myClass, name, _i, _len, _ref;
    if (obj === void 0 || obj === null) {
      return String(obj);
    }
    classToType = new Object;
    _ref = "Boolean Number String Function Array Date RegExp".split(" ");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    myClass = Object.prototype.toString.call(obj);
    if (myClass in classToType) {
      return classToType[myClass];
    }
    return "object";
  };
}).call(this);
