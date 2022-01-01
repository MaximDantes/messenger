import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import ChatsScreen from './screens/ChatsScreen'
import LibraryScreen from './screens/LibraryScreen'
import screensRoutes from './screens/routes'
import {headerStyles} from './styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {selectToken} from './selectors/auth-selectors'

const Drawer = createDrawerNavigator()

const Main = () => {
    return <NavigationContainer>
        <Drawer.Navigator initialRouteName={'Chats'}>
            <Drawer.Screen
                name={screensRoutes.chats}
                component={ChatsScreen}
                options={{
                    title: 'Диалоги',
                    headerStyle: headerStyles.container,
                }}
            />
            <Drawer.Screen
                name={screensRoutes.library}
                component={LibraryScreen}
                options={{
                    title: 'Библиотека',
                    headerStyle: headerStyles.container,
                }}
            />
        </Drawer.Navigator>
    </NavigationContainer>
}

export default Main
