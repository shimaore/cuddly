    events = [

Development/devops support messages
-----------------------------------

Indicate potential bug, internal inconsistency, or non-transient deployment problem.

      'dev'

Operational support messages
----------------------------

Indicate non-customer-specific operational (transient) problem.

      'ops'

Customer support messages
-------------------------

Indicate customer-specific problem (e.g. configuration entry).

      'csr'

    ]

    stamp = ->
      (new Date()).toISOString()

    cuddly = (tag,url = process.env.CUDDLY_URL) ->
      host = process.env.CUDDLY_HOST ? os.hostname()
      socket = null
      res = {}
      for event in events
        res[event] = (error,data = {}) ->
          data.error = error
          data.application = tag
          data.host = host
          data.stamp = stamp()
          Promise.resolve()
          .then ->
            socket ?= IO url
            socket.emit "report_#{event}", data
          .catch (error) ->
            debug "socket: #{error}"
      res

    cuddly.events = events

    module.exports = cuddly

    IO = require 'socket.io-client'
    os = require 'os'
    pkg = require './package.json'
    debug = (require 'debug') pkg.name
