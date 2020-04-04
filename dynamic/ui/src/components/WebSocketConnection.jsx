import Registration from './Registration';
export default class WebSocketConnection{
    constructor(url) {
        let ws = new WebSocket(url);

        ws.onclose = function(event) {
                if (event.wasClean) {
                    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                } else {
                    setTimeout(()=>{
                        console.log("Connection died");
                        let ws2 = new WebSocket(url);
                        ws2.onclose=ws.onclose;
                        ws2.onopen=ws.onopen;
                        ws2.onmessage=ws.onmessage;
                        ws=ws2
                        }, 1000)

                }
            };
        this.ws = ws
    }
};
