export const Mutation = {
  addUser: (_, args, { database, pubsub }) => {
    const newUser = {
      id: database.users.length + 1,
      ...args.input,
    };

    for (let i = 1; i <= database.users.length + 1; i++) {
      if (!database.users.find((user) => user.id === i)) {
        newUser.id = i;
        break;
      }
    }

    database.users.push(newUser);

    pubsub.publish("userCreated", { userCreated: newUser });

    return newUser;
  },
  updateUser: (_, args, { database }) => {
    const user = database.users.find((user) => user.id === args.id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...user,
      ...args.input,
    };
    database.users = database.users.map((user) =>
      user.id === args.id ? updatedUser : user
    );
    return updatedUser;
  },
  deleteUser: (_, args, { database }) => {
    const user = database.users.find((user) => user.id === args.id);
    if (!user) {
      throw new Error("User not found");
    }
    database.users = database.users.filter((user) => user.id !== args.id);
    return user;
  },
  deleteAllUsers: (_, __, { database }) => {
    const count = database.users.length;
    database.users = [];
    return { count };
  },
  addEvent: (_, args, { database, pubsub }) => {
    const newEvent = {
      id: database.events.length + 1,
      ...args.input,
    };

    for (let i = 1; i <= database.events.length + 1; i++) {
      if (!database.events.find((event) => event.id === i)) {
        newEvent.id = i;
        break;
      }
    }

    database.events.push(newEvent);

    pubsub.publish("eventCreated", { eventCreated: newEvent });

    return newEvent;
  },
  updateEvent: (_, args, { pubsub, database }) => {
    const event = database.events.find((event) => event.id === args.id);
    if (!event) {
      throw new Error("Event not found");
    }
    const updatedEvent = {
      ...event,
      ...args.input,
    };
    database.events = database.events.map((event) =>
      event.id === args.id ? updatedEvent : event
    );

    pubsub.publish(`eventUpdated:${updatedEvent.id}`, {
      eventUpdated: updatedEvent,
    });

    return updatedEvent;
  },
  deleteEvent: (_, args, { database }) => {
    const event = database.events.find((event) => event.id === args.id);
    if (!event) {
      throw new Error("Event not found");
    }
    database.events = database.events.filter((event) => event.id !== args.id);
    return event;
  },
  deleteAllEvents: (_, __, { database }) => {
    const count = database.events.length;
    database.events = [];
    return { count };
  },
  addLocation: (_, args, { database }) => {
    const newLocation = {
      id: database.locations.length + 1,
      ...args.input,
    };

    for (let i = 1; i <= database.locations.length + 1; i++) {
      if (!database.locations.find((location) => location.id === i)) {
        newLocation.id = i;
        break;
      }
    }

    database.locations.push(newLocation);

    return newLocation;
  },
  updateLocation: (_, args, { database }) => {
    const location = database.locations.find(
      (location) => location.id === args.id
    );
    if (!location) {
      throw new Error("Location not found");
    }
    const updatedLocation = {
      ...location,
      ...args.input,
    };
    database.locations = database.locations.map((location) =>
      location.id === args.id ? updatedLocation : location
    );
    return updatedLocation;
  },
  deleteLocation: (_, args, { database }) => {
    const location = database.locations.find(
      (location) => location.id === args.id
    );
    if (!location) {
      throw new Error("Location not found");
    }
    database.locations = database.locations.filter(
      (location) => location.id !== args.id
    );
    return location;
  },
  deleteAllLocations: (_, __, { database }) => {
    const count = database.locations.length;
    database.locations = [];
    return { count };
  },
  addParticipant: (_, args, { database, pubsub }) => {
    const newParticipant = {
      id: database.participants.length + 1,
      ...args.input,
    };

    for (let i = 1; i <= database.participants.length + 1; i++) {
      if (!database.participants.find((participant) => participant.id === i)) {
        newParticipant.id = i;
        break;
      }
    }

    database.participants.push(newParticipant);

    pubsub.publish(`participantAdded:${newParticipant.event_id}`, {
      participantAdded: newParticipant,
    });

    return newParticipant;
  },
  updateParticipant: (_, args, { database }) => {
    const participant = database.participants.find(
      (participant) => participant.id === args.id
    );
    if (!participant) {
      throw new Error("Participant not found");
    }
    const updatedParticipant = {
      ...participant,
      ...args.input,
    };
    database.participants = database.participants.map((participant) =>
      participant.id === args.id ? updatedParticipant : participant
    );
    return updatedParticipant;
  },
  deleteParticipant: (_, args, { database }) => {
    const participant = database.participants.find(
      (participant) => participant.id === args.id
    );
    if (!participant) {
      throw new Error("Participant not found");
    }
    database.participants = database.participants.filter(
      (participant) => participant.id !== args.id
    );
    return participant;
  },
  deleteAllParticipants: (_, __, { database }) => {
    const count = database.participants.length;
    database.participants = [];
    return { count };
  },
};
