import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect} from 'react'
import LibraryScreen from './screens/LibraryScreen'
import screensRoutes from './screens/routes'
import routes from './screens/routes'
import {useDispatch, useSelector} from 'react-redux'
import {auth} from './store/auth/thunks'
import ProfileScreen from './screens/ProfileScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AuthScreen from './screens/AuthScreen'
import {selectIsAuth} from './selectors/auth-selectors'
import ChatsScreen from './screens/ChatsScreen'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MessagesScreen from './screens/MessagesScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MainNavigation: React.FC = () => {
    return <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName

                switch (route.name) {
                    case routes.profile:
                        iconName = 'people'
                        break

                    case routes.chats:
                        iconName = 'people'
                        break

                    default:
                        iconName = 'book'
                }

                return <Ionicons name={iconName} size={size} color={color}/>
            },
        })}
    >
        <Tab.Screen
            name={screensRoutes.profile}
            component={ProfileScreen}
            options={{title: 'Профиль'}}
        />
        <Tab.Screen
            name={screensRoutes.chats}
            component={ChatsScreen}
            options={{title: 'Диалоги'}}
        />
        <Tab.Screen
            name={screensRoutes.library}
            component={LibraryScreen}
            options={{title: 'Библиотека'}}
        />
    </Tab.Navigator>
}


const Main: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth('ggaek@ggaek.by', 'head'))
        // dispatch(refreshToken())
    }, [])

    const isAuth = useSelector(selectIsAuth)

    return <NavigationContainer>
        <Stack.Navigator>
            {isAuth ?
                <>
                    <Stack.Screen name={routes.main} component={MainNavigation} options={{headerShown: false}}/>
                    <Stack.Screen name={routes.messages} component={MessagesScreen}/>
                </>

                :

                <Stack.Screen name={routes.auth} component={AuthScreen} options={{headerShown: false}}/>
            }
        </Stack.Navigator>
    </NavigationContainer>
}

export default Main
