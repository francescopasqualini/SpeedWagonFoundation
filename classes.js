class Db {
    
    constructor() {
        this.dbchat = {};
    }

    insertMessage(idUser1, idUser2, message) {
        let idchat = Math.min(idUser1, idUser2).toString() + ":" + Math.max(idUser1, idUser2).toString();
        if (idchat in this.dbchat) {
            this.dbchat[idchat][idUser1].push(message);
        } else {
            this.dbchat[idchat] = {};
            this.dbchat[idchat][idUser1] = [];
            this.dbchat[idchat][idUser2] = [];
            this.dbchat[idchat][idUser1].push(message);
        }
    }
    retrieveMessage(idSender, idUser2, idMessage) {
        let res = null;
        let idchat = Math.min(idSender, idUser2).toString() + ":" + Math.max(idSender, idUser2).toString();
        if (idchat in this.dbchat) {
            var messagesList = this.dbchat[idchat][idSender];
            var index = messagesList.findIndex(m => m.id == idMessage);
            res = index != -1 ? messagesList[index] : res;
        }
        return res;
    }
    retrieveChat(idSender, idUser2) {
        let res = null;
        let idchat = Math.min(idSender, idUser2).toString() + ":" + Math.max(idSender, idUser2).toString();
        if (idchat in this.dbchat){
            res = this.dbchat[idchat];
        }
        return res;
    }
    deleteMessage(idSender, idUser2, idMessage) {
        let res = false;
        let idchat = Math.min(idSender, idUser2).toString() + ":" + Math.max(idSender, idUser2).toString();
        if (idchat in this.dbchat) {
            let messagesList = this.dbchat[idchat][idSender];
            let index = messagesList.findIndex(m => m.id == idMessage);
            if (index != -1){
                messagesList.splice(index, 1);
                res = true;
            }
        }
        return res;
    }
    editMessage(idSender, idUser2, message){
        let res = false;
        let idchat = Math.min(idSender, idUser2).toString() + ":" + Math.max(idSender, idUser2).toString();
        if (idchat in this.dbchat) {
            let messagesList = this.dbchat[idchat][idSender];
            let index = messagesList.findIndex(m => m.id == message.id);
            if (index != -1) {
                let m = messagesList[index];
                m.body = message.body; //modifico il body del messaggio
                m.edited_at = new Date().getTime();
                res = true;
            }
        }
        return res;
    }
};

class Message{
    
    constructor(type, id, from, to, in_response_to, body){
        this.type = type;
        this.id = id;
        this.from = from;
        this.to = to;
        this.in_response_to = in_response_to;
        this.body = body;
    }
};

module.exports = {Db, Message};