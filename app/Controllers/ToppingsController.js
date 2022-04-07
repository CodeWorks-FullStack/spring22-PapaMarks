import { toppingsService } from "../Services/ToppingsService.js"
import { Pop } from "../Utils/Pop.js"

export class ToppingsController {
  addTopping(pizzaId) {
    window.event.preventDefault()
    try {
      /**@type {HTMLFormElement} */
      // @ts-ignore
      const form = window.event.target

      const toppingData = {
        pizzaId,
        name: form.topping.value
      }

      toppingsService.addTopping(toppingData)


    } catch (error) {
      console.error('[Topping form error]', error)
      Pop.toast(error.message, 'error')
    }
  }

  deleteTopping(id) {
    toppingsService.deleteTopping(id)
    Pop.toast('Delorted', "success")
  }
}