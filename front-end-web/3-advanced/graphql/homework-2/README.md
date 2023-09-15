## Overview

This repository adds mutations to the GraphQL schema developed in previous work.

## Usage

1. Install dependencies

```bash
yarn
```

2. Start the GraphQL server

```bash
yarn start
```

3. Open the GraphQL Playground and start querying any of the queries below

### Queries
  
  ```graphql
mutation addUser($userInput: UserInput!) {
    addUser(input: $userInput) {
      id
      username
      email
    }
}

mutation updateUser($userId: Int!, $userInput: UserInput!) {
    updateUser(id: $userId, input: $userInput) {
      id
      username
      email
    }
}

mutation deleteUser($userId: Int!) {
    deleteUser(id: $userId) {
      id
      username
      email
    }
}

mutation deleteAllUsers {
    deleteAllUsers {
      count
    }
}

mutation addEvent($eventInput: EventInput!) {
    addEvent(input: $eventInput) {
      id
      title
      desc
      date
    }
}

mutation updateEvent($eventId: Int!, $eventInput: EventInput!) {
    updateEvent(id: $eventId, input: $eventInput) {
      id
      title
      desc
      date
    }
}

mutation deleteEvent($eventId: Int!) {
    deleteEvent(id: $eventId) {
      id
      title
      desc
      date
    }
}

mutation deleteAllEvents {
    deleteAllEvents {
      count
    }
}

mutation addLocation($locationInput: LocationInput!) {
    addLocation(input: $locationInput) {
      id
      name
      desc
    }
}

mutation updateLocation($locationId: Int!, $locationInput: LocationInput!) {
    updateLocation(id: $locationId, input: $locationInput) {
      id
      name
      desc
    }
}

mutation deleteLocation($locationId: Int!) {
    deleteLocation(id: $locationId) {
      id
      name
      desc
    }
}

mutation deleteAllLocations {
    deleteAllLocations {
      count
    }
}

mutation addParticipant($participantInput: ParticipantInput!) {
    addParticipant(input: $participantInput) {
      id
      user {
        id
        username
        email
      }
      event {
        id
        title
        date
      }
    }
}

mutation updateParticipant(
  $participantId: Int!
  $participantInput: ParticipantInput!
) {
    updateParticipant(id: $participantId, input: $participantInput) {
      id
      user {
        id
        username
        email
      }
      event {
        id
        title
        date
      }
    }
}

mutation deleteParticipant($participantId: Int!) {
    deleteParticipant(id: $participantId) {
      id
      user {
        id
        username
        email
      }
      event {
        id
        title
        date
      }
    }
}

mutation deleteAllParticipants {
    deleteAllParticipants {
      count
    }
}

```

You can user variables like: 

```json
{
  "userInput": {
    "username": "newUser",
    "email": "newuser@example.com"
  },
  "userId": 1,
  "eventInput": {
    "title": "New Event",
    "desc": "Description of the event",
    "date": "2023-09-20",
    "from": "10:00 AM",
    "to": "12:00 PM",
    "location_id": 1,
    "user_id": 1
  },
  "eventId": 1,
  "locationInput": {
    "name": "New Location",
    "desc": "Description of the location",
    "lat": 40.7128,
    "lng": -74.0060
  },
  "locationId": 1,
  "participantInput": {
    "user_id": 2,
    "event_id": 1
  },
  "participantId": 1
}
```