class Db {
    
    constructor() {
        this.dbchat = {}
        this.dbchat.nextId = 1
        this.dbchat.users = new Set()
    }

    sendMessage(idUser1, idUser2, message) {
        let res = true
        this.dbchat.users.add(idUser1)
        this.dbchat.users.add(idUser2)
        let idchat = getIdChat(idUser1, idUser2)
        message.id = this.dbchat.nextId ++
        message.sent_at = getTimestamp()
        if (idchat in this.dbchat) {
            this.dbchat[idchat][idUser1].push(message)
        }else {
            this.dbchat[idchat] = {}
            this.dbchat[idchat][idUser1] = []
            this.dbchat[idchat][idUser2] = []
            this.dbchat[idchat][idUser1].push(message)
        }
        return res
    }
    retrieveMessage(idSender, idUser2, idMessage) {
        let res = null
        let idchat = getIdChat(idSender, idUser2)
        if (idchat in this.dbchat) {
            var messagesList = this.dbchat[idchat][idSender]
            var index = messagesList.findIndex(m => m.id == idMessage)
            res = index != -1 ? messagesList[index] : res
            if (res){
                res.received_at = getTimestamp()
            }
        }
        return res
    }
    retrieveChat(idSender, idUser2) {
        let res = null
        let idchat = getIdChat(idSender, idUser2)
        if (idchat in this.dbchat){
            res = this.dbchat[idchat]
        }
        return res
    }
    deleteMessage(idSender, idUser2, idMessage) {
        let res = false
        let idchat = getIdChat(idSender, idUser2)
        if (idchat in this.dbchat) {
            let messagesList = this.dbchat[idchat][idSender]
            let index = messagesList.findIndex(m => m.id == idMessage)
            if (index != -1){
                messagesList.splice(index, 1)
                res = true
            }
        }
        return res
    }
    editMessage(idSender, idUser2, message){
        let res = false
        let idchat = getIdChat(idSender, idUser2)
        if (idchat in this.dbchat) {
            let messagesList = this.dbchat[idchat][idSender]
            let index = messagesList.findIndex(m => m.id == message.id)
            if (index != -1) {
                let m = messagesList[index]
                m.content = message.content //modifico il content del messaggio
                m.edited_at = getTimestamp()
                res = true
            }
        }
        return res
    }
}

class Message{
    
    constructor(type, from, to, content, sent_at){
        this.type = type
        this.from = from
        this.to = to
        this.content = content
        this.sent_at = sent_at
    }
}

function getTimestamp() {
    let date = new Date()
    let res = date.getFullYear().toString() + "-" +
        date.getMonth().toString() + "-" +
        date.getDay().toString() + " " +
        date.getHours().toString() + ":" +
        date.getMinutes().toString() + ":" +
        date.getSeconds().toString() + ":" +
        date.getMilliseconds().toString()
    return res
}

function getIdChat(id1, id2){
    return Math.min(id1, id2).toString() + ":" + Math.max(id1, id2).toString()
}

module.exports = {Db, Message}