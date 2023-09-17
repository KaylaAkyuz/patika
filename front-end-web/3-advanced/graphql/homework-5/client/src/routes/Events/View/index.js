import React, { useEffect } from "react";
import styles from "styles/skeleton.module.css";
import { Skeleton, Avatar, Card, Tooltip, Typography, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getEvent } from "graphql/Event/queries";
import { EventUpdated } from "graphql/Event/subscriptions";
import { ParticipantAdded } from "graphql/Participant/subscriptions";
import Title from "components/Title";
import colorPalette from "theme/colorPalette";

const { Text } = Typography;

const ViewEvent = () => {
  const { id } = useParams();

  const { loading, error, data, subscribeToMore } = useQuery(getEvent, {
    variables: {
      eventId: parseInt(id),
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: EventUpdated,
      variables: {
        eventID: parseInt(id),
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newEvent = subscriptionData.data.eventUpdated;
        return {
          event: newEvent,
        };
      },
    });

    subscribeToMore({
      document: ParticipantAdded,
      variables: {
        participantID: parseInt(id),
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newParticipant = subscriptionData.data.participantAdded;
        return {
          event: {
            ...prev.event,
            participants: [...prev.event.participants, newParticipant],
          },
        };
      },
    });
  }, [subscribeToMore, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {`${error}`}</p>;

  return (
    <Skeleton loading={loading} active className={styles.skeleton}>
      <Title text="View Event" />
      <Card title={data.event.title}>
        <Card.Meta description={data.event.desc} />
        <Row
          style={{
            marginTop: "1rem",
          }}
        >
          <Col xs={24} sm={4}>
            <Text>
              Date: <Text type="secondary">{data.event.date}</Text>
            </Text>
          </Col>
          <Col xs={24} sm={4}>
            <Text>
              Time:{" "}
              <Text type="secondary">
                {data.event.from} to {data.event.to}
              </Text>
            </Text>
          </Col>
          <Col xs={24} sm={4}>
            <Text>
              Location: <Text type="secondary">{data.event.location.name}</Text>
            </Text>
          </Col>
        </Row>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          Participants:{" "}
          <Avatar.Group
            maxCount={10}
            maxStyle={{
              color: colorPalette.components.AvatarGroup.color,
              backgroundColor:
                colorPalette.components.AvatarGroup.backgroundColor,
            }}
            style={{
              marginLeft: "0.3rem",
            }}
          >
            {data.event.participants.map((participant, index) => {
              return (
                <Tooltip
                  title={participant.user.username}
                  placement="top"
                  key={index}
                >
                  <Avatar
                    src={`https://i.pravatar.cc/150?img=${participant.user.id}`}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>
          <span
            style={{
              justifySelf: "flex-end",
              marginLeft: "auto",
            }}
          >
            Organizer:{" "}
            <Tooltip title={data.event.user.username} placement="top">
              <Avatar
                src={`https://i.pravatar.cc/150?img=${data.event.user.id}`}
              />
            </Tooltip>
          </span>
        </span>
      </Card>
    </Skeleton>
  );
};

export default ViewEvent;
