export default class Room {
    constructor (data = {}) {
        this.id = data.pk || null
        this.hotel = data.hotel || null
        this.floorNumber = data.floor_number || 0
        this.roomCount = data.room_count || 0
        this.roomType = data.room_type === 'AP' ? { name: "Apartment", value: "AP" } : { name: "Studio", value: "ST" }
        this.bedsNumber = data.beds_number || 1
        this.price = data.price || 0
        this.reservedFrom = data.reserved_from
        this.reservedUntil = data.reserved_until
        this.smokingAllowed = !!(data.smoking_allowed)
        this.peopleWithDisabilitiesAdapted = !!(data.people_with_disabilities_adapted)
        this.terrace = !!(data.terrace)
        this.airConditioning = !!(data.air_conditioning)
        this.tv = !!(data.tv)
        this.soundIsolation = !!(data.sound_isolation)
        this.heating = !!(data.heating)
        this.kitchen = !!(data.kitchen)
    }

    prepareForRequest() {
        return {
            id: this.id,
            hotel: this.hotel,
            floor_number: this.floorNumber,
            room_count: this.roomCount,
            room_type: this.roomType.value,
            beds_number: this.bedsNumber,
            price: this.price,
            reserved_from: this.reservedFrom,
            reserved_until: this.reservedUntil,
            smoking_allowed: this.smokingAllowed,
            people_with_disabilities_adapted: this.peopleWithDisabilitiesAdapted,
            terrace: this.terrace,
            air_conditioning: this.airConditioning,
            tv: this.tv,
            sound_isolation: this.soundIsolation,
            heating: this.heating,
            kitchen: this.kitchen
        }
    }
}