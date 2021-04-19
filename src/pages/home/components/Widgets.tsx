import SearchIcon from "@material-ui/icons/Search";
import { Avatar, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useUsersQuery } from "../../../generated/graphql";
import { Link, useHistory } from "react-router-dom";
const Widgets = () => {
  const { data, loading }: any = useUsersQuery();
  const router = useHistory();
  if (!data && loading) {
    return null;
  }

  return (
    <div className="widgets">
      <div className="widgets__wrap">
        <div className="widgets__searchIcon">
          <SearchIcon />
        </div>
        <div className="widgets__input">
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={data!.getUsers}
            renderInput={(params) => (
              <TextField {...params} margin="normal" variant="outlined" />
            )}
            getOptionLabel={(option: any) => ``}
            renderOption={(option) => (
              <div className="follow-modal-bottom-itemWrap full-width">
                <Link to={`/users/${option.username}`} className="link link--none">
                  <div className="follow-modal-bottom-item">
                    <div className="item">
                      <div className="item-left">
                        <div className="avatar">
                          <Avatar src={option.profile.avatar || ""} />
                        </div>
                      </div>
                      <div className="item-right">
                        <div className="item-right-top">
                          <div className="item-right-top-text">
                            <div className="name-wrap">
                              <div className="name">
                                <span>{option.displayname}</span>
                              </div>
                              <div className="username">
                                <span>@{option.username}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
