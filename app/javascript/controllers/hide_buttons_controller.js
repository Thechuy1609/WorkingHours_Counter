import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  connect() {
    console.log("hide_buttons connected");

    // Check every 15 seconds if the button is still "Download" and replace it with "Main"
    setInterval(() => {
      if (this.buttonTarget.textContent === "Download") {
        this.replaceAfterRefresh();
      }
    }, 18000); // 15000ms = 15 seconds
  }

  refreshLater() {
    console.log("Download clicked, refreshing in 30 seconds...");

    // Store flag in sessionStorage so we know to replace the button after refresh
    sessionStorage.setItem("buttonClicked", "true");

    // Wait 30 seconds before refreshing
    setTimeout(() => {
      window.location.reload();
    }, 8000); // 30000ms = 30 seconds
  }

  replaceAfterRefresh() {
    // Replace the "Download" link with "Main"
    this.buttonTarget.outerHTML = `<a href="/projects" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">Main</a>`;
  }
}
