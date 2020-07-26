//maintain the state of the what the responders are doing

connectionState = {
  numResponders: 0,
};

classificationTasks = new Map();
numClassifications = 0;

module.exports = {
  getNumResponders: () => connectionState.numResponders,
  addResponder: function () {
    connectionState.numResponders += 1;
    return connectionState.numResponders;
  },

  removeResponder: function () {
    connectionState.numResponders -= 1;
    return connectionState.numResponders;
  },

  getClassificationTasks: function () {
    return classificationTasks.values();
  },

  addClassificationTask: function (path) {
    let taskId = ++numClassifications;
    classificationTasks.set(taskId, {
      id: taskId,
      path: path,
    });
    return true;
  },

  removeClassificationTask: function (id) {
    classificationTasks.delete(id); //remove task from queue since someone responded to it
  },

  getConnectionState: function () {
    return connectionState;
  },
};
