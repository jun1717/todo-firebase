import { connect } from 'react-redux'
import { setVisibilityFilter } from '../../actions/visibilityFilterActions'
import FilterButton from '../../components/todos/FilterButton'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

const FilterItem = connect( // 変更
  mapStateToProps,
  mapDispatchToProps
)(FilterButton)

export default FilterItem