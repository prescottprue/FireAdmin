/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { connectHits } from 'react-instantsearch/connectors'
import SuggestedUser from './SuggestedUser'

function ResultsList({ hits, onSuggestionClick }) {
  return (
    <div>
      {hits.map((hit, i) => (
        <SuggestedUser
          key={`Hit-${hit.objectID}-${i}`}
          hit={hit}
          onClick={onSuggestionClick}
        />
      ))}
    </div>
  )
}

ResultsList.propTypes = {
  hits: PropTypes.array, // from connectHits
  onSuggestionClick: PropTypes.func // from UsersSearch
}

export default connectHits(ResultsList)
