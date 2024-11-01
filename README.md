# DevBot
DevBot is a simple project which allows a team to easily manage who is using a development environment.
Our team previously would track this by messaging the developer chat, however as the team grew this became unsustainable.
As a result, I created this tool in order to connect to an API and track the queue of who is next to use dev.
This template will allow other teams to spin up a similar tool in minutes.

The queue is managed by an API, and sends notifications to users when updated by using a service worker to listen for updates.


## Functionality
- manage queue by sending requests to an api
- view queue in a simple FE
- receive updates when queue status updates

A template for a python API implementation of this can be found [here](https://github.com/ozwolf65/devbotAPI)

## Get Started
Clone the repo and change `src/const.ts`, setting `base_url` to the url of your API and `own_url` to the url of the frontend site.
A public key also needs providing in `assets/notifications.ts` to match the key for your chosen web push service.
Then build the Dockerfile and deploy to your chosen environment.
