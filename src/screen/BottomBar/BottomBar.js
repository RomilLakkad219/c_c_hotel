import React,{useState} from "react"

//PACKAGES
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//TABBAR
import { Tabbar } from "../../component";

//SCREENS
import { SCREENS } from "..";

const BottomBar = (props) => {

    const Tab = createBottomTabNavigator()

    const [unreadCount, setUnReadCount] = useState(0)

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}
            tabBar={props => {
                return (
                    <Tabbar {...props} unreadCount={unreadCount} />
                )
            }}>
            <Tab.Screen name={SCREENS.Home.name}
                component={SCREENS.Home.component} />
            <Tab.Screen name={SCREENS.Booking.name}
                component={SCREENS.Booking.component} />
            <Tab.Screen name={SCREENS.Favourite.name}
                component={SCREENS.Favourite.component} />
            <Tab.Screen name={SCREENS.Profile.name}
                component={SCREENS.Profile.component} />
        </Tab.Navigator>
    )
}

export default BottomBar;