import styles from "styles/skeleton.module.css";
import { Skeleton } from "antd";

import Title from "components/Title";

const Users = () => {
  return (
    <Skeleton loading={false} active className={styles.skeleton}>
      <Title text="Users" />
    </Skeleton>
  );
};

export default Users;
