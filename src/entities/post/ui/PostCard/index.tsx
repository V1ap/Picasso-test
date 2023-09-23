import { TPost } from "src/entities/post/model/typePost";
import styles from "./styles.module.scss";

const PostCard: React.FC<TPost> = ({ id, userId, title, body }) => {
  return (
    <article className={styles.postCard}>
      <h1 className={styles.postCard__title}>{`${id}.  ${title}`}</h1>
      <p className={styles.postCard__userId}>{"user id: " + userId}</p>
      <p className={styles.postCard__body}>{body}</p>
    </article>
  );
};

export default PostCard;
