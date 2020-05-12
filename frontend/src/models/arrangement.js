
export default class Arrangement{
    constructor(data = {}) {
        this.id = data.id || null
        this.accommodationId = data.accommodation
        this.quantity = data.quantity || 1
        this.reservedPeriod = [data.reserved_from || '', data.reserved_until || '']
    }

    prepareForRequest(){
        return {
            accommodation: this.accommodationId,
            quantity: this.quantity,
            reserved_from: this.reservedPeriod[0],
            reserved_until: this.reservedPeriod[1],
        }
    }
}