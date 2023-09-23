import styles from "./styles.module.scss";
import Loader from "src/shared/UI/Loader";
import { postsApi, useGetPostsQuery } from "src/entities/post/api/postService";
import PostItem from "src/entities/post/ui/PostItem";
import Error from "src/shared/UI/Error";
import { useEffect, useState, useRef } from "react";
import { TPost } from "src/entities/post/model/typePost";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/shared/store/store";
import useFixedSizeList from "src/shared/hooks/useFixedSizeList";

const PostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<TPost[]>([]);
  const { data, isLoading, error } = useGetPostsQuery(page);
  const dispatch = useDispatch<AppDispatch>();
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { totalHeight, virtualItems } = useFixedSizeList({
    itemsCount: posts.length,
    itemHeight: 100,
    listHeight: scrollElementRef?.current
      ? scrollElementRef?.current?.getBoundingClientRect().height
      : 0,
    getScrollElement: () => scrollElementRef.current,
  });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (data) {
      setPosts((prev) => [...prev, ...data.apiResponse]);
    }
  }, [data]);

  useEffect(() => {
    if (
      data?.totalCount &&
      inView &&
      posts?.[0]?.id === 1 &&
      page * 10 < data.totalCount
    ) {
      dispatch(postsApi.util.resetApiState());
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <>
      <div ref={scrollElementRef} className={styles.postList__container}>
        <ul className={styles.postList} style={{ height: totalHeight + "px" }}>
          {posts
            ? virtualItems.map((virtualItem) => {
                const post = posts[virtualItem.index];
                return (
                  <PostItem
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    style={{
                      transform: `translateY(${virtualItem?.offsetTop}px)`,
                    }}
                  />
                );
              })
            : null}
          <li
            ref={ref}
            className={styles.postList__observer}
            style={{
              transform: `translateY(${
                virtualItems[virtualItems.length - 1]?.offsetTop + 100
              }px)`,
            }}
          ></li>
          {isLoading ? (
            <li
              className={styles.postList__loader}
              style={{
                transform: `translateY(${
                  virtualItems[virtualItems.length - 1]?.offsetTop + 101
                }px)`,
              }}
            >
              <Loader />
            </li>
          ) : null}
          {error ? (
            <li className={styles.postList__error}>
              <Error error={error} />
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
};

export default PostList;
