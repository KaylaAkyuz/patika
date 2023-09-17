import styles from "styles/skeleton.module.css";
import { Skeleton } from "antd";

import Title from "components/Title";

const ViewUser = () => {
  return (
    <Skeleton loading={false} active className={styles.skeleton}>
      <Title text="View User" />
    </Skeleton>
  );
};

export default ViewUser;
