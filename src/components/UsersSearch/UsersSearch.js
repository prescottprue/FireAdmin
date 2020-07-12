import React from 'react'
import PropTypes from 'prop-types'
import {
  InstantSearch,
  PoweredBy,
  SearchBox,
  Configure
} from 'react-instantsearch/dom'
import { makeStyles } from '@material-ui/core/styles'
import SearchResults from './SearchResults'
import styles from './UsersSearch.styles'
import { useUser } from 'reactfire'
// import 'react-instantsearch-theme-algolia/style.scss' // didn't work, so css was used from cdn in index.html

const useStyles = makeStyles(styles)

function UsersSearch({
  onSuggestionClick,
  resultsTitle,
  ignoreSuggestions,
  uid
}) {
  const classes = useStyles()
  const user = useUser()
  // Map ignore suggestions list to get ids
  const ignoreIds = !ignoreSuggestions
    ? [user.uid] // ignore just logged in user if no ignoreSuggestions provided
    : [user.uid].concat(
        // ignore logged in user and ignoreSuggestions
        ignoreSuggestions.map(
          (suggestion) => suggestion.id || suggestion.objectID
        )
      )

  const filterString = ignoreIds
    .map(
      (id, index) =>
        `${
          index !== 0 && index !== ignoreIds.length ? 'AND ' : ''
        }NOT objectID:${id}`
    )
    .join(' ')

  return (
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
      indexName="users">
      <SearchBox autoFocus />
      <div className={classes.poweredBy}>
        <PoweredBy />
      </div>
      <div className={classes.spacer} />
      <SearchResults
        onSuggestionClick={onSuggestionClick}
        resultsTitle={resultsTitle}
      />
      <Configure filters={filterString} />
    </InstantSearch>
  )
}

UsersSearch.propTypes = {
  ignoreSuggestions: PropTypes.array,
  onSuggestionClick: PropTypes.func,
  uid: PropTypes.string,
  resultsTitle: PropTypes.string
}

export default UsersSearch
