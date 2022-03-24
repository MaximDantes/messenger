import {IArticlePreview, IFile, IMessage} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {formatDate} from '../utilits/format-date'
import config from '../config'
import {Alert} from 'react-native'

type SendSubscriber = (message: IMessage) => void
type DeleteSubscriber = (id: number, chatId: number) => void
type EditSubscriber = (message: IMessage) => void

//TODO remove type duplication
type SocketMessage = {
    status: 'error' | 'success'
    message: {
        id: number
        messageId: number
        text: string
        chatId: number
        date: Date
        files: IFile[]
        articles: IArticlePreview[]
        user: {
            id: number
            firstName: string
            lastName: string
            avatar: string
        }
        clientSideId?: number
        message?: string
        messageType: 'new_message' | 'update_message' | 'delete_message'
    }
}

class WebSocketApi {
    private _token: string = ''
    private ws: WebSocket | null = null
    private sendSubscribers: SendSubscriber[] = []
    private deleteSubscribers: DeleteSubscriber[] = []
    private editSubscribers: EditSubscriber[] = []
    private onCloseCallback: (() => void) | undefined = undefined

    set token(value: string) {
        this._token = value
        this.createChannel()
    }

    set onClose(callback: () => void) {
        this.onCloseCallback = callback
    }

    close() {
        this.ws?.close()
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

    subscribeOnEdit(callback: EditSubscriber) {
        if (!this.ws) {
            this.createChannel()
        }

        this.editSubscribers.push(callback)
    }

    send(message: string, chatId: number, clientSideId: number, files: number[], articles: number[]) {
        this.ws?.send(JSON.stringify({
            message: {
                text: message,
                chat_id: chatId,
                files,
                client_side_id: clientSideId,
                message_type: 'new_message',
                articles,
            }
        }))
    }

    remove(id: number, chatId: number) {
        this.ws?.send(JSON.stringify({
            message: {
                message_id: id,
                chat_id: chatId,
                message_type: 'delete_message',
            }
        }))
    }

    edit(id: number, message: string, chatId: number, files: number[], articles: number[]) {
        this.ws?.send(JSON.stringify({
            message: {
                message_id: id,
                text: message,
                chat_id: chatId,
                files,
                articles,
                message_type: 'update_message',
            }
        }))
    }

    private createChannel() {
        this.ws?.close()
        this.ws?.removeEventListener('close', this.closeHandler)
        this.ws?.removeEventListener('message', this.messageReceivedHandler)

        this.ws = new WebSocket(`wss://${config.serverAddress}/ws/chat/?access=${this._token}`)
        this.ws.addEventListener('close', this.closeHandler)
        this.ws.addEventListener('message', this.messageReceivedHandler)

        console.log('ws opened')
    }

    private closeHandler = async () => {
        //TODO reconnect
        // console.error('ws closed')
        // console.log('callback', this.onCloseCallback)
        // await this.onCloseCallback?.()
        //
        // this.ws?.removeEventListener('close', this.closeHandler)
        // this.ws?.removeEventListener('message', this.messageReceivedHandler)
        // this.ws = new WebSocket(`wss://${config.serverAddress}/ws/chat/?access=${this._token}`)
        // this.ws.addEventListener('close', this.closeHandler)
        // this.ws.addEventListener('message', this.messageReceivedHandler)
        // console.log('ws opened')
    }

    private messageReceivedHandler = (e: MessageEvent) => {
        const response = formatDate<SocketMessage>(snakeToCamel(JSON.parse(e.data)))

        if (response.status === 'error' && response.message.message) {
            throw new Error(response.message.message)
        }

        if (response.message.messageType === 'new_message') {
            this.sendSubscribers.forEach(item => {
                item(response.message as IMessage)
            })
            return
        }

        if (response.message.messageType === 'update_message') {
            this.editSubscribers.forEach(item => {
                item(response.message as IMessage)
            })
            return
        }

        if (response.message.messageType === 'delete_message') {
            this.deleteSubscribers.forEach(item => {
                item(response.message.messageId, response.message.chatId)
            })
            return
        }
    }

}

export default new WebSocketApi()