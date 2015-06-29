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

    Cuddly = (tag,url = process.env.CUDDLY_URL) ->
      if not url?
        debug 'Missing `url` or CUDDLY_URL, not reporting.', tag
      host = process.env.CUDDLY_HOST ? os.hostname()
      socket = null
      res = {}
      for event in events
        do (event) ->
          if not url?
            res[event] = (error,data = {}) ->
            return

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
      res.events = events
      res

    Cuddly.events = events.map (event) -> "report_#{event}"

    module.exports = Cuddly

    IO = require 'socket.io-client'
    Promise = require 'bluebird'
    os = require 'os'
    pkg = require './package.json'
    debug = (require 'debug') pkg.name
