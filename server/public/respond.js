var socket = io();

socket.on('connected', () => {
    $("#connection_status").html("Status: <b>Connected</b>")
})

socket.on('classify', (data) => {
    $("#classify_image").attr('src', data.imgUrl);
    $("#classify-div").show()
})

$(document).ready(() => {
    $('#clean_btn').on('click', classify('clean')); 
    $('#dirty_btn').on('click', classify('dirty'));
});

function classify(cl) {
    socket.emit('ack', {
        imgUrl:  $("#classify_image").attr('src'),
        label: cl
    });
    $('#classify_image').attr('src', '')
    $("#classify-div").hide()
}