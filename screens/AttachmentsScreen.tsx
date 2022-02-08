import React from 'react'
import {RouteProp} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Attachments from '../components/Attachments/Attachments'
import {ScreenProps} from '../types/screens'

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

const AttachmentsScreen: React.FC<ScreenProps<'Attachments'>> = (props) => {
    const chatId = props.route.params.id

    return <Tab.Navigator>
        <Tab.Screen
            name={'ImagesAttachments'}
            component={Attachments}
            initialParams={{chatId, type: 'IMG'}}
            options={{
                headerShown: false,
                tabBarLabel: 'Изображения'
            }}
        />
        <Tab.Screen
            name={'FilesAttachments'}
            component={Attachments}
            initialParams={{chatId, type: 'DOC'}}
            options={{
                headerShown: false,
                tabBarLabel: 'Документы'
            }}
        />
    </Tab.Navigator>
}

export default AttachmentsScreen

//TODO move to types folder
export type TabNavigatorParamList = {
    FilesAttachments: { chatId: number, type: 'IMG' | 'DOC' }
    ImagesAttachments: { chatId: number, type: 'IMG' | 'DOC' }
}