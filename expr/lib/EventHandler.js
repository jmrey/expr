/* jslint node: true */
"use strict";

module.exports = function (instance) {
  var io = require('socket.io').listen(instance.server);

  io.configure(function () {
    io.set('authorization', function (handshake, fn) {
      if (handshake.headers.cookie) {
        var cookie = instance.utils.parseCookie(handshake.headers.cookie);
        var sessionID = instance.config.session.prefix + '_' + cookie[instance.config.session.name];
        handshake.cookie = cookie;

        instance.sessionStore.get(sessionID, function(err, session) {
          if (err || !session) {
            fn('Could not found Session.', false);
          } else {
            handshake.session = JSON.parse(session);
            handshake.sessionID = sessionID;
            fn(null, true);
          }
        });
      } else {
        return fn('No cookie transmitted.', false);
      }
    });  
  });
  
  return io;
};