import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ja'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const UserUpdatedTodo = ({ text, eventType, uid, displayName, _updatedAt }) => (
  <ListItem
    divider
    button
    component={Link}
    to={`/users/${uid}/todos`}
  >
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
  _updatedAt: PropTypes.number.isRequired
}

export default UserUpdatedTodo;