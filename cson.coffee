##
# cson.coffee 
# version 0.1.0
#
# NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
#
# See also:
# https://github.com/pickhardt/CSON
##

# Establish the root object, window in a browser, or global on a server.
if (typeof window != "undefined")
  root = window
  root.exports = root.CSON = {}
else
 root = global

CSON.parse = () -> throw "An optimized CSON.parse is not yet implemented. Use CoffeeScript's compiler itself for now."

# Outputs a JavaScript object to a string in the CSON format.
CSON.stringify = (obj, options={}) ->
  options.arrayLines        = true   if not options.arrayLines?
  options.indentLevel       = 0      if not options.indentLevel? # intentionally not using ?= because of a closure compiler warning
  options.indentWith        = "  "   if not options.indentWith?
  options.useCurlyBrackets  = true   if not options.useCurlyBrackets?

  myIndentation = ""
  myIndentation += options.indentWith for i in [0...options.indentLevel]
  
  myType = CSON._type obj
  switch myType
    when "array"
      formattedArray = (CSON.stringify(elem, indentLevel: options.indentLevel + 1, indentWith: options.indentWith, useCurlyBrackets: false) for elem in obj)
      arraySeparator = if options.arrayLines then "\n#{ myIndentation }#{ options.indentWith }" else ", "
      arrayStarter = if options.arrayLines then "\n#{ myIndentation }#{ options.indentWith }" else ""
      arrayEnder = if options.arrayLines then "\n#{myIndentation}" else ""
      "[" + arrayStarter + formattedArray.join(arraySeparator) + arrayEnder + "]"
    when "string"
      "\"#{ obj }\""
    when "object"
      formattedKeyVals = []
      for own key, val of obj
        if not key?
          continue
        partialString = "#{ myIndentation }#{ options.indentWith }"
        partialString += CSON.stringify key,
          indentLevel: options.indentLevel + 1
          indentWith: options.indentWith
          useCurlyBrackets: false
        partialString += ": "
        partialString += CSON.stringify val,
          indentLevel: options.indentLevel + 1
          indentWith: options.indentWith
          useCurlyBrackets: false
        formattedKeyVals.push partialString
      finalString = ""
      finalString += "\{" #if options.useCurlyBrackets
      finalString += "\n"
      finalString += formattedKeyVals.join("\n") 
      finalString += "\n#{ myIndentation }\}" #if options.useCurlyBrackets
      finalString
    else "#{ String obj }"
  
CSON._type = (obj) ->
   if obj == undefined or obj == null
     return String obj

   classToType = new Object
   for name in "Boolean Number String Function Array Date RegExp".split(" ")
     classToType["[object " + name + "]"] = name.toLowerCase()
   myClass = Object.prototype.toString.call obj
   if myClass of classToType
     return classToType[myClass]
   "object"
