import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import { ThreeScene } from '../components/three-scene';
import IndexLayout from '../layouts'

class IndexPage extends React.Component<{}, {}> {
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
    return (
      <IndexLayout>
        <ThreeScene ref={this.threeSceneRef} />
      </IndexLayout>
    )
  }
}

export default IndexPage
