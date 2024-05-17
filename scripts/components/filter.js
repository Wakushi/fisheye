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
    const options = this.filterListElement.querySelectorAll(".filter-option")
    options.forEach((optionElement) => {
      optionElement.addEventListener("click", () =>
        this.selectOption(optionElement)
      )
      optionElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.selectOption(optionElement)
        }
      })

      optionElement.addEventListener("focusout", () => {
        setTimeout(() => {
          document.body.style.overflow = "auto"
        })
      })

      optionElement.addEventListener("keydown", (event) => {
        const isExpanded =
          this.filterListElement.getAttribute("aria-expanded") === "true"

        if (!isExpanded) {
          return
        }

        document.body.style.overflow = "hidden"

        if (event.key === "ArrowDown") {
          const nextOptionElement = optionElement.nextElementSibling
          if (nextOptionElement) {
            nextOptionElement.focus()
            return
          }
        }
        if (event.key === "ArrowUp") {
          const previousOptionElement = optionElement.previousElementSibling
          if (previousOptionElement) {
            previousOptionElement.focus()
            return
          }
        }
      })
    })
  }

  toggleListbox() {
    const isExpanded =
      this.filterListElement.getAttribute("aria-expanded") === "true"
    this.toggleOptionsTabindex(!isExpanded)
    this.filterListElement.setAttribute("aria-expanded", !isExpanded)
    this.chevron.className = isExpanded
      ? "fas fa-chevron-down"
      : "fas fa-chevron-up"
  }

  toggleOptionsTabindex(isExpanded) {
    const filterOptionElements = this.filterListElement.querySelectorAll(
      ".filter-option:not(#selected-option)"
    )
    filterOptionElements.forEach((optionElement) => {
      const tabindexValue = isExpanded ? "0" : "-1"
      optionElement.setAttribute("tabindex", tabindexValue)
    })
  }

  selectOption(clickedOptionElement) {
    const selectedOptionElementContent =
      this.selectedOptionElement.querySelector(".option-content")
    const clickedOptionLabel =
      clickedOptionElement.querySelector(".option-content").textContent
    const oldLabel = selectedOptionElementContent.textContent
    clickedOptionElement.querySelector(".option-content").textContent = oldLabel
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
