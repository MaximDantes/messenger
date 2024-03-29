import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect} from 'react'
import LibraryScreen from './screens/LibraryScreen'
import {useDispatch, useSelector} from 'react-redux'
import {checkAuth} from './store/auth/auth-thunks'
import ProfileScreen from './screens/ProfileScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AuthScreen from './screens/AuthScreen'
import {selectAuthFetching, selectIsAuth} from './store/auth/auth-selectors'
import ChatsScreen from './screens/ChatsScreen'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MessagesScreen from './screens/MessagesScreen'
import DocumentsScreen from './screens/DocumentsScreen'
import {Preloader} from './components/common/Preloader'
import ImagesScreen from './screens/ImagesScreen'
import AttachmentsScreen from './screens/AttachmentsScreen'
import ArticleScreen from './screens/ArticleScreen'
import {StackNavigatorParamList, TabNavigatorParamList} from './types/screens'
import MembersScreen from './screens/MembersScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen'
import ArticleFormScreen from './screens/ArticleFormScreen'
import ChangeEmailScreen from './screens/ChangeEmailScreen'
import VerificationScreen from './screens/VerificationScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'

const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const Stack = createNativeStackNavigator<StackNavigatorParamList>()

const MainNavigation: React.FC = () => {
    return <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarHideOnKeyboard: true,

            tabBarIcon: ({focused, color, size}) => {
                switch (route.name) {
                    case 'Profile':
                        return <Ionicons name={'people'} size={size} color={color}/>

                    case 'Chats':
                        return <EntypoIcon name={'chat'} size={size} color={color}/>

                    default:
                        return <MaterialIcon name={'library-books'} size={size} color={color}/>
                }
            },
        })}
    >
        <Tab.Screen name={'Profile'} component={ProfileScreen} options={{title: 'Профиль'}}/>
        <Tab.Screen name={'Chats'} component={ChatsScreen} options={{title: 'Диалоги'}}/>
        <Tab.Screen name={'Library'} component={LibraryScreen} options={{headerShown: false, title: 'Вики'}}/>
    </Tab.Navigator>
}


const Main: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    const isAuth = useSelector(selectIsAuth)
    const isAuthFetching = useSelector(selectAuthFetching)

    return <NavigationContainer>
        {isAuthFetching
            ?
            <Preloader/>

            :

            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    animation: 'default',
                    presentation: 'modal',
                }}
            >
                {isAuth ?
                    <>
                        <Stack.Screen name={'Main'} component={MainNavigation} options={{headerShown: false}}/>
                        <Stack.Screen name={'Messages'} component={MessagesScreen}/>
                        <Stack.Screen name={'Documents'} component={DocumentsScreen}/>
                        <Stack.Screen name={'Images'} component={ImagesScreen}/>
                        <Stack.Screen name={'Attachments'} component={AttachmentsScreen} options={{title: 'Вложения'}}/>
                        <Stack.Screen name={'Article'} component={ArticleScreen}/>
                        <Stack.Screen name={'ArticleForm'} component={ArticleFormScreen}
                                      options={{title: 'Добавить запись'}}/>
                        <Stack.Screen name={'Members'} component={MembersScreen}/>
                        <Stack.Screen options={{title: 'Изменение пароля'}} name={'ChangePassword'}
                                      component={ChangePasswordScreen}/>
                        <Stack.Screen options={{title: 'Изменение email'}} name={'ChangeEmail'}
                                      component={ChangeEmailScreen}/>
                        <Stack.Screen options={{title: 'Подтверждение email'}} name={'Verification'}
                                      component={VerificationScreen}/>
                    </>

                    :

                    <>
                        <Stack.Screen name={'Auth'} component={AuthScreen} options={{headerShown: false}}/>
                        <Stack.Screen options={{title: 'Восстановление пароля'}} name={'ForgotPassword'}
                                      component={ForgotPasswordScreen}/>
                        <Stack.Screen options={{title: 'Восстановление пароля'}} name={'Verification'}
                                      component={VerificationScreen}/>
                        <Stack.Screen options={{title: 'Восстановление пароля'}} name={'ChangePassword'}
                                      component={ChangePasswordScreen}/>
                    </>
                }
            </Stack.Navigator>

        }
    </NavigationContainer>
}

export default Main
