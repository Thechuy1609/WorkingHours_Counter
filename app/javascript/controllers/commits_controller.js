import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["commitList"];
  addCommit(event) {
    event.preventDefault();
    if (this.commitListTarget.children.length > 6) {
      alert("You can only add up to 5 commits.");
      return;
    }

    const newCommit = document.createElement("div");
    newCommit.classList.add("commit-entry", "mb-4");
    newCommit.innerHTML = `
      <textarea name="work[commits_attributes][][description]" placeholder="Describe your commit..."
        class="bg-white border text-xl text-gray-700 rounded-md p-3 w-2/3 max-w-sm commit-text"></textarea>
      <button type="button" data-action="commits#commit" class="commit-btn bg-blue-500 text-white px-4 py-2 rounded ml-2">Commit</button>
    `;
    
    this.commitListTarget.appendChild(newCommit);
  }


  commit(event) {
    event.preventDefault();
    const button = event.target;
    const textarea = button.previousElementSibling;
    textarea.disabled = true;
    button.disabled = true;
    button.innerText = "Committed";
  }
}
