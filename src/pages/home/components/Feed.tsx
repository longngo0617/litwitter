import { TweetBox } from "../../../components/TweetBox";
import { usePostsQuery } from "../../../generated/graphql";
import { Post } from "../../../components/Post";
const Feed = () => {
  // const {data,error,loading, fetchMore, variables} = usePostsQuery({
  //     variables: {
  //         limit:15,
  //         cursor:"",
  //     },
  //     notifyOnNetworkStatusChange:true,
  // })

  // if(!loading && !data) {
  //     return (
  //         <div>
  //             <div>you got query failed</div>
  //             <div>{error?.message}</div>
  //         </div>
  //     )
  // }
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <Post
        displayName={"Vy"}
        username={"VY "}
        verified={true}
        text={"asdashdjashdjkasd"}
        avatar={""}
        date={""}
        image={"./17.jpeg"}
        likes={21}
        tweets={4}
      />

      {/* {data.getPosts.map(p => (
                <Post
                key={p.id}
                displayName={p.displayname}
                username={p.username}
                text={p.body}
                avatar={""}
                image={"./17.jpeg"}
                likes={p.likeCount}
                tweets={p.commentCount}   
              />
            ))} */}
    </div>
  );
};

export default Feed;
