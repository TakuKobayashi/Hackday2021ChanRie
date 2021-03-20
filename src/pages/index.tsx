import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import { ThreeScene } from '../components/three-scene'
import IndexLayout from '../layouts'

interface DeviceOrientationState {
  absolute: boolean
  alpha: number
  beta: number
  gamma: number
  degrees: number
}
class IndexPage extends React.Component<{}, DeviceOrientationState> {
  constructor(props: any) {
    super(props)
    this.state = {
      absolute: false,
      alpha: 0,
      beta: 0,
      gamma: 0,
      degrees: 0
    }
    this.onDeviceorientation = this.onDeviceorientation.bind(this);
    this.compassHeading = this.compassHeading.bind(this);
  }

  componentDidMount() {
    const os = this.detectOSSimply()
    if (os == 'iphone') {
      // safari用。DeviceOrientation APIの使用をユーザに許可して貰う
      this.permitDeviceOrientationForSafari()

      window.addEventListener('deviceorientation', this.onDeviceorientation, true)
    } else if (os == 'android') {
      window.addEventListener('deviceorientationabsolute', this.onDeviceorientation, true)
    } else {
      window.alert('PC未対応サンプル')
    }
  }

  // ジャイロスコープと地磁気をセンサーから取得
  onDeviceorientation(event: DeviceOrientationEvent) {
    const absolute = event.absolute
    const alpha = event.alpha || 0
    const beta = event.beta || 0
    const gamma = event.gamma || 0
    const degrees = this.compassHeading(alpha, beta, gamma)
    this.setState({
      absolute: absolute,
      alpha: alpha,
      beta: beta,
      gamma: gamma,
      degrees: degrees
    })
  }

  // 端末の傾き補正（Android用）
  // https://www.w3.org/TR/orientation-event/
  compassHeading(alpha: number, beta: number, gamma: number): number {
    const degtorad = Math.PI / 180 // Degree-to-Radian conversion

    const _x = beta ? beta * degtorad : 0 // beta value
    const _y = gamma ? gamma * degtorad : 0 // gamma value
    const _z = alpha ? alpha * degtorad : 0 // alpha value

    const cX = Math.cos(_x)
    const cY = Math.cos(_y)
    const cZ = Math.cos(_z)
    const sX = Math.sin(_x)
    const sY = Math.sin(_y)
    const sZ = Math.sin(_z)

    // Calculate Vx and Vy components
    const Vx = -cZ * sY - sZ * sX * cY
    const Vy = -sZ * sY + cZ * sX * cY

    // Calculate compass heading
    let compassHeading = Math.atan(Vx / Vy)

    // Convert compass heading to use whole unit circle
    if (Vy < 0) {
      compassHeading += Math.PI
    } else if (Vx < 0) {
      compassHeading += 2 * Math.PI
    }

    return compassHeading * (180 / Math.PI) // Compass Heading (in degrees)
  }

  detectOSSimply(): string {
    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0) {
      // iPad OS13のsafariはデフォルト「Macintosh」なので別途要対応
      return 'iphone'
    } else if (navigator.userAgent.indexOf('Android') > 0) {
      return 'android'
    } else {
      return 'pc'
    }
  }

  // iPhone + Safariの場合はDeviceOrientation APIの使用許可をユーザに求める
  permitDeviceOrientationForSafari(): void {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', this.onDeviceorientation, true)
        }
      })
      .catch(console.error)
  }

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
        <li>【方位】{currentState.degrees}</li>
        <li>【absolute】{currentState.absolute}</li>
        <li>【alpha】{currentState.alpha}</li>
        <li>【beta】{currentState.beta}</li>
        <li>【gamma】{currentState.gamma}</li>
      </IndexLayout>
    )
  }
}

export default IndexPage
