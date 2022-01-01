import {IMessage} from '../types/dto'

type Subscriber = (messages: IMessage[]) => void

class MessagesApi {
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

    send(message: string, chatId: number, senderId: number) {
        //TODO camel case to snake case
        this.ws?.send(JSON.stringify({
            message: {
                from_user: senderId,
                text: message,
                chat_id: chatId,
            }
        }))
    }

    private createChannel() {
        this.ws?.close()
        this.ws?.removeEventListener('close', this.closeHandler)
        this.ws = new WebSocket(`wss://ggaekappdocker.herokuapp.com/ws/chat/FIRST/?access=${this._token}`)
        this.ws.addEventListener('close', this.closeHandler)
        this.ws.addEventListener('message', this.messageReceivedHandler)
    }

    private closeHandler() {
        console.log('ws closed')
        setTimeout(this.createChannel, 3000)
    }

    private messageReceivedHandler = (e: MessageEvent) => {
        debugger
        this.subscribers.forEach(item => item(JSON.parse(e.data) as IMessage[]))
    }
}

export default new MessagesApi()