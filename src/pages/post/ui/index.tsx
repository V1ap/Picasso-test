import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useGetPostByIdQuery } from "src/entities/post/api/postService";
import Loader from "src/shared/UI/Loader";
import PostCard from "src/entities/post/ui/PostCard";
import Error from "src/shared/UI/Error";
import LinkToMain from "src/features/LinkToMain/ui";

const Post = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPostByIdQuery(id ? id : "");

  return (
    <main className={styles.post}>
      {isLoading ? <Loader /> : null}
      {data ? (
        <PostCard
          id={data.id}
          title={data.title}
          userId={data.userId}
          body={data.body}
        />
      ) : null}
      {error ? <Error error={error} /> : null}
      <LinkToMain />
    </main>
  );
};

export default Post;
