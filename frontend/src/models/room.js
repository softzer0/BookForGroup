import { parseISO, formatISO, format } from 'date-fns'

export default class Room {
    constructor (data = {}) {
        this.id = data.pk || null
        this.hotelId = data.hotel
        this.floorNumber = data.floor_number || 0
        this.roomCount = data.room_count || 1
        this.roomType = data.room_type === 'AP' ? { name: "Apartment", value: "AP" } : { name: "Studio", value: "ST" }
        this.bedsNumber = data.beds_number || 1
        this.pricePerAdult = data.price_per_adult || 1
        this.pricePerChild = data.price_per_child || 1
        this.reservedPeriod = [ data.reserved_from && format(parseISO(data.reserved_from), 'yyyy-mm-dd') || '',
                                data.reserved_until && format(parseISO(data.reserved_until), 'yyyy-mm-dd') || '']
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
            hotel: this.hotelId,
            floor_number: this.floorNumber,
            room_count: this.roomCount,
            room_type: this.roomType.value,
            beds_number: this.bedsNumber,
            price_per_adult: this.pricePerAdult,
            price_per_child: this.pricePerChild,
            reserved_from: formatISO(parseISO(this.reservedPeriod[0])),
            reserved_until: formatISO(parseISO(this.reservedPeriod[1])),
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