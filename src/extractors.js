export function extractHospitalsData(json) {
    return json.map(data => {
        return {
            name: data.facility,
            address: data.address,
            town: data.town,
            county: data.county,
            type: data.type,
            latitude: data.the_geom.coordinates[1],
            longitude: data.the_geom.coordinates[0]
        };
    });
}

export function extractDrivingSchoolsData(json) {
    return json.map(data => {
        return {
            name: data.driving_school_name,
            address: data.address_1 + " " + data.address_2,
            latitude: data.georeference.coordinates[1],
            longitude: data.georeference.coordinates[0]
        };
    });
}

export function extractBoysAndGirlsClubData(json) {
    return json.map(data => {
        return {
            name: data.name,
            address: data.address,
            phone: data.phone,
            fax: data.fax,
            email: data.email,
            website: data.website.url,
            facebook: data.facebook.url,
            latitude: data.y_coordina,
            longitude: data.x_coordina
        };
    });
}

export function extractChildCareData(json) {
    return json.map(data => {
        return {
            name: data.facility_name,
            address: data.address,
            city: data.city,
            postalCode: data.postal,
            county: data.county,
            phone: data.phone,
            email: data.email,
            website: data.facility_url,
            latitude: data.location1.coordinates[1],
            longitude: data.location1.coordinates[0]
        };
    });
}

export function extractDayProgramData(json) {
    return json.map(data => {
        return {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            facebook: data.facebook,
            website: data.website,
            hours: data.hours,
            latitude: data.location.latitude,
            longitude: data.location.longitude
        };
    });
}

export function extractDcsOfficesData(json) {
    return json.map(data => {
        return {
            name: data.name,
            address: data.civic_addr,
            city: data.city,
            postalCode: data.postal_cod,
            phone: data.phone,
            fax: data.fax,
            website: data.website.url,
            hours: data.hours,
            latitude: data.location.coordinates[1],
            longitude: data.location.coordinates[0]
        };
    });
}