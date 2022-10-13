import { Component } from "react";
import { connect } from "react-redux";
import Preloader from "./Preloader";
import { AppState } from "./redux/redux";
import { downReselect } from "./redux/selectors";
import {
  getFollowThunkCreater,
  getPageChangeThunkCreater, getUnFollowThunkCreater, getUsersThunkCreater
} from "./redux/usersReduser";
import Status from "./Status";
import { UserData } from "./types/types";

type MapStateToProps = {
  pageSize: number;
  totalUserCount: number;
  currentPageData: number;
  isFollowingData: Array<number>;
  dataUsers: Array<UserData>;
  isLoading: boolean;
  amountPagi: number;
};

type MapDispatchToProps = {
  getFollowThunkCreater: (followingProgress: boolean, userId: number) => void;
  getUnFollowThunkCreater: (followingProgress: boolean, userId: number) => void
  getUsersThunkCreater: (pageSize: number, currentPage: number) => void;
  getPageChangeThunkCreater: (pageSize: number, page: number) => void;
};

class UsersConteiner extends Component<MapStateToProps & MapDispatchToProps> {
  componentDidMount() {
      this.props.getUsersThunkCreater(
      this.props.pageSize,
      this.props.currentPageData
    );
  }

  onPageChange = (el: number) => {
    this.props.getPageChangeThunkCreater(this.props.pageSize, el);
  };

  render() {
    return (
      <div>
        {this.props.isLoading ? <Preloader /> : null}
        {/* <NewsConteiner {...this.props} /> */}
        <Status {...this.props} onPageChange={this.onPageChange}/>
      </div>
    );
  }
}

let mapStateToProps = (state: AppState): MapStateToProps => {
  return {
    dataUsers: downReselect(state),
    pageSize: state.users.pageSize,
    totalUserCount: state.users.totalUserCount,
    currentPageData: state.users.currentPage,
    isLoading: state.users.isLoading,
    isFollowingData: state.users.followingProgress,
    amountPagi: state.users.amountPagi,
  };
};

export default connect<MapStateToProps, MapDispatchToProps, {}, AppState>(
  mapStateToProps,
  { getFollowThunkCreater, getUnFollowThunkCreater, getPageChangeThunkCreater, getUsersThunkCreater }
)(UsersConteiner);