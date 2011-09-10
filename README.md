cson.coffee and cson.js (version 0.1.0)
=======================================

What is CSON?
-------------

CSON stands for CoffeeScript Object Notation.  It is a format for storing data, like YAML, JSON, and XML.  It is a subset of the [CoffeeScript language](http://jashkenas.github.com/coffee-script/).

Usage
-----

cson.coffee and cson.js can be used to stringify objects.  Simply download this project and include the relevant file in your application.

Like Douglas Crockford's JSON library, this CSON library is used with the following command:

CSON.stringify(object)

Currently, there is no light-weight CSON.parse.  However, you can parse a CSON object with CoffeeScript's compiler, as is done in [this project](https://github.com/balupton/cson.npm).

License
-------

Released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).