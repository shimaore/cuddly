Report events via Socket.IO
===========================

Usage
====

    cuddly = require('cuddly')('candy-dispenser','https://example.net')

Alternatively set `CUDDLY_URL` and initiate the same way as the `debug` module:

    // Assumes process.env.CUDDLY_URL is set.
    cuddly = require('cuddly')('candy-dispenser')

All message methods (below) support a text description and an optional object.

Development/devops support messages
-----------------------------------

Indicate potential bug, internal inconsistency, or non-transient deployment problem.

    cuddly.dev('Expected the candy type to be set in GrabCandy().')

Operational support messages
----------------------------

Indicate non-customer-specific operational (transient) problem.

    cuddly.ops('The candy server is not reachable.')

Customer support messages
-------------------------

Indicate customer-specific problem (e.g. configuration entry).

    cuddly.csr('Customer Bar is out of candies.')

Messages
========

The data sent in the event consists of the optional object, extended with:
- `error`: the text description
- `application`: the tag provided when creating the `cuddly` instance.
- `host`: either the value of the `CUDDLY_HOST` environment variable, or the hostname as reported by Node.js.
- `stamp`: an ISO-9601 timestamp
