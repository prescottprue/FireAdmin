import React from 'react'
import SharingDialog from 'routes/Projects/components/SharingDialog'
import { shallow } from 'enzyme'

describe.skip('(Route: Projects Component) SharingDialog', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<SharingDialog sharingDialog={{}} />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })
})
