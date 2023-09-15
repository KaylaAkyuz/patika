## Overview

This repository contains GraphQL schema definitions to work with a JSON data source.

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
query getUsers {
    users {
      id
      username
      email
      events {
        id
        title
        desc
        date
        participants {
          id
          user {
            id
            username
            email
          }
        }
      }
    }
}

query getUser($userId: Int!) {
    user(id: $userId) {
      id
      username
      email
      events {
        id
        title
        desc
        date
        participants {
          id
          user {
            id
            username
            email
          }
        }
      }
    }
}

query getEvents{
    events {
      id
      title
      desc
      date
      from
      to
      user {
        id
        username
        email
      }
      participants {
        id
        user {
          id
          username
          email
        }
      }
      location {
        id
        name
        desc
        lat
        lng
      }
    }
}

query getEvent($eventId: Int!){
    event(id: $eventId) {
      id
      title
      desc
      date
      from
      to
      user {
        id
        username
        email
      }
      participants {
        id
        user {
          id
          username
          email
        }
      }
      location {
        id
        name
        desc
        lat
        lng
      }
    }
}

query getLocations{
    locations {
      id
      name
      desc
      lat
      lng
    }
}

query getLocation($locationId: Int!) {
    location(id: $locationId) {
      id
      name
      desc
      lat
      lng
    }
}



query Participants {
    participants {
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



query Participant($participantId: Int!) {
    participant(id: $participantId) {
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
```

You can user variables like: 

```json
{
  "userId": 1,
  "eventId": 1,
  "locationId": 1,
  "participantId": 1,
}
```