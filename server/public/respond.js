var socket = io();
var queue;

socket.on('connected', () => {
    socket.emit('connected_ack'); 
});

socket.on('connectionStateChange', (connectionState) => {
    const numResponders = connectionState.numResponders;
    $("#connection_status").html(`Status: <b>Connected</b> => ${numResponders} responders online`)
});

socket.on('classificationTaskChange', (tasks) => {
    queue = new PriorityQueue({ initialValues: tasks, comparator: function(a, b) { return a.id - b.id; }});
    if (queue.length != 0) {
        const task = queue.dequeue();
        localStorage.setItem('current_task', JSON.stringify(task));
        $("#classify_image").attr('src', task.imgUrl);
        $("#classify-div").show()
    }
});

$(document).ready(() => {
    $('#clean_btn').on('click', () => classify('clean')); 
    $('#dirty_btn').on('click', () => classify('dirty'));
});

function classify(cl) {
    const currentTask = JSON.parse(localStorage.getItem('current_task'));
    socket.emit('classification_completion', {
        id:  currentTask.id,
        imgUrl:  currentTask.imgUrl,
        label: cl
    });
    $('#classify_image').attr('src', '');
    $("#classify-div").hide();
}