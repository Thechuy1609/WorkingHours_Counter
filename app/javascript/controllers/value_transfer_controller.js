import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["hiddenField"];
  static values = {
    value: String
  };

  connect() {
    this.updateHiddenField();
  }

  updateHiddenField() {
    if (this.hasHiddenFieldTarget) {
      this.hiddenFieldTarget.value = this.valueValue;
    }
  }
}