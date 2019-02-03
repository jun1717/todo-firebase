import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import FilterItem from '../../containers/todos/FilterItem'
import { VisibilityFilters } from '../../actions/visibilityFilterActions'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

const drawerWidth = 240

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
})

const FilterNav = ({ classes }) => (
  <Drawer variant="permanent" anchor="right" className={classes.drawer} classes={{ paper: classes.drawerPaper, }}>
    <div className={classes.toolbar} />
    <List subheader={<ListSubheader component="div">表示</ListSubheader>}>
      <FilterItem filter={VisibilityFilters.SHOW_ALL}>
        全て
      </FilterItem>
      <FilterItem filter={VisibilityFilters.SHOW_ACTIVE}>
        未完了
      </FilterItem>
      <FilterItem filter={VisibilityFilters.SHOW_COMPLETED}>
        完了
      </FilterItem>
    </List>
  </Drawer>
)

FilterNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FilterNav)