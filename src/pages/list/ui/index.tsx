import PostList from "src/widgets/PostsList/ui/";
import styles from "./styles.module.scss";

const List: React.FC = () => {
  return (
    <main className={styles.list}>
      <PostList />
    </main>
  );
};

export default List;
