import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  printRow(event) {
    const button = event.currentTarget;
    const row = button.closest("tr").outerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `<table>${row}</table>`;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  }
}
