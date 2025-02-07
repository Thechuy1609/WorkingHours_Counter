import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["lineItems", "textarea", "lineItem", "total"];

  connect() {
    console.log("connected")
    this.textareaTargets.forEach((textarea) => {
      textarea.addEventListener("input", () => this.autoResize(textarea));
    });

    this.element.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener("input", () => this.calculate(input));
    });

    this.lineItemsTarget.querySelectorAll('[name*="[quantity]"], [name*="[rate]"]').forEach(input => {
      this.calculate(input);
    });

    this.updateTotal();
  }

  calculate(input) {
    let row = input.closest("tr");
    let quantity = parseFloat(row.querySelector('[name*="[quantity]"]').value) || 0;
    let rate = parseFloat(row.querySelector('[name*="[rate]"]').value) || 0;
    let subtotalInput = row.querySelector('[name*="[subtotal]"]');

    if (subtotalInput) {
      subtotalInput.value = (quantity * rate).toFixed(2);
    }

    this.updateTotal();
  }

  updateTotal() {
    let total = 0;
    this.lineItemsTarget.querySelectorAll('[name*="[subtotal]"]').forEach(subtotalInput => {
      total += parseFloat(subtotalInput.value) || 0;
    });

    if (this.hasTotalTarget) {
      this.totalTarget.value = `Total $${total.toFixed(2)}`;
    }
  }

  addLineItem() {
    const newRow = document.createElement("tr");
    const index = this.lineItemsTarget.children.length;

    newRow.innerHTML = `
      <td class="p-2 border border-gray-300">
        <textarea name="invoice[line_items_attributes][${index}][description]" data-invoice-target="textarea" class="w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lm resize-none" oninput= 'this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
      </td>
      <td class="p-2 border border-gray-300">
        <input type="number" value="0.0" name="invoice[line_items_attributes][${index}][quantity]" min="0" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lm text-center">
      </td>
      <td class="p-2 border border-gray-300">
        <input type="number" value="00.00" name="invoice[line_items_attributes][${index}][rate]" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lm text-center">
      </td>
      <td class="p-2 border border-gray-300 text-center">
        <input name="invoice[line_items_attributes][${index}][subtotal]" class="subtotal-input text-center" value="0.00" readonly>
      </td>
      <td class="p-2 border border-gray-300 text-center">
        <button type="button" class="delete-line-item bg-transparent text-red-500 hover:bg-red-100 rounded p-1 focus:outline-none">X</button>
      </td>
    `;

    this.lineItemsTarget.appendChild(newRow);

    newRow.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener("input", () => this.calculate(input));
    });

    newRow.querySelector(".delete-line-item").addEventListener("click", () => this.deleteRow(newRow));
  }

  deleteRow(row) {
    row.remove();
    this.updateTotal();
  }
}
