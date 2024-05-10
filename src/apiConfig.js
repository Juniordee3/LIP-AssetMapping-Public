// import { extractHospitalsData,
//     extractDrivingSchoolsData,
//     extractBoysAndGirlsClubData,
//     extractChildCareData,
//     extractDayProgramData,
//     extractDcsOfficesData
// } from "./extractors";

import { extractNewcomerServicesData, extractSettlementServiceProviderDirectoryData
} from "./newcomerSettlementServices";

// export const API_ENDPOINTS = {
//     hospitals: "https://data.novascotia.ca/resource/tmfr-3h8a.json",
//     driving_schools: "https://data.novascotia.ca/resource/hijj-kp39.json",
//     boys_and_girls_club: "https://data.novascotia.ca/resource/utbc-xmfs.json",
//     child_care_facilities: "https://data.novascotia.ca/resource/3j9v-yimg.json",
//     day_programs: "https://data.novascotia.ca/resource/99u3-pv3t.json",
//     dcs_offices: "https://data.novascotia.ca/resource/kmt6-2fge.json",   // department of community services offices
    
//     // newcomer settlement services
//     // newcomer_settlement_services: "https://ymcahfx.ca/wp-content/themes/hello-elementor/assets/release/newcomerServices.json",
//     newcomer_settlement_services: "http://localhost:3000/newcomerServices.json",
//     settlement_service_provider_directory: "https://data.novascotia.ca/resource/7t4h-ktpk.json"
// };

// export const NEWCOMER_SERVICES_ENDPOINTS = {
//     newcomer_settlement_services: "http://localhost:3000/newcomerServices.json",
//     settlement_service_provider_directory: "https://data.novascotia.ca/resource/7t4h-ktpk.json"
// };

// export const EXTRACTORS = {
//     hospitals: extractHospitalsData,
//     driving_schools: extractDrivingSchoolsData,
//     boys_and_girls_club: extractBoysAndGirlsClubData,
//     child_care_facilities: extractChildCareData,
//     day_programs: extractDayProgramData,
//     dcs_offices: extractDcsOfficesData,

//     // newcomer settlement services
//     newcomer_settlement_services: extractNewcomerServicesData,
//     settlement_service_provider_directory: extractSettlementServiceProviderDirectoryData
// };

export const CATEGORIES = {
    NEWCOMER_SERVICES_ENDPOINTS: [
        {
            url: "http://localhost:3000/newcomerServices.json",
            extractor: extractNewcomerServicesData
        },
        {
            url: "https://data.novascotia.ca/resource/7t4h-ktpk.json",
            extractor: extractSettlementServiceProviderDirectoryData
        }
    ]
};