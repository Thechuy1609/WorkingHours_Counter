import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
export default class extends Controller {
  static targets = ["salary","earn","hours","startStop","stopwatch","save"]


  timer = null;
  startTime = 0; 
  elapsedTime = 0;
  isRunning = false;
  actualProfit = 0
  hoursCompleted = 0


connect() {
this.saveTarget.disabled = true
this.salaryTarget.readOnly = false
  }


toggleStartStop() {
if (this.isRunning) {
      this.stop();
}
 else if(!this.isRunning || this.startStopTarget.textContent == "Resume") {
      this.start();
      }
  }

start() {
  const salaryValue = parseFloat(this.salaryTarget.value);
  if (!isNaN(salaryValue)) {
    this.salaryTarget.readOnly = true
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
  //empty spaces for styling purposes below
    this.stopwatchTarget.value = `  ${hours}:${minutes}:${seconds}`;
    this.profit();
    this.hoursDisplay()
  };  

  profit() {
    if (this.isRunning && (!isNaN(this.salaryTarget.value ))) {

      
      const hourlySalary = parseFloat(this.salaryTarget.value);

      const earningsPerSecond = hourlySalary / 3600;
  

      const totalElapsedTimeInSeconds = Math.floor(this.elapsedTime / 1000);
  

      this.actualProfit = totalElapsedTimeInSeconds * earningsPerSecond;
  

      const dollars = Math.floor(this.actualProfit);
      const cents = Math.round((this.actualProfit - dollars) * 100);
  

      this.earnTarget.value = `$${dollars.toString().padStart(2, "0")}.${cents.toString().padStart(2, "0")}`;
    }

  }


  hoursDisplay(){
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;
  
    const hours = String(Math.floor(this.elapsedTime / (1000 * 60 * 60)));

    this.hoursTarget.value = `${hours} ${hours === 1 ? 'hour' : 'hours'} completed`;
  }

  avoidSaving(){
    if(this.isRunning == true){
      this.saveTarget.disabled = false
    }
  }

  limitInputLength(event) {
    const maxLength = 7;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }
}