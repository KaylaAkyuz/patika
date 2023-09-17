import React, { useEffect } from "react";
import styles from "styles/skeleton.module.css";
import { Skeleton, List, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getEvents } from "graphql/Event/queries";
import { EventCreated } from "graphql/Event/subscriptions";
import Title from "components/Title";

function Events() {
  const { loading, error, data, subscribeToMore } = useQuery(getEvents);

  useEffect(() => {
    subscribeToMore({
      document: EventCreated,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newEvents = [...prev.events, subscriptionData.data.eventCreated];
        return {
          events: newEvents,
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {`${error}`}</p>;

  return (
    <Skeleton loading={loading} active className={styles.skeleton}>
      <Title text="Events" />
      <List
        className={styles.list_container}
        itemLayout="horizontal"
        dataSource={data.events.slice().reverse()}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://i.pravatar.cc/150?img=${item.user.id}`}
                  size="large"
                />
              }
              title={<NavLink to={`/events/${item.id}`}>{item.title}</NavLink>}
              description={
                item.desc.length > 130
                  ? `${item.desc.slice(0, 130)}...`
                  : item.desc
              }
            />
            <div>{item.date}</div>
          </List.Item>
        )}
      />
    </Skeleton>
  );
}

export default Events;
