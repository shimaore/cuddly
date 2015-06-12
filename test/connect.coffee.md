    describe 'The module', ->
      m = require '../index'

      port = 8900

      it 'should report dev', (done) ->
        {server} = (require 'zappajs') port, ->
          @on 'report_dev', ->
            assert @data.error is 'foo'
            done()

        server.on 'listening', ->
          cuddly = m 'test:dev', "http://127.0.0.1:#{port}"
          cuddly.dev 'foo'

      it 'should report ops', (done) ->
        port++
        {server} = (require 'zappajs') port, ->
          @on 'report_ops', ->
            assert @data.error is 'bar'
            done()

        server.on 'listening', ->
          cuddly = m 'test:ops', "http://127.0.0.1:#{port}"
          cuddly.ops 'bar'

      it 'should report csr', (done) ->
        port++
        {server} = (require 'zappajs') port, ->
          @on 'report_csr', ->
            assert @data.error is 'foobar'
            assert @data.application is 'test:csr'
            done()

        server.on 'listening', ->
          cuddly = m 'test:csr', "http://127.0.0.1:#{port}"
          cuddly.csr 'foobar'


    assert = require 'assert'
