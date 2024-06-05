export class ContactModal {
  constructor() {
    this.contactModal = document.querySelector("#contactModal")
    this.contactModalButton = document.querySelector("#contactButton")
    this.closeButton = this.contactModal.querySelector("#closeContactModal")
    this.submitButton = this.contactModal.querySelector("button[type='submit']")
    this.form = this.contactModal.querySelector("form")
    this.bindOpenButton()
    this.bindCloseButton()
    this.bindForm()
    this.bindKeyboardEvents()
  }

  bindForm() {
    this.form.addEventListener("submit", async (event) => {
      event.preventDefault()
      const formData = new FormData(this.form)
      console.log(Object.fromEntries(formData))
      const mockAPIResponse = {
        ok: true,
      }
      if (mockAPIResponse.ok) {
        this.form.reset()
        this.close()
      }
    })
  }

  bindOpenButton() {
    this.contactModalButton.addEventListener("click", () => this.open())
  }

  bindCloseButton() {
    this.closeButton.addEventListener("click", () => this.close())
    this.closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.close()
      }
    })
  }

  bindKeyboardEvents() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.close()
      }
    })
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === this.closeButton) {
            event.preventDefault()
            this.submitButton.focus()
          }
        } else {
          if (document.activeElement === this.submitButton) {
            event.preventDefault()
            this.closeButton.focus()
          }
        }
      }
    })
  }

  open() {
    document.body.style.overflow = "hidden"
    this.contactModal.style.display = "flex"
    this.closeButton.focus()
    this.bindCloseButton()
  }

  close() {
    document.body.style.overflow = "auto"
    this.contactModal.style.display = "none"
  }
}
