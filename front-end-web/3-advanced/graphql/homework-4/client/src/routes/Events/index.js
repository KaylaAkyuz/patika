import React from "react";
import styles from "styles/skeleton.module.css";
import { Skeleton, List, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getEvents } from "graphql/Event/queries";
import Title from "components/Title";

function Events() {
  const { loading, error, data } = useQuery(getEvents);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {`${error}`}</p>;

  return (
    <Skeleton loading={loading} active className={styles.skeleton}>
      <Title text="Events" />
      <List
        className={styles.list_container}
        itemLayout="horizontal"
        dataSource={data.events}
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
