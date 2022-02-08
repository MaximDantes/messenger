import {RouteProp} from '@react-navigation/native'
import {IArticle} from './entities'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type StackNavigatorParamList = {
    Messages: { id: number },
    Main: undefined,
    Documents: { uri: string, name?: string },
    Images: { images: string[], position?: number }
    Auth: undefined,
    Attachments: { id: number },
    Article: { article: IArticle }
}

export type TabNavigatorParamList = {
    Profile: undefined,
    Chats: undefined,
    Library: undefined,
}

type StackNavigationProps = NativeStackNavigationProp<StackNavigatorParamList>
type TabNavigationProps = BottomTabNavigationProp<TabNavigatorParamList>

export type NavigationProps = StackNavigationProps & TabNavigationProps



type ParamList = StackNavigatorParamList & TabNavigatorParamList
type ScreenRouteProp<T extends keyof ParamList> = RouteProp<ParamList, T>

export type ScreenProps<T extends keyof ParamList> = {
    route: ScreenRouteProp<T>
}

