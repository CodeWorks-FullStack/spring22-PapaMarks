import { ProxyState } from "../AppState.js"
import { Pizza } from "../Models/Pizza.js"

class PizzasService {

  createPizza(pizzaData) {
    if (pizzaData.crust.includes('Choose') || pizzaData.sauce.includes('Choose')) {
      throw new Error('You must choose a sauce and crust')
    }
    const pizza = new Pizza(pizzaData)
    ProxyState.pizzas = [...ProxyState.pizzas, pizza]
  }

  deletePizza(id) {
    // TODO[epic=Jake] saftey check with find by id

    ProxyState.pizzas = ProxyState.pizzas.filter(p => p.id !== id)

  }

}

export const pizzasService = new PizzasService()