import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["salary", "earn", "hours", "startStop", "stopwatch", "save", "commitList", "commitDescription"]

  timer = null;
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  actualProfit = 0;
  hoursCompleted = 0;

  connect() {
    this.saveTarget.disabled = true;
    this.salaryTarget.readOnly = false;
  }

  toggleStartStop() {
    if (this.isRunning) {
      this.stop();
    } else if (!this.isRunning || this.startStopTarget.textContent == "Resume") {
      this.start();
    }
  }

  start() {
    const salaryValue = parseFloat(this.salaryTarget.value);
    if (!isNaN(salaryValue)) {
      this.salaryTarget.readOnly = true;
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      this.timer = setInterval(this.update.bind(this), 60);
      this.startStopTarget.textContent = "Stop";
    } else {
      console.log("Please enter a valid number for the salary target.");
    }
  }

  stop() {
    clearInterval(this.timer);
    this.elapsedTime = Date.now() - this.startTime;
    this.isRunning = false;
    this.startStopTarget.textContent = "Resume";
  }

  update() {
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;

    const hours = String(Math.floor(this.elapsedTime / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((this.elapsedTime / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((this.elapsedTime / 1000) % 60)).padStart(2, "0");

    this.stopwatchTarget.value = `  ${hours}:${minutes}:${seconds}`;
    this.profit();
    this.hoursDisplay();
  }

  profit() {
    if (this.isRunning && (!isNaN(this.salaryTarget.value))) {
      const hourlySalary = parseFloat(this.salaryTarget.value);
      const earningsPerSecond = hourlySalary / 3600;
      const totalElapsedTimeInSeconds = Math.floor(this.elapsedTime / 1000);

      this.actualProfit = totalElapsedTimeInSeconds * earningsPerSecond;

      const dollars = Math.floor(this.actualProfit);
      const cents = Math.round((this.actualProfit - dollars) * 100);

      this.earnTarget.value = `$${dollars.toString().padStart(2, "0")}.${cents.toString().padStart(2, "0")}`;
    }
  }

  hoursDisplay() {
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;

    const hours = String(Math.floor(this.elapsedTime / (1000 * 60 * 60)));
    this.hoursTarget.value = `${hours} ${hours === 1 ? 'hour' : 'hours'} completed`;
  }

  avoidSaving() {
    if (this.isRunning) {
      this.saveTarget.disabled = false;
    }
  }

  addCommit(event) {
    if(this.isRunning){
    event.preventDefault();
    const newCommit = document.createElement("div");
    newCommit.classList.add("commit-entry", "mb-4","bg-gray-50", "p-6", "rounded-lg", "shadow-md");
    newCommit.innerHTML = `
      <textarea name="work[commits_attributes][][description]" placeholder="Describe your commit..."
        class="bg-white border text-ls text-gray-700 rounded-md resize-none p-3 w-full commit-text" 
        data-action="input->counter#limitInputLength" data-counter-target="commitDescription"></textarea>
      <div class="flex justify-end mt-3">
        <button type="button" data-action="counter#commit" class="commit-btn bg-green-500 text-white px-4 py-2 rounded ml-2">Commit</button>
        <button type="button" class="delete-commit-btn bg-red-500 text-white px-4 py-2 rounded ml-2" data-action="counter#deleteCommit">Delete</button>
      </div>
    `;
    this.commitListTarget.appendChild(newCommit);}
    else {
      event.target.disabled
    }
  }
  
  commit(event) {
    event.preventDefault();
    const button = event.target;
    const commitEntry = button.closest('.commit-entry');
    const textarea = commitEntry.querySelector('textarea');
    textarea.readOnly = true;
    button.disabled = true;
    button.textContent = "commited";
  }

  deleteCommit(event) {
    event.preventDefault();
    const commitEntry = event.target.closest(".commit-entry");
    const hiddenDestroyField = commitEntry.querySelector("input[name*='[_destroy]']");
    if (hiddenDestroyField) {
      hiddenDestroyField.value = 'true';
    }
    commitEntry.remove();
  }

  limitInputLength(event) {
    const inputType = event.target.type;
    
    let maxLength;
    if (inputType === 'number') {
      maxLength = 6; 
    } else if (inputType === 'text') {
      maxLength = 20; 
    }
  
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }
}
