import React, { useContext } from "react";
import ReactDOM from "react-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserContext } from "../utils/useAuth";
import { useOutside } from "@pacote/react-use-outside";
import {
  useDeletePostMutation,
  useDeleteCommentMutation,
} from "../generated/graphql";
import FlagIcon from "@material-ui/icons/Flag";
interface PopupMoreProps {}

export const PopupMore: React.FC<PopupMoreProps> = () => {
  const { user, moreState, closeMore } = useContext(UserContext);
  const [deletePost] = useDeletePostMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const ref = useOutside("click", () => {
    closeMore();
  });

  if (!moreState.showMenu) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="menu--wrap">
      <div className="menu--fixed"></div>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="menu--more"
        role="menu"
        style={{ top: moreState.yPos, left: moreState.xPos }}
      >
        <div className="menu--more__wrap">
          <div className="menu--more__wrap">
            {user.username === moreState.item.username ? (
              <div
                className="menu--item"
                onClick={async () => {
                  (await !moreState.isComment)
                    ? deletePost({
                        variables: { id: moreState.item.id },
                        update: (cache) => {
                          cache.evict({ id: "Post:" + moreState.item.id });
                        },
                      })
                    : deleteComment({
                        variables: {
                          id: moreState.item.postId,
                          commentId: moreState.item.id,
                        },
                      });
                  closeMore();
                }}
              >
                <div className="menu--item__icon">
                  <DeleteIcon color="secondary" />
                </div>
                <div className="menu--item__text">
                  <div
                    className="menu--item__css"
                    style={{ color: "rgb(224,36,94)" }}
                  >
                    <span className="text">Delete</span>
                  </div>
                </div>
              </div>
            ) : null}
            {user.username === moreState.item.username ? null : (
              <>
                <div className="menu--item">
                  <div className="menu--item__icon">
                    <PersonAddIcon />
                  </div>
                  <div className="menu--item__text">
                    <div className="menu--item__css">
                      <span className="text">
                        Follow {moreState?.item?.displayname}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="menu--item">
                  <div className="menu--item__icon">
                    <SentimentVeryDissatisfiedIcon />
                  </div>
                  <div className="menu--item__text">
                    <div className="menu--item__css">
                      <span className="text">Not interested in this Tweet</span>
                    </div>
                  </div>
                </div>
                <div className="menu--item">
                  <div className="menu--item__icon">
                    <BlockIcon />
                  </div>
                  <div className="menu--item__text">
                    <div className="menu--item__css">
                      <span className="text">
                        Block @{moreState?.item?.username}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="menu--item">
                  <div className="menu--item__icon">
                    <FlagIcon />
                  </div>
                  <div className="menu--item__text">
                    <div className="menu--item__css">
                      <span className="text">Report this tweet</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("react-root") as HTMLElement
  );
};
