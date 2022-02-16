import {RouteProp} from '@react-navigation/native'
import {IArticle, ISpeciality, IUser} from './entities'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type StackNavigatorParamList = {
    Messages: { id: number },
    Main: undefined,
    Documents: { uri: string, name?: string },
    Images: { images: string[], position?: number }
    Auth: undefined,
    Attachments: { id: number },
    Article: { article: IArticle },
    LibrarySpeciality: { speciality: ISpeciality },
    Members: { members: IUser[], chatName: string },
    ChangePassword: { recoveryMode: boolean },
}

export type TabNavigatorParamList = {
    Profile: undefined,
    Chats: undefined,
    Library: undefined,
}

export type AttachmentsNavigatorParamList = {
    FilesAttachments: { chatId: number, type: 'IMG' | 'DOC' }
    ImagesAttachments: { chatId: number, type: 'IMG' | 'DOC' }
}

type StackNavigationProps = NativeStackNavigationProp<StackNavigatorParamList>
export type TabNavigationProps = BottomTabNavigationProp<TabNavigatorParamList>
type AttachmentsNavigationProps = BottomTabNavigationProp<AttachmentsNavigatorParamList>

export type NavigationProps = StackNavigationProps & TabNavigationProps & AttachmentsNavigationProps


type ParamList = StackNavigatorParamList & TabNavigatorParamList & AttachmentsNavigatorParamList
type ScreenRouteProp<T extends keyof ParamList> = RouteProp<ParamList, T>

export type ScreenProps<T extends keyof ParamList> = {
    route: ScreenRouteProp<T>
}

