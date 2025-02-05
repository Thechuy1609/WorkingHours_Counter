import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["lineItems", "textarea", "lineItem", "total"];

  connect() {
    this.textareaTargets.forEach((textarea) => {
      textarea.addEventListener("input", () => this.autoResize(textarea));
    });

    this.lineItemsTarget.querySelectorAll("tr").forEach(row => {
      this.addInputListeners(row);
    });
  }
  addLineItem() {
    const newRow = document.createElement("tr");
    const index = this.lineItemsTarget.children.length; // Unique index for the new row
  
    newRow.innerHTML = `
      <td class="p-2 border border-gray-300">
        <textarea name="invoice[line_items_attributes][${index}][description]" data-invoice-target="textarea" class="w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lm resize-none overflow-hidden"></textarea>
      </td>
      <td class="p-2 border border-gray-300">
        <input type="number" name="invoice[line_items_attributes][${index}][quantity]" min="0" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lm text-center">
      </td>
      <td class="p-2 border border-gray-300">
        <input type="text" name="invoice[line_items_attributes][${index}][rate]" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lm text-center">
      </td>
      <td class="p-2 border border-gray-300 text-center">
        <input type="hidden" name="invoice[line_items_attributes][${index}][subtotal]" class="subtotal-input" value="$00.00">
        <span class="subtotal">$00.00</span>
      </td>
    `;
  
    const deleteBtnWrapper = document.createElement("td");
    deleteBtnWrapper.classList.add("p-2", "border", "border-gray-300", "text-center");
  
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-line-item", "bg-transparent", "text-red-500", "hover:bg-red-100", "rounded", "p-1", "focus:outline-none");
  
    const deleteIcon = document.createElement("span");
    deleteIcon.textContent = "X";
  
    deleteBtn.appendChild(deleteIcon);
    deleteBtnWrapper.appendChild(deleteBtn);
  
    newRow.appendChild(deleteBtnWrapper);
  
    this.lineItemsTarget.appendChild(newRow);
  
    this.addInputListeners(newRow);
  
    deleteBtn.addEventListener("click", () => this.deleteRow(newRow));
  
    const newTextarea = newRow.querySelector("textarea");
    newTextarea.addEventListener("input", () => this.autoResize(newTextarea));
  
    newTextarea.addEventListener("input", () => {
      const lineHeight = parseInt(window.getComputedStyle(newTextarea).lineHeight);
      const maxLines = 8;
      const currentHeight = newTextarea.scrollHeight;
      const maxHeight = lineHeight * maxLines;
  
      if (currentHeight > maxHeight) {
        newTextarea.style.overflowY = "auto";
        newTextarea.style.height = `${maxHeight}px`; // Set the height to max 8 lines
      }
    });
  }
  autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  updateSubtotal(event) {
    const row = event.target.closest("tr");
    const quantity = parseFloat(row.querySelector("input[type='number']").value) || 0;
    const rate = parseFloat(row.querySelector("input[type='text']").value) || 0;
    const subtotal = quantity * rate;
    
    row.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
    
    const hiddenSubtotalInput = row.querySelector("input[name*='[subtotal]']");
    if (hiddenSubtotalInput) {
      hiddenSubtotalInput.value = subtotal.toFixed(2);
    }
    
    this.updateTotal();
  }
  
  updateTotal() {
    const subtotals = Array.from(this.lineItemsTarget.querySelectorAll(".subtotal"))
      .map(i => parseFloat(i.textContent.replace("$", "")));
  
    const total = subtotals.reduce((sum, val) => sum + val, 0);
    this.totalTarget.value = `Total $ ${total.toFixed(2)}`;
  }
  
  deleteRow(row) {
    row.remove();
    this.updateTotal();
  }

  addInputListeners(row) {
    row.querySelectorAll("input[type='number'], input[type='text']").forEach(input => {
      input.addEventListener("input", this.updateSubtotal.bind(this));
    });
    const deleteButton = row.querySelector(".delete-row");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => this.deleteRow(row));
    }
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
