import {RouteProp} from '@react-navigation/native'
import {IArticle, IArticlePreview, ISpeciality, ISubject} from './entities'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type StackNavigatorParamList = {
    Messages: { id: number },
    Main: undefined,
    Documents: { uri: string, name?: string },
    Images: { images: string[], position?: number }
    Auth: undefined,
    Attachments: { id: number },
    Article: { articlePreview: IArticlePreview },
    ArticleForm: { subjectId?: number, specialityId?: number, year?: number, editedArticle?: IArticle }
    Members: { chatId: number, chatName: string },
    ChangePassword: { recoveryMode: boolean, email?: string },
    ChangeEmail: undefined
    Verification: { email: string, type: 'CHANGE_EMAIL' | 'RESTORE_PASSWORD' }
    ForgotPassword: { email: string }
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

export type LibraryNavigatorParamsList = {
    LibrarySpecialities: undefined
    LibraryYears: { speciality: ISpeciality },
    LibrarySubjects: { speciality: ISpeciality, year: number }
    LibraryArticles: { specialityId: number, year: number, subject: ISubject }
}

type StackNavigationProps = NativeStackNavigationProp<StackNavigatorParamList>
export type TabNavigationProps = BottomTabNavigationProp<TabNavigatorParamList>
type AttachmentsNavigationProps = BottomTabNavigationProp<AttachmentsNavigatorParamList>
type LibraryNavigationProps = NativeStackNavigationProp<LibraryNavigatorParamsList>

export type NavigationProps = StackNavigationProps & TabNavigationProps &
    AttachmentsNavigationProps & LibraryNavigationProps


type ParamList = StackNavigatorParamList & TabNavigatorParamList &
    AttachmentsNavigatorParamList & LibraryNavigatorParamsList
type ScreenRouteProp<T extends keyof ParamList> = RouteProp<ParamList, T>

export type ScreenProps<T extends keyof ParamList> = {
    route: ScreenRouteProp<T>
}

