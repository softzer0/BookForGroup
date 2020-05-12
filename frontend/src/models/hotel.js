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
        switch (data.position) {
            case 1:
                this.position = {
                    name: "Inner center",
                    value: 1
                }
                break
            case 2:
                this.position = {
                    name: "Outer center",
                    value: 2
                }
                break
            case 3:
                this.position = {
                    name: "Near airport",
                    value: 3
                }
                break
            case 4:
                this.position = {
                    name: "Peripheral",
                    value: 4
                }
                break
            case 5:
                this.position = {
                    name: "Near sports center",
                    value: 5
                }
                break
        }
    }

    prepareForRequest() {
        return {
            name: this.name,
            city: this.city,
            address: this.address,
            web_site: this.webSite,
            position: this.position.value,
            free_parking: this.freeParking,
            free_wifi: this.freeWifi,
            breakfast: this.breakfast,
            swimming_pool: this.swimmingPool,
            spa: this.spa,
            gym: this.gym
        }
    }
}