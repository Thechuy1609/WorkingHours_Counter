import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  connect() {
    console.log("hide_buttons connected");
  }

  replaceAfterClick() {
    console.log("Download clicked, replacing button...");
    this.buttonTarget.outerHTML = `<a href="/projects" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">Main</a>`;
  }
}
