    describe 'The module', ->
      m = (require '../index') 'cuddly:test:basics'
      it 'should have function dev', ->
        assert 'function' is typeof m.dev
      it 'should have function ops', ->
        assert 'function' is typeof m.ops
      it 'should have function csr', ->
        assert 'function' is typeof m.csr

    assert = require 'assert'
