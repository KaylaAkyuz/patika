## Overview

This repository adds subscriptions to the GraphQL schema developed in previous work using [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server).

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
subscription UserCreated {
    userCreated {
      id
      username
      email
    }
}

subscription EventCreated {
    eventCreated {
      id
      title
      desc
      date
    }
}

subscription ParticipantAdded {
    participantAdded {
      id
      user_id
      event_id
    }
}

```
