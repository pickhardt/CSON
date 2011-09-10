# Makefile for cson.js

build : concatenation.js cson_min.js


cson_min.js : concatenation.js
			java -jar ~/projects/closure-compiler/build/compiler.jar --js=concatenation.js --js_output_file=cson_min.js --compilation_level=SIMPLE_OPTIMIZATIONS

concatenation.js : cson.coffee
			coffee -j -c cson.coffee
