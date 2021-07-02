const schedule = require("node-schedule")
const { getAllCartsService } = require("../services/cartService");
const { deleteCartService } = require("../services/cartService");
/**
 * Job schedule
 *    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
 */

/**
 *
 * @type {Job}
 * Every day at 00:00, if products was not ordered and cart was created 24 hours ago, cart is going to be deleted.
 */
module.exports = schedule.scheduleJob('* * 0 * * *', async (jobDate) => {
	try {
		const carts = await getAllCartsService()
		console.log("carts: ", carts)
		const cartsNotOrdered = carts.map(cart => {
			if (cart.order.history.orderedAt === null) return cart
		})

		cartsNotOrdered.forEach(cart => {
			const diff = Math.abs(jobDate - cart.order.history.progressedAt)
			if (diff >= 86_400_000) deleteCartService(cart._id)
		})
	} catch (e) {
		console.error(e)
	}
})
