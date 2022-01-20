import {NavigationContainer, RouteProp} from '@react-navigation/native'
import React, {useEffect} from 'react'
import LibraryScreen from './screens/LibraryScreen'
import {useDispatch, useSelector} from 'react-redux'
import {auth, checkAuth} from './store/auth/auth-thunks'
import ProfileScreen from './screens/ProfileScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AuthScreen from './screens/AuthScreen'
import {selectAuthFetching, selectIsAuth} from './selectors/auth-selectors'
import ChatsScreen from './screens/ChatsScreen'
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack'
import MessagesScreen from './screens/MessagesScreen'
import DocumentsScreen from './screens/DocumentsScreen'
import {Preloader} from './components/common/Preloader'
import ImagesScreen from './screens/ImagesScreen'

export type StackNavigatorParamList = {
    Messages: {id: number},
    Main: undefined,
    Documents: undefined,
    Images: {images: string[], position?: number}
    Auth: undefined,
}
export type StackNavigationProps = NativeStackNavigationProp<StackNavigatorParamList>

export type TabNavigatorParamList = {
   Profile: undefined,
   Chats: undefined,
   Library: undefined,
}

const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const Stack = createNativeStackNavigator<StackNavigatorParamList>()

const MainNavigation: React.FC = () => {
    return <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName

                switch (route.name) {
                    case 'Profile':
                        iconName = 'people'
                        break

                    case 'Chats':
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
            name={'Profile'}
            component={ProfileScreen}
            options={{title: 'Профиль'}}
        />
        <Tab.Screen
            name={'Chats'}
            component={ChatsScreen}
            options={{title: 'Диалоги'}}
        />
        <Tab.Screen
            name={'Library'}
            component={LibraryScreen}
            options={{title: 'Библиотека'}}
        />
    </Tab.Navigator>
}


const Main: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(auth('ggaek@ggaek.by', 'head'))
        // dispatch(auth('po13371@gmail.com', 'po13371@gmail.com'))
        dispatch(checkAuth())
    }, [])

    const isAuth = useSelector(selectIsAuth)
    const isAuthFetching = useSelector(selectAuthFetching)

    return <NavigationContainer>
        {isAuthFetching
            ?
            <Preloader/>

            :

            <Stack.Navigator>
                {isAuth ?
                    <>
                        <Stack.Screen
                            name={'Main'}
                            component={MainNavigation}
                            options={{headerShown: false}}

                        />
                        <Stack.Screen
                            name={'Messages'}
                            component={MessagesScreen}
                        />
                        <Stack.Screen
                            name={'Documents'}
                            component={DocumentsScreen}
                        />
                        <Stack.Screen
                            name={'Images'}
                            component={ImagesScreen}
                        />
                    </>

                    :

                    <Stack.Screen name={'Auth'} component={AuthScreen} options={{headerShown: false}}/>
                }
            </Stack.Navigator>

        }
    </NavigationContainer>
}

export default Main
