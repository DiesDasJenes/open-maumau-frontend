# 3. socket.io for connections

Date: 2023-05-14

## Status

Accepted

## Context

The client should be able to sent and receive events. I also wanted to reduce the need for REST endpoints. The communication between the client and server should be based on events as users will make a lot of moves. The management of the game state could be become too hard with a REST communication. 

## Decision

Therefore I will try out websockets. The game will use socket.io with the package 'ngx-socket-io'. This package allows me to configure socket.io way easier.

## Consequences

I can now instantiate and use services way easier. The configuration of socket.io-client is also done for me. 