import { Avatar, Box, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { Image } from "../../../components/Image";
import { InteractiveBar } from "../../../components/InteractiveBar";
import { Loading } from "../../../components/Loading";
import {
  PostOfGroupDocument,
  useLikeMutation,
  useLikePostInGroupMutation,
  usePostOfGroupQuery,
} from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";
import moment from "moment";
import { Comment } from "../../details/components/Comment";
import { WithSide } from "../../../utils/withSide";
interface DetailsPostGroupProps {}
interface ParamsProps {
  id: string;
  postid: string;
}
export const DetailsPostGroup: React.FC<DetailsPostGroupProps> = ({}) => {
  const router = useHistory();
  const { openListComment, openMore, user } = React.useContext(UserContext);
  const { url } = useRouteMatch();
  const [likePost] = useLikeMutation();
  const [likePostInGroup] = useLikePostInGroupMutation();

  const params: ParamsProps = useParams();
  const { data, loading } = usePostOfGroupQuery({
    variables: {
      groupId: params.id,
      postId: params.postid,
    },
  });

  return (
    <>
      <WithSide>
        <div className="feed">
          <div className="feed__header">
            <ArrowBackIcon
              className="feed__header--icon"
              onClick={() => router.goBack()}
            />
            <h2>Tweet</h2>
          </div>

          {!data && loading ? (
            <Box display="flex" justifyContent="center" marginTop="20px">
              <Loading blue />
            </Box>
          ) : (
            <div className="wrap">
              <div className="postSingle__wrap">
                <div className="postSingle">
                  <div className="postSingle__header">
                    <div className="postSingle__header--left">
                      <Avatar src={data?.getPostInGroup.avatar || ""} />
                      <div className="name">
                        <span>{data?.getPostInGroup.displayname}</span>
                        <span>@{data?.getPostInGroup?.username}</span>
                      </div>
                    </div>
                    <div className="postSingle__header--right">
                      <IconButton
                        aria-label="more"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          openMore(
                            {
                              x: `${e.pageX}px`,
                              y: `${e.pageY}px`,
                            },
                            data?.getPostInGroup
                          );
                        }}
                      >
                        <MoreHorizIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                  <div className="postSingle__body">
                    <div className="postSingle__text">
                      <span>{data?.getPostInGroup.body}</span>
                    </div>
                    {data?.getPostInGroup.image?.length ? (
                      <Image image={data?.getPostInGroup.image} />
                    ) : null}
                    <div className="postSingle__date">
                      <span>
                        {moment(data?.getPostInGroup?.createdAt).fromNow()}
                      </span>
                      <span style={{ padding: "0 4px" }}>.</span>
                      <span>Twitter for website</span>
                    </div>
                    {data?.getPostInGroup.commentCount ||
                    data?.getPostInGroup.likeCount ? (
                      <div className="postSingle__bar">
                        {data?.getPostInGroup.commentCount ? (
                          <div className="postSingle__barItem">
                            <div>
                              <Link
                                to={`${url}/comments`}
                                className="postSingle__barItem--link"
                                onClick={() =>
                                  openListComment(data?.getPostInGroup.comments)
                                }
                              >
                                <span>
                                  {data?.getPostInGroup?.commentCount}
                                </span>
                                <span>Comments</span>
                              </Link>
                            </div>
                          </div>
                        ) : null}
                        {data?.getPostInGroup.likeCount ? (
                          <div className="postSingle__barItem">
                            <div>
                              <Link
                                to={`${url}/likes`}
                                className="postSingle__barItem--link"
                                onClick={() =>
                                  openListComment(data?.getPostInGroup.likes)
                                }
                              >
                                <span>{data?.getPostInGroup?.likeCount}</span>
                                <span>Likes</span>
                              </Link>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="postSingle__footer">
                    <div className="postSingle__interactive">
                      <InteractiveBar
                        groupId={params.id}
                        commentCount={data?.getPostInGroup?.commentCount}
                        likeCount={data?.getPostInGroup?.likeCount}
                        likeList={data?.getPostInGroup.likes}
                        item={data?.getPostInGroup}
                        likePost={async () =>
                          await likePostInGroup({
                            variables: {
                              postId: params.postid,
                              groupId: params.id,
                            },
                            refetchQueries: [
                              {
                                query: PostOfGroupDocument,
                                variables: {
                                  postId: params.postid,
                                  groupId: params.id,
                                },
                              },
                            ],
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="postSingle__listComment">
                {data?.getPostInGroup.comments.map((cm, i) => (
                  <Comment key={i} {...cm} postId={data.getPostInGroup.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </WithSide>
    </>
  );
};
