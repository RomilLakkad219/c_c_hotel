//AUTHENTICATION
import Splash from "./Authentication/Splash";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import ForgotPassword from "./Authentication/ForgotPassword";
import Otp from "./Authentication/Otp";
import ResetPassword from "./Authentication/ResetPassword";
import Prepare from "./Prepare";

//BOTTOMBAR
import BottomBar from "./BottomBar/BottomBar";
import Home from "./BottomBar/Home";
import Favourite from "./BottomBar/Favourite";
import Booking from "./BottomBar/Booking";
import Profile from "./BottomBar/Profile";

//SCREENS
import HotelDetail from "./HotelDetail";
import Experience from "./Experience";
import Destination from "./Destination";
import Match from "./Match";
import DestinationPlace from "./DestinationPlace";
import MatchList from "./MatchList";
import PopularHotel from "./PopularHotel";
import EditProfile from "./EditProfile";
import Setting from "./Setting";
import Map from "./Map";
import HowItWork from "./HowItWork";
import Blog from "./Blog";
import LegalNotice from "./LegalNotice";
import PersonalData from "./PersonalData";
import AboutDeveloper from "./AboutDeveloper";
import Search from "./Search";

export const SCREENS = {
    Splash: {
        name: 'Splash',
        component: Splash
    },
    Prepare:{
        name:'Prepare',
        component:Prepare
    },
    Login: {
        name: 'Login',
        component: Login
    },
    SignUp: {
        name: 'SignUp',
        component: SignUp
    },
    ForgotPassword: {
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    Otp: {
        name: 'Otp',
        component: Otp
    },
    ResetPassword: {
        name: 'ResetPassword',
        component: ResetPassword
    },
    BottomBar: {
        name: 'BottomBar',
        component: BottomBar
    },
    Home: {
        name: 'Home',
        component: Home
    },
    Favourite: {
        name: 'Favourite',
        component: Favourite
    },
    Booking: {
        name: 'Booking',
        component: Booking
    },
    Profile: {
        name: 'Profile',
        component: Profile
    },
    HotelDetail: {
        name: 'HotelDetail',
        component: HotelDetail
    },
    Experience: {
        name: 'Experience',
        component: Experience
    },
    Destination: {
        name: 'Destination',
        component: Destination
    },
    Match: {
        name: 'Match',
        component: Match
    },
    DestinationPlace: {
        name: 'DestinationPlace',
        component: DestinationPlace
    },
    MatchList: {
        name: 'MatchList',
        component: MatchList
    },
    PopularHotel: {
        name: 'PopularHotel',
        component: PopularHotel
    },
    EditProfile: {
        name: 'EditProfile',
        component: EditProfile
    },
    Setting: {
        name: 'Setting',
        component: Setting
    },
    Map: {
        name: 'Map',
        component: Map
    },
    HowItWork: {
        name: 'HowItWork',
        component: HowItWork
    },
    Blog: {
        name: 'Blog',
        component: Blog
    },
    LegalNotice: {
        name: 'LegalNotice',
        component: LegalNotice
    },
    PersonalData: {
        name: 'PersonalData',
        component: PersonalData
    },
    AboutDeveloper: {
        name: 'AboutDeveloper',
        component: AboutDeveloper
    },
    Search: {
        name: 'Search',
        component: Search
    }
}