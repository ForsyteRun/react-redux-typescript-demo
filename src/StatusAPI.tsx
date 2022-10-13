import { Component } from "react";
import { connect } from "react-redux";
import Preloader from "./Preloader";
import { AppState } from "./redux/redux";
import { downReselect } from "./redux/selectors";
import {
  getFollowThunkCreater,
  getPageChangeThunkCreater,
  getUsersThunkCreater,
  getUnFollowThunkCreater
} from "./redux/statusReduser";
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

class StatusAPI extends Component<MapStateToProps & MapDispatchToProps> {
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
        <Status {...this.props} onPageChange={this.onPageChange} />
      </div>
    );
  }
}

let mapStateToProps = (state: AppState): MapStateToProps => {
  return {
    dataUsers: downReselect(state),
    pageSize: state.status.pageSize,
    totalUserCount: state.status.totalUserCount,
    currentPageData: state.status.currentPage,
    isLoading: state.status.isLoading,
    isFollowingData: state.status.followingProgress,
    amountPagi: state.status.amountPagi,
  };
};

export default connect<MapStateToProps, MapDispatchToProps, {}, AppState>(
  mapStateToProps,
  { getFollowThunkCreater, getUnFollowThunkCreater, getPageChangeThunkCreater, getUsersThunkCreater }
)(StatusAPI);