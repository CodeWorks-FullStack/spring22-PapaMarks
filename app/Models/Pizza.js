import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Pizza {
  constructor(data) {
    this.id = data.id || generateId()
    this.name = data.name
    this.crust = data.crust
    this.sauce = data.sauce
  }

  get Price() {
    let total = 0
    switch (this.crust.toLowerCase()) {
      case 'baby':
        total += 10
        break
      case 'regular':
        total += 12
        break
      case 'mega':
        total += 14
        break
    }
    let toppings = ProxyState.toppings.filter(t => t.pizzaId == this.id)
    return total + toppings.length
  }

  get Toppings() {
    let toppings = ProxyState.toppings.filter(t => t.pizzaId == this.id)
    let template = ''
    toppings.forEach(t => template += t.Template)
    return template
  }

  get Template() {
    let sauceColor = 'bg-'
    switch (this.sauce.toLowerCase()) {
      case 'red':
        sauceColor += 'sauce'
        break
      case 'white':
        sauceColor += 'cream'
        break
      case 'bbq':
        sauceColor += 'warning'
        break
    }

    return /* html */`
    <div class="col-4 p-4">
      <div class="rounded bg-light">
        <div class="rounded-top title-bar ${sauceColor} ${sauceColor == "bg-cream" ? "text-dark" : "text-light"} text-center p-3">
          <h3>${this.name} 
          ${this.crust.toLowerCase() == "baby" ? '👶' : ''}
          <i class="mdi mdi-delete text-dark selectable on-hover" onclick="app.pizzasController.deletePizza('${this.id}')"></i>
          </h3>
        </div>
        <div class="toppings-list p-3">
          <ul>
            ${this.Toppings}
          </ul>
        </div>
        <div class="text-end px-3">
          <h4>Total: $${this.Price}</h4>
        </div>
        <form onsubmit="app.toppingsController.addTopping('${this.id}')">
          <div class="mb-3 p-3">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Topping Name..." id="topping" required minlength="3" maxlength="15">
              <button class="btn btn-outline-secondary" type="submit">add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    `
  }

}