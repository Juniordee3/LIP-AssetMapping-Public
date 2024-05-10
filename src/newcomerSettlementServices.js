export function antigonishAdultLearningData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function antigonishWomensCentreData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function banksAndCreditUnionsData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function colchesterAdultLearningData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function immigrantServicesData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function newGlasgowPublicLibraryData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function northShoreLIPData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function pictouCountyContinuousLearningData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function pictouPublicLibraryData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function riverJohnPublicLibraryData(json) {
    return json.map(data => {
        return {
            
        };
    });
}

export function extractSettlementServiceProviderDirectoryData(json) {
    return json.map(data => {
        return {
            name: data.organization_name,
            type: data.organization_type,
            county: data.county,
            address: data.location_civic_address + " Unit " + data.location_unit + ", " + data.location_city_town + ", NS, " + data.postal_code,
            phone: data.phone_number1,
            website: data.website,
            latitude: data.geocoded_column.coordinates[1],
            longitude: data.geocoded_column.coordinates[0]
        };
    });
}

export function extractNewcomerServicesData(json) {
    return json.map(data => {
        return {
            name: data.service,
            location: data.location,
            address: data.address,
            phone: data.phone,
            email: data.email,
            website: data.website,
            description: data.description,
            latitude: data.latitude,
            longitude: data.longitude
        };
    });
}