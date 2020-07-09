import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './friends-section.scss';
import CardList from '../card-list/CardList';
import SearchBox from '../search-box/SearchBox';
import Scroll from '../scroll/Scroll';
import { setSearchField } from '../../redux/actions/search';
import { requestUsers } from '../../redux/actions/user';

const FriendsSection = ({users, searchField, onRequestUsers, onSearchChange}) => {
    useEffect(() => {
        onRequestUsers();
      }, [onRequestUsers])

    const filteredUsers = users.filter(user =>{
        return user.name.toLowerCase().includes(searchField.toLowerCase());
    })
  
    return (
          <div className='friends-section'>
            <h1>FRIENDS</h1>
            <Scroll>
              <SearchBox searchChange={onSearchChange}/>
              <CardList robots={filteredUsers} />
            </Scroll>
          </div>
        )
}

const mapStateToProps = state => {
    return {
      searchField: state.search.searchField,
      users: state.user.users
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      onSearchChange: event => dispatch(setSearchField(event.target.value)),
      onRequestUsers: () => dispatch(requestUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSection);