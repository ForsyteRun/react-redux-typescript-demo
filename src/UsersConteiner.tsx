import { Component } from "react";
import { connect } from "react-redux";
import Preloader from "./Preloader";
import { AppState } from "./redux/redux";
import {
  getFollowThunkCreater,
  getPageChangeThunkCreater, getUnFollowThunkCreater, getUsersThunkCreater
} from "./redux/usersReduser";
import Users from "./Users";

type MapStateToProps = ReturnType<typeof mapStateToProps>

type MapDispatchToProps = {
  getFollowThunkCreater: (userId: number) => void;
  getUnFollowThunkCreater: (userId: number) => void
  getUsersThunkCreater: (pageSize: number, offset: number) => void;
  getPageChangeThunkCreater: (pageSize: number, page: number, offset: number) => void;
};

class UsersConteiner extends Component<MapStateToProps & MapDispatchToProps> {
  componentDidMount() {
      this.props.getUsersThunkCreater(this.props.pageSize, this.props.currentPageData-1)
  };

  onPageChange = (offset: number) => { 
    if(offset >2) {
      this.props.getPageChangeThunkCreater(this.props.pageSize, offset, offset + this.props.pageSize);
    }else if (offset === 1){
      this.props.getPageChangeThunkCreater(this.props.pageSize, offset, offset -1);
    }else {
      this.props.getPageChangeThunkCreater(this.props.pageSize, offset, (offset + this.props.pageSize) - 2);
    }
  };

  render() {
    return (
      <div>
        {this.props.isLoading ? <Preloader /> : null}
        {/* <NewsConteiner {...this.props} /> */}
        <Users {...this.props} onPageChange={this.onPageChange}/>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    users: state.users.users,
    pageSize: state.users.pageSize,
    totalUserCount: state.users.totalUserCount,
    currentPageData: state.users.currentPage,
    isLoading: state.users.isLoading,
    isFollowingData: state.users.followingProgress,
    amountPagi: state.users.amountPagi,
    offset: state.users.offset,
    isBtnDisable: state.users.btnDisable
  };
};

export default connect<MapStateToProps, MapDispatchToProps, {}, AppState>(
  mapStateToProps,
  { getFollowThunkCreater, getUnFollowThunkCreater, getPageChangeThunkCreater, getUsersThunkCreater }
)(UsersConteiner);