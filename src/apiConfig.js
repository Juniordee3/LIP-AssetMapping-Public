import { extractHospitalsData,
    extractDrivingSchoolsData,
    extractBoysAndGirlsClubData,
    extractChildCareData,
    extractDayProgramData
} from "./extractors";

export const API_ENDPOINTS = {
    hospitals: "https://data.novascotia.ca/resource/tmfr-3h8a.json",
    driving_schools: "https://data.novascotia.ca/resource/hijj-kp39.json",
    boys_and_girls_club: "https://data.novascotia.ca/resource/utbc-xmfs.json",
    child_care_facilities: "https://data.novascotia.ca/resource/3j9v-yimg.json",
    day_programs: "https://data.novascotia.ca/resource/99u3-pv3t.json"
};

export const EXTRACTORS = {
    hospitals: extractHospitalsData,
    driving_schools: extractDrivingSchoolsData,
    boys_and_girls_club: extractBoysAndGirlsClubData,
    child_care_facilities: extractChildCareData,
    day_programs: extractDayProgramData
};