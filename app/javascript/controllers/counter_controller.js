import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
export default class extends Controller {
  static targets = ["salary","earn","hours","startStop","stopwatch","finishBtn"]


  timer = null;
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  actualProfit = 0
  hoursCompleted = 0


connect() {
console.log("We are connected")
this.finishBtnTarget.disabled = true
  }


toggleStartStop() {
if (this.isRunning) {
      this.stop();
} else if(!this.isRunning || this.startStopTarget.textContent == "Resume") {
      this.start();
      this.finishBtnTarget.disabled = false
    }
 else if(this.isRunning &&  this.startStopTarget.textContent == "Stop"){
      this.finish();
    }
  
  }


finish(){
  clearInterval(this.timer);
  this.startTime = 0;
  this.elapsedTime = 0;
  this.isRunning = false;
  this.stopwatchTarget.textContent = "00:00:00";
  this.startStopTarget.textContent = "Start"
  this.salaryTarget.disabled = false
}

start() {
  const salaryValue = parseFloat(this.salaryTarget.value);
  if (!isNaN(salaryValue)) {
    this.startTime = Date.now() - this.elapsedTime;
    this.isRunning = true;
    this.timer = setInterval(this.update.bind(this), 60);
    this.startStopTarget.textContent = "Stop";
} else {
    console.log("Please enter a valid number for the salary target.");
  }
}

stop(){
    clearInterval(this.timer)
    this.elapsedTime = Date.now() - this.startTime;
    this.isRunning = false
    this.startStopTarget.textContent = "Resume"
  }
  
update(){
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;
  
    const hours = String(Math.floor(this.elapsedTime / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((this.elapsedTime / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((this.elapsedTime / 1000) % 60)).padStart(2, "0");
  
    this.stopwatchTarget.textContent = `${hours}:${minutes}:${seconds}`;
    this.profit();
    this.hoursDisplay()
  };  

  profit() {
    if (this.isRunning && (!isNaN(this.salaryTarget.value ))) {
      this.salaryTarget.disabled = true
      const hourlySalary = parseFloat(this.salaryTarget.value);

      const earningsPerSecond = hourlySalary / 3600;
  

      const totalElapsedTimeInSeconds = Math.floor(this.elapsedTime / 1000);
  

      this.actualProfit = totalElapsedTimeInSeconds * earningsPerSecond;
  

      const dollars = Math.floor(this.actualProfit);
      const cents = Math.round((this.actualProfit - dollars) * 100);
  

      this.earnTarget.textContent = `$${dollars.toString().padStart(2, "0")}.${cents.toString().padStart(2, "0")}`;
    }

  }


  hoursDisplay(){
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;
  
    const hours = String(Math.floor(this.elapsedTime / (1000 * 60 * 60)));

    this.hoursTarget.textContent = `${hours === 1 ? 'hour' : 'hours'} completed`;
  }



  noEmptyInput(){
  if(this.salaryTarget.value === undefined){
      this.salaryTarget.textContent = "00"
  }
}
}