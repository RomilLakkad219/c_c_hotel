export const BASE_URL = 'http://hotels-charme.prometteur.in/Front/Api/'

export const BASE_IMAGE_URL = 'https://backoffice.gaph.online/media/cache/normal_size/uploads/images/etablissements/'

export const WEB_SERVICE = {
    login: BASE_URL + 'mLogin',
    signUp: BASE_URL + 'mAdd/login',
    forgotPassword: BASE_URL + 'forget',
    userProfile: BASE_URL + 'fields/profile',
    updateProfile: BASE_URL + 'mAdd/profile',
    updateUserSocialProfile: BASE_URL + 'mAdd/profile',
    home: BASE_URL + 'fields/hotel',
    subscribe: BASE_URL + 'subscribe',
    languageChange: BASE_URL + 'mAdd/lang_change',
    hotelDetail: BASE_URL + 'fields/hotel_detail',
    getCountry: BASE_URL + 'fields/get_country',
    destinationPlaces: BASE_URL + 'fields/hotel',
    destination: BASE_URL + 'fields/destinations',
    getRegion: BASE_URL + 'fields/get_region',
    getServices: BASE_URL + 'fields/filter_services_experiences',
    howItWork: BASE_URL + 'fields/how_it_work',
    legalNotice: BASE_URL + 'fields/legal_notice',
    aboutDeveloper: BASE_URL + 'fields/about_developer',
    personalData: BASE_URL + 'fields/personal_data',
    blog: BASE_URL + 'fields/blog',
    matchMakingHotels: BASE_URL + 'fields/match_making_hotels',
    favouriteHotelList:BASE_URL+'fields/favourite_hotel',
    likeUnlikeHotel:BASE_URL+'mAdd/favouritelist_hotel',
    experienceFilter:BASE_URL+'fields/experience_filter',
    filterHotel:BASE_URL+'fields/filter_hotel',
    nearByHotel:BASE_URL+'fields/nearby_hotel',
    resetPassword:BASE_URL+'fields/reset_password'
}