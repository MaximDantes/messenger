import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Attachments from '../components/Attachments/Attachments'
import {AttachmentsNavigatorParamList, ScreenProps} from '../types/screens'

const Tab = createBottomTabNavigator<AttachmentsNavigatorParamList>()

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
