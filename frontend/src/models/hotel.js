export default class Hotel {
    constructor (data = {}) {
        this.id = data.id || null
        this.name = data.name || ''
        this.city = data.city || ''
        this.address = data.address || ''
        this.webSite = data.web_site || ''
        this.freeWifi = !!(data.free_wifi)
        this.freeParking = !!(data.free_parking)
        this.breakfast = !!(data.breakfast)
        this.swimmingPool = !!(data.swimming_pool)
        this.spa = !!(data.spa)
        this.gym = !!(data.gym)
    }

    prepareForRequest() {
        return {
            name: this.name,
            city: this.city,
            address: this.address,
            web_site: this.webSite,
            free_parking: this.freeParking,
            free_wifi: this.freeWifi,
            breakfast: this.breakfast,
            swimming_pool: this.swimmingPool,
            spa: this.spa,
            gym: this.gym
        }
    }
}