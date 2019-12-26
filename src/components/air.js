import React from "react"
import styled from "styled-components"


function randomInRange(min, max, includeNegative=false){
  let n = Math.random() * (min - max) + max
  return Math.random() > .5 || !includeNegative ? n : n * -1
}

class Pollutant {
  constructor(
    canvasWidth,
    canvasHeight,
  ) {
    this.x = randomInRange(0, canvasWidth)
    this.y = randomInRange(0, canvasHeight)
    this.cx = randomInRange(0.1, 0.3, true)
    this.cy = randomInRange(0.1, 0.3, true)
    this.w = Math.round(randomInRange(3, 14))
    this.h = Math.round(randomInRange(1, 3))
    this.r = 0
    this.cr = randomInRange(0.3, 0.9, true)
    this.opacity = randomInRange(0.4, 1)
    this.shadowBlur = Math.round(randomInRange(3, 7))
  }

  getMidPoint() {
    return {
      x: this.x + (this.w/2),
      y: this.y + (this.h/2),
    }
  }

  getFillStyle() {
    return `rgba(213,228,230,${this.opacity})`
  }

  move(canvasWidth, canvasHeight) {
    // bound by canvas
    if (this.x >= canvasWidth || this.x < 0) {
      this.cx = -this.cx
      this.cr = -this.cr
    }
    if (this.y >= canvasHeight || this.y < 0) {
      this.cy = -this.cy
      this.cr = -this.cr
    }

    // update position
    this.x = this.x + this.cx
    this.y = this.y + this.cy
  }

  rotate() {
    this.r += this.cr * Math.PI / 180
  }
}


const Canvas = styled.canvas`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
`

export default class Air extends React.Component {
  constructor(props) {
    super(props)

    this.paint = this.paint.bind(this)
    this.tick = this.tick.bind(this)
    this.updateDimensionsAndPollutants = this.updateDimensionsAndPollutants.bind(this)

    this.state = {
      width: 0,
      height: 0,
      pollutants: [],
    }

    this._ctx = null
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensionsAndPollutants)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensionsAndPollutants)
    this.updateDimensionsAndPollutants()

    requestAnimationFrame(this.tick)
  }

  componentDidUpdate() {
    this.updateDimensionsAndPollutants()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.pollution !== nextProps.pollution ||
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    ) {
      return true
    }
    else {
      return false
    }
  }

  updateDimensionsAndPollutants() {
    const width = window.innerWidth
    const height = window.innerHeight
    const { pollution } = this.props

    // don't bother with render stuff if there's no air data
    if (!pollution) {
      return
    }

    const area = width * height
    const aqiUS = pollution.aqius
    const aqiPerc = aqiUS / 500
    const areaPerc = area / 500
    const scaleFactor = .1

    // calculate the number of pollutants to show
    // based on the air quality and canvas size
    const numberOfPollutants = Math.max(
      Math.round(aqiPerc * areaPerc * scaleFactor)
    ,1)

    const pollutants = new Array(numberOfPollutants)
      .fill(null)
      .map(()=>new Pollutant(width, height))

    this.setState({
      pollutants: pollutants,
      width: width,
      height: height
    })
  }

  tick() {
    let { pollutants, width, height } = this.state

    for (let p of pollutants) {
      p.move(width, height)
      p.rotate()
    }

    this.paint()
    requestAnimationFrame(this.tick)
  }

  paint() {
    const { pollutants, width, height } = this.state

    // prepare canvas
    this._ctx.clearRect(0, 0, width, height)

    // render pollutants based on state
    for (let p of pollutants) {
      this._ctx.save()

      // style
      this._ctx.fillStyle = p.getFillStyle()

      // translate to midpoint
      const midPoint = p.getMidPoint()
      this._ctx.translate(midPoint.x, midPoint.y)

      // rotate then draw rect w/ midPoint as origin
      this._ctx.rotate(p.r, p.x, p.y)
      this._ctx.shadowColor = p.getFillStyle()
      this._ctx.shadowBlur = p.shadowBlur
      this._ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h)
      this._ctx.restore()
    }
  }

  render() {
    return (<Canvas
      ref={node => {
        this._canvasNode = node
        this._ctx = node ? node.getContext('2d') : null
      }}
      width={this.state.width}
      height={this.state.height}
    />)
  }
}