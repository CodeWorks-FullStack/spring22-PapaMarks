import { generateId } from "../Utils/generateId.js"

export class Topping {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.pizzaId = data.pizzaId
  }

  get Template() {
    return `<li>${this.name} <i class="mdi mdi-delete selectable on-hover" title="delete topping" onclick="app.toppingsController.deleteTopping('${this.id}')"></i></li>`
  }
}