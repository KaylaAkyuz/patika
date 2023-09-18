## Overview

This repository has a GraphQL schema developed using [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) for a data of continents, countries, and languages.

## Usage

1. Install dependencies

```bash
yarn
```

2. Start the GraphQL server

```bash
yarn start
```

3. Open the GraphQL Playground and start querying. Here are some examples:

```graphql
query GetAllData {
  countries {
    code
    name
    native
    emoji
    emojiU
    capital
    phone    
    continent {
      code
      name
    }
    languages {
      code
      name
      native
      rtl
    }
  }
  
  continents{
    code
    name
    countries{
      code
      name
    }
  }
  
  languages{
    code
    name
    native
    rtl
  }
}
```

