import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Attachments from '../components/Attachments/Attachments'
import {AttachmentsNavigatorParamList, ScreenProps} from '../types/screens'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

const Tab = createBottomTabNavigator<AttachmentsNavigatorParamList>()

const AttachmentsScreen: React.FC<ScreenProps<'Attachments'>> = (props) => {
    const chatId = props.route.params.id

    return <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                switch (route.name) {
                    case 'ImagesAttachments':
                        return <Ionicons name={'image-outline'} size={size} color={color}/>

                    case 'FilesAttachments':
                        return <FeatherIcon name={'file'} size={size} color={color}/>
                }
            },
        })}
    >
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