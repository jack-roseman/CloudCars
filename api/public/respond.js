var socket = io();

function classify() {
    socket.emit('ack', {
        answer: "dirty"
    })
}

socket.on('classify', (data) => {
    $("#classify_image").attr('src', data.imgUrl);
})