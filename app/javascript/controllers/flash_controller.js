// app/javascript/controllers/flash_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    setTimeout(() => this.fadeOut(), 2000);
  }

  fadeOut() {
    this.element.classList.add("opacity-0", "translate-y-2"); 
    setTimeout(() => this.element.remove(), 500);
  }
}