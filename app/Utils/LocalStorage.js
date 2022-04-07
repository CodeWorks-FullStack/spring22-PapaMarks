import { ProxyState } from "../AppState.js"
import { Pizza } from "../Models/Pizza.js"
import { Topping } from "../Models/Topping.js"

export function saveState() {
  let data = {
    pizzas: ProxyState.pizzas,
    toppings: ProxyState.toppings
  }
  window.localStorage.setItem('papaMarksPizza', JSON.stringify(data))
}


export function loadState() {
  let data = window.localStorage.getItem('papaMarksPizza')
  if (data) {
    let obj = JSON.parse(data)
    ProxyState.pizzas = obj.pizzas.map(p => new Pizza(p))
    ProxyState.toppings = obj.toppings.map(t => new Topping(t))
  }
}