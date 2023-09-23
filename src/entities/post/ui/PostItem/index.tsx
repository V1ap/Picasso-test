import { TPost } from "src/entities/post/model/typePost";
import styles from "./styles.module.scss";
import LinkApp from "src/shared/UI/LinkApp";

const PostItem: React.FC<
  Pick<TPost, "id" | "title" | "body"> & { style?: React.CSSProperties }
> = ({ id, title, body, style }) => {
  return (
    <li className={styles.postItem} style={style ? style : {}}>
      <p className={styles.postItem__id}>{id}</p>
      <h3 className={styles.postItem__title}>{title}</h3>
      <p className={styles.postItem__description}>{body}</p>
      <LinkApp to={`post/${id}`}> Перейти </LinkApp>
    </li>
  );
};

export default PostItem;
