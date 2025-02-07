import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["button"];

  replaceAfterClick() {
    this.buttonTarget.outerHTML = `
      <a href="/projects" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 text-center">
        Main
      </a>`;
  }
}
