export class FilterComponent {
  constructor() {
    this.filterListElement = document.querySelector(".filter")
    this.selectedOptionElement =
      this.filterListElement.querySelector("#selected-option")
    this.selectedOptionValue =
      this.selectedOptionElement.querySelector(".option-content").textContent
    this.chevron = this.filterListElement.querySelector(".fas")
    this.bindFilterEvents()
  }

  bindFilterEvents() {
    this.selectedOptionElement.addEventListener("click", () =>
      this.toggleListbox()
    )
    const options = this.filterListElement.querySelectorAll(".option-content")
    options.forEach((optionElement) => {
      optionElement.addEventListener("click", () =>
        this.selectOption(optionElement)
      )
    })
  }

  toggleListbox() {
    const isExpanded =
      this.filterListElement.getAttribute("aria-expanded") === "true"
    this.filterListElement.setAttribute("aria-expanded", !isExpanded)
    this.chevron.className = isExpanded
      ? "fas fa-chevron-down"
      : "fas fa-chevron-up"
  }

  selectOption(clickedOptionElement) {
    const selectedOptionElementContent =
      this.selectedOptionElement.querySelector(".option-content")
    const clickedOptionLabel = clickedOptionElement.textContent
    const oldLabel = selectedOptionElementContent.textContent
    clickedOptionElement.textContent = oldLabel
    selectedOptionElementContent.textContent = clickedOptionLabel
    this.selectedOptionValue = clickedOptionLabel.toLowerCase()
    this.toggleListbox()
    this.dispatchSortChangeEvent()
  }

  dispatchSortChangeEvent() {
    const event = new CustomEvent("sortChange", {
      detail: this.selectedOptionValue,
    })
    document.dispatchEvent(event)
  }
}
