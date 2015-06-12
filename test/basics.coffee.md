    describe 'The module', ->
      Cuddly = require '../index'
      m = Cuddly 'cuddly:test:basics'
      it 'should have function dev', ->
        assert 'function' is typeof m.dev
      it 'should have function ops', ->
        assert 'function' is typeof m.ops
      it 'should have function csr', ->
        assert 'function' is typeof m.csr
      it 'should have events', ->
        assert 'report_dev' in Cuddly.events

    assert = require 'assert'
