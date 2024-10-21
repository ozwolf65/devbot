import {base_url} from "./const.ts";

self.addEventListener('push', function (event: PushEvent) {
    console.log('[Service Worker] Push Received.');
    // body expects at least a change and name field
    const body = JSON.parse(event.data!.text())
    const title = 'DevBot';
    let text: string;
    switch (body.change) {
        case "add":
            text = `Added ${body.name} to the queue`
            break
        case "next":
            text = `Next up is ${body.name}`
            break
        default:
            console.error("unsupported change type")
            return

    }
    const options = {
        body: text
    }
    event.waitUntil(self.registration.showNotification(title,options));
});

self.addEventListener('notificationclick', function(event: NotificationEvent) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(base_url)
    );
});
