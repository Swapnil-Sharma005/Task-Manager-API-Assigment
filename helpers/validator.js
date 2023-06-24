class validator {
    static validatetaskInfo(taskInfo, tasksData) {
      if(taskInfo.hasOwnProperty("taskId") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("completion status") &&
        this.validateUniquetaskId(taskInfo, tasksData)) {
          return {
            "status": true,
            "message": "New task has been succesfully added"
          };
        }
        if(!this.validateUniquetaskId(taskInfo, tasksData)){
          return {
            "status": false,
            "message": "task id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "task details are incomplete please provide all the properties"
        }
    }
  
    static validateUniquetaskId(taskInfo, tasksData) {
      let valueFound = tasksData.tasks.some(el => el.taskId === taskInfo.taskId);
      if(valueFound) return false;
      return true;
    }
    
    static validatetaskInfoForUpdate(taskInfo, tasksData) {
      if(taskInfo.hasOwnProperty("taskId") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("completion status")) {
          return {
            "status": true,
            "message": "task has been updated succesfully"
          };
        }
      
        return {
          "status": false,
          "message": "task details are incomplete please provide all the properties"
        }
    }
    
  }
  
  module.exports = validator;