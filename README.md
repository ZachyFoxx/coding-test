# Nest.js Coding Test
A coding test I completed for a certain hosting company. This was my first time using Nest.js to build a web application.<br>
I used multple methods of doing things, so it may seem a little messy but I wanted to learn everything possible and see which I like the most.

## Running the application

### MacOS & Linux
- Clone this repository
- Run `yarn install`
- Configure .env
- Run `yarn start`

## Goals
Create a simple web application with Nest.js where you can register, update, and get information on "birdhouses".

## Endpoints
`POST /house`
- Request: { longitude: number, latitude: number, name: string }
- Response: { id: uuid, ubid: uuid, birds: number, eggs: number, longitude: number, latitude: number, name: string } (201)

`PATCH /house/:id`
- Request: { longitude: number, latitude: number, name: string }
- Response: { birds: number, eggs: number, longitude: number, latitude: number, name: string } (200)

`POST /house/:id/residency`
- Request: { birds: number, eggs: number}
- Response: { birds: number, eggs: number, longitude: number, latitude: number, name: string } (201)

`GET /house/:id`
- Response: { birds: number, eggs: number, longitude: number, latitude: number, name: string } (200)

## Further Information
The birdhouses all supply the following header as authentication(except registering):<br>
`X-UBID: <UBID>`

A UBID (Unique Birdhouse Identifier) is similar to a UUID.<br>
Example: 69e03f88-2a05-4d8d-a540-073f8910aec5

All actions done in the API should be logged so all events that happened can be viewed.

## Rules
- Names of birdhouses can not be shorter than 4 and no longer than 16 characters
- Endpoints that receive information from birdhouses must be secured and match the X-UBID header with a UBID of a sold birdhouse. Other endpoints do not need to be secured as they will be public.
- Keep a history for birdhouse residence
- Each birdhouse has a registration number, only real registration numbers can talk with these endpoints. Registration numbers/birdhouses can be added in bulk to the API. (very simple authentication)
- Prune birdhouses that have not received an update in a year
