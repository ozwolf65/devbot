import axios from "axios";
import {base_url} from "./const.ts";

const applicationServerPublicKey = "KEY_HERE";
let swRegistration: ServiceWorkerRegistration;

// used to convert the server public key to a Uint8Array for subscribing
function urlB64ToUint8Array(base64String: String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


function regWorker() {
    if ("serviceWorker" in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register("./src/worker.ts")
            .then(function (swReg) {
                swRegistration = swReg;
                console.log("successfully registered worker")
                subscribeUser()
            })

            .catch(function (error) {
                console.error("Service worker error", error)
            });

    } else {
        console.warn("Push not supported")
    }
}

// update server with new subscriber info
function updateServerSubscription(sub: PushSubscription) {
    if (sub) {
        axios.post(`${base_url}/subscribe`, sub.toJSON())
            .catch((err) =>
            console.error("err while posting sub: ",err)
        )
        console.log(JSON.stringify(sub))

    }
}

function subscribeUser() {
    if (!swRegistration) {
        console.error("no registration")
        return
    }
    const applicationKey = urlB64ToUint8Array(applicationServerPublicKey)
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationKey
    })
        .then((sub) => {
            updateServerSubscription(sub)

        }
        )
        .catch(function (err: Error) {
            console.error("Failed to sub user: ", err)
        })
}
regWorker()
