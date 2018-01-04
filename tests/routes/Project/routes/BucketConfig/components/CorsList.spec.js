import React from 'react'
import CorsList from 'routes/project/routes/BucketConfig/components/CorsList'
import { shallow } from 'enzyme'

describe('(Route: Project Route: BucketConfig Component) CorsList', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<CorsList corsList={{}} />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })
})
