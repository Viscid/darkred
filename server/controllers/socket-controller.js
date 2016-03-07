console.log('test');

module.exports = function(socket) {


    socket.on('echo', function() {
      console.log('echo');
    })


}
