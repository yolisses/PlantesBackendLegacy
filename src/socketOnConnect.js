export function socketOnConnect(socket) {
  console.error(socket.handshake.auth.token);
}
