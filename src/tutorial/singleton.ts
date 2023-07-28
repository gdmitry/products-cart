// Singleton pattern with SEF
const TaskRepo = (function () {
  let taskRepo: Object;

  function createRepo(): Object {
    const taskRepo = new Object("Task");
    return taskRepo;
  }

  return {
    getInstance: function () {
      if (!taskRepo) {
        taskRepo = createRepo();
      }

      return taskRepo;
    },
  };
})();

const repo1 = TaskRepo.getInstance();
const repo2 = TaskRepo.getInstance();

// Create a singleton with a class
class TaskRepository {
  static readonly instance = new TaskRepository(); // reference to signle instance

  // Private indicates here the class to be a singleton
  // Restrict to call constructot outside of class body
  private constructor() {}

  save(): TaskRepository {
    console.log("Saving to DB...");
    return this;
  }
}

const repo = TaskRepository.instance;
repo.save().save();

/*

*/
