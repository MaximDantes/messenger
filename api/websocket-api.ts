import {IMessage} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {formatDate} from '../utilits/format-date'
import config from '../config'

type Subscriber = (message: IMessage) => void

class WebSocketApi {
    private _token: string = ''
    private ws: WebSocket | null = null
    private subscribers: Subscriber[] = []

    set token(value: string) {
        this._token = value

        //TODO close channel
    }


    subscribe(callback: Subscriber) {
        if (!this.ws) {
            this.createChannel()
        }

        this.subscribers.push(callback)
    }

    unsubscribe(callback: Subscriber) {
        this.subscribers = this.subscribers.filter(item => item !== callback)
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

    private createChannel() {
        this.ws?.close()
        this.ws?.removeEventListener('close', this.closeHandler)
        this.ws = new WebSocket(`wss://${config.serverAddress}/ws/chat/?access=${this._token}`)
        this.ws.addEventListener('close', this.closeHandler)
        this.ws.addEventListener('message', this.messageReceivedHandler)
    }

    private closeHandler() {
        console.log('ws closed')
        setTimeout(this.createChannel, 3000)
    }

    private messageReceivedHandler = (e: MessageEvent) => {
        this.subscribers.forEach(item =>
            item(formatDate(snakeToCamel(JSON.parse(e.data))) as IMessage))
    }
}

export default new WebSocketApi()