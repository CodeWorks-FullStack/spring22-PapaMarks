import { ProxyState } from "../AppState.js"
import { pizzasService } from "../Services/PizzasService.js"
import { loadState, saveState } from "../Utils/LocalStorage.js"
import { Pop } from "../Utils/Pop.js"

function _drawPizzas() {
  const pizzas = ProxyState.pizzas
  let template = ''
  pizzas.forEach(p => template += p.Template)
  document.getElementById('pizzas').innerHTML = template
}



export class PizzasController {
  constructor() {
    ProxyState.on('pizzas', _drawPizzas)
    ProxyState.on('toppings', _drawPizzas)
    ProxyState.on('pizzas', saveState)
    ProxyState.on('toppings', saveState)

    loadState()
    _drawPizzas()
  }

  createPizza() {
    window.event.preventDefault()
    try {
      /** @type {HTMLFormElement} */
      // @ts-ignore
      const form = window.event.target

      const pizzaData = {
        name: form.pizzaName.value,
        sauce: form.sauce.value,
        crust: form.crust.value
      }

      pizzasService.createPizza(pizzaData)

    } catch (error) {
      console.error("[PIZZA FORM ERROR]", error)
      Pop.toast(error.message, "error")
    }
  }

  async deletePizza(id) {
    // confirm the delete
    if (await Pop.confirm()) {
      pizzasService.deletePizza(id)
      Pop.toast('Deleted', 'success')
    }
  }
}