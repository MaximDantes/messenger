import {IFile, IMessage} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {formatDate} from '../utilits/format-date'
import config from '../config'
import {Alert} from 'react-native'

type SendSubscriber = (message: IMessage) => void
type DeleteSubscriber = (id: number) => void

//TODO remove type duplication
type SocketMessage =  {
    id: number
    text: string
    chatId: number
    date: Date
    files: IFile[]
    user: {
        id: number
        firstName: string
        lastName: string
        avatar: string
    }
    clientSideId?: number
    deleteId?: number
}

class WebSocketApi {
    private _token: string = ''
    private ws: WebSocket | null = null
    private sendSubscribers: SendSubscriber[] = []
    private deleteSubscribers: DeleteSubscriber[] = []

    set token(value: string) {
        this._token = value

        //TODO close channel
    }


    subscribeOnSend(callback: SendSubscriber) {
        if (!this.ws) {
            this.createChannel()
        }

        this.sendSubscribers.push(callback)
    }

    subscribeOnDelete(callback: DeleteSubscriber) {
        if (!this.ws) {
            this.createChannel()
        }

        this.deleteSubscribers.push(callback)
    }

    send(message: string, chatId: number, clientSideId: number, files: string[]) {
        this.ws?.send(JSON.stringify({
            message: {
                text: message,
                chat_id: chatId,
                files,
                client_side_id: clientSideId,
            }
        }))
    }

    remove(id: number) {
        Alert.alert('message removed ' + id)

        this.ws?.send(JSON.stringify({
            delete_id: id,
        }))
    }

    private createChannel() {
        this.ws?.close()
        this.ws?.removeEventListener('close', this.closeHandler)
        this.ws = new WebSocket(`wss://${config.serverAddress}/ws/chat/?access=${this._token}`)
        this.ws.addEventListener('close', this.closeHandler)
        this.ws.addEventListener('message', this.messageReceivedHandler)
    }

    private closeHandler() {
        //TODO reconnect
        console.log('ws closed')
    }

    private messageReceivedHandler = (e: MessageEvent) => {
        const message = formatDate<SocketMessage>(snakeToCamel(JSON.parse(e.data)))

        if (message.deleteId) {
            this.deleteSubscribers.forEach(item => {
                item(message.id)
            })
        }

        this.sendSubscribers.forEach(item => {
            item(message as IMessage)
        })
    }

}

export default new WebSocketApi()