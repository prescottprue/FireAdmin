import React from 'react'
import MigrationEditor from 'routes/MigrationTemplate/components/MigrationEditor'
import { shallow } from 'enzyme'

describe('(Route: MigrationTemplate Component) MigrationEditor', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<MigrationEditor migrationEditor={{}} />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })
})
