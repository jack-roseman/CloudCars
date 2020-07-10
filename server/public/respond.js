var socket = io();
let queue;

socket.emit("connected_ack");

socket.on("connectionStateChange", (connectionState) => {
  const numResponders = connectionState.numResponders;
  $("#connection_status").html(
    `Status: <b>Connected</b> => ${numResponders} responders online`
  );
});

socket.on("classificationTaskChange", (tasks) => {
  queue = new PriorityQueue({
    initialValues: tasks,
    comparator: function (a, b) {
      return a.id - b.id;
    },
  });
  if (queue.length != 0) {
    let task = queue.peek();
    localStorage.setItem("current_task", JSON.stringify(task));
    $("#classify-image").attr("src", task.imgUrl);
    $("#classify-div").show();
  } else {
    $("#classify-image").attr("src", "");
    $("#classify-div").hide();
  }
});

$(document).ready(() => {
  $("#clean-btn").on("click", () => classify("clean"));
  $("#dirty-btn").on("click", () => classify("dirty"));
});

function classify(cl) {
  const currentTask = JSON.parse(localStorage.getItem("current_task"));
  queue.dequeue();
  socket.emit("classification_completion", {
    id: currentTask.id,
    imgUrl: currentTask.imgUrl,
    label: cl,
  });
  $("#classify-image").attr("src", "");
  $("#classify-div").hide();
}
