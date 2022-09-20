module.exports = app => {
  return class SendController extends app.Controller {
    async index() {
      const query = this.ctx.socket.handshake && this.ctx.socket.handshake.query;
      this.ctx.socket.emit('connect-callback', query);
    }
  }
};