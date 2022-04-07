import { Pizza } from "./Models/Pizza.js"
import { Topping } from "./Models/Topping.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"


let marks = new Pizza({ name: 'Mark', sauce: 'white', crust: 'mega' })
let micks = new Pizza({ name: 'Micks', sauce: 'red', crust: 'regular' })
let harrison = new Pizza({ name: 'Harrison', sauce: 'BBQ', crust: 'baby' })

let markPep = new Topping({ name: "Pepperoni", pizzaId: marks.id })
let mickPep = new Topping({ name: "Pepperoni", pizzaId: micks.id })
let mickMush = new Topping({ name: "Mushroom", pizzaId: micks.id })
let harryHam = new Topping({ name: "Ham", pizzaId: harrison.id })

class AppState extends EventEmitter {
  /** @type {import('./Models/Pizza').Pizza[]} */
  pizzas = [marks, micks, harrison]
  /** @type {import('./Models/Topping').Topping[]} */
  toppings = [markPep, mickPep, mickMush, harryHam]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
