import styles from "styles/skeleton.module.css";
import { Skeleton } from "antd";

import Title from "components/Title";

const CreateUser = () => {
  return (
    <Skeleton loading={false} active className={styles.skeleton}>
      <Title text="Create User" />
    </Skeleton>
  );
};

export default CreateUser;
