import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {Provider} from 'react-redux'
import store from './store/store'
import ChatsScreen from './screens/ChatsScreen'
import LibraryScreen from './screens/LibraryScreen'
import screensRoutes from './screens/routes'
import {headerStyles} from './styles/common'

const Drawer = createDrawerNavigator()

const App = () => {
    return <Provider store={store}>
        <NavigationContainer>
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
    </Provider>
}

export default App
