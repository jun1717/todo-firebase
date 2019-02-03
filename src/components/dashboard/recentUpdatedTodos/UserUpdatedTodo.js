import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ja'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import PersonIcon from '@material-ui/icons/Person'

const UserUpdatedTodo = ({ text, eventType, uid, displayName, _updatedAt, avatarUrl }) => (
  <ListItem
    divider
    button
    component={Link}
    to={`/users/${uid}/todos`}
  >
    <ListItemAvatar>
      {avatarUrl ?
        <Avatar alt={displayName} src={avatarUrl} />
        :
        <Avatar>
          <PersonIcon />
        </Avatar>
      }
    </ListItemAvatar>
    <ListItemText
      secondary={moment(_updatedAt).fromNow()} >
      {displayName}さんが {text} を{eventType === 'CREATE' ? '作成' : '更新'}しました。
    </ListItemText>
  </ListItem>
)

UserUpdatedTodo.propTypes = {
  text: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  _updatedAt: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string,
}

export default UserUpdatedTodo;