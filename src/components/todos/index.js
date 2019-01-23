import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Footer from './Footer'
import NoticeForTodo from './NoticeForTodo'
import AddTodo from '../../containers/todos/AddTodo'
import VisibleTodoList from '../../containers/todos/VisibleTodoList'
import { locationChangeOnTodos } from '../../actions/todoActions'

class TodoComponent extends React.Component {
  componentWillMount() {
    this.props.locationChange()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.locationChange()
    }
  }

  render() {
    const { isOwnTodos, match: { params: { uid } } } = this.props;
    return (
      <div>
        {isOwnTodos && <AddTodo uid={uid} />}
        <NoticeForTodo />
        <VisibleTodoList uid={uid} isOwnTodos={isOwnTodos} />
        <Footer />
      </div>
    )
  }
}

TodoComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  isOwnTodos: PropTypes.bool.isRequired,
  locationChange: PropTypes.func.isRequired,
}

const mapStateToProps = ({ firebase: { auth } }, { match }) => ({
  isOwnTodos: auth.uid === match.params.uid,
})

const mapDispatchToProps = (dispatch) => ({
  locationChange: () => dispatch(locationChangeOnTodos())
})

TodoComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComponent)

export default TodoComponent;