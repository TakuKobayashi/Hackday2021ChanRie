import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import { ThreeScene } from '../components/three-scene'
import { HardwareCompass } from '../components/hardware-compass'
import IndexLayout from '../layouts'

class IndexPage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {}

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const currentState = this.state
    return (
      <IndexLayout>
        <ThreeScene />
        <HardwareCompass />
      </IndexLayout>
    )
  }
}

export default IndexPage
