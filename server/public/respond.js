var socket = io();

socket.on('connected', () => {
    $("#connection_status").html("Status: <b>Connected</b>!")
})

socket.on('classify', (data) => {
    $("#classify_image").attr('src', data.imgUrl);
})

$(document).ready(() => {
    $('#clean_btn').on('click', () => {
        socket.emit('ack', {
            imgUrl:  $("#classify_image").attr('src'),
            label: 'clean'
        });
        $('#classify_image').attr('src', '')
    });
    
    $('#dirty_btn').on('click', () => {
        socket.emit('ack', {
            imgUrl:  $("#classify_image").attr('src'),
            label: 'dirty'
        });
        $('#classify_image').attr('src', '')
    });
});