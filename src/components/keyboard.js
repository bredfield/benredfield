import React from "react"
import styled from "styled-components"
import { Howl } from "howler"
import Mousetrap from "mousetrap"
import * as d3 from "d3"

import { MobileWidth } from "../components/layout"
import KeyboardLeftImg from "../images/keyboard-left.svg"
import keySound from "../sounds/key.mp3"

const KEYS = [
  'tab', 'q', 'w', 'e', 'r', 't',
  'esc', 'a', 's', 'd', 'f', 'g',
  '_', 'z', 'x', 'c', 'v', 'b',
  'space',
]

const KeyboardLeftSVG = styled(KeyboardLeftImg)`
  cursor: pointer;
  user-select: none;

  @media (max-width: ${MobileWidth}px) {
    width: 100%;
  }
`

export default class KeyboardLeft extends React.Component {
  constructor(props) {
    super(props)

    this.sound = new Howl({
      src: keySound,
      volume: .3
    })
  }

  componentDidMount() {
    Mousetrap.bind(KEYS, this.handleKeyboardEvent);

    d3.selectAll('g[id^="key-"]')
      .on('click', (e, i, nodes) => {
        if (nodes.length) {
          this.pressKey(d3.select(nodes[i]))
        }
      })
  }

  co; mponentWillUnmount() {
    Mousetrap.unbind(KEYS)

    d3.selectAll('g[id^="key-"]').on('click', null)
  }

  pressKey(keyNode) {
    const textNode = keyNode.select('text')
    const keyTopNode = keyNode.select('g')

    this.sound.play()

    // animate the text and key top nodes
    // these should be grouped together in the svg
    // but this works for now
    textNode
      .transition()
      .duration(10)
      .attr('transform', 'translate(25.000000, 24.000000) scale(-1, 1) translate(-25.000000, -19.000000)')
      .transition()
      .delay(100)
      .duration(30)
      .attr('transform', 'translate(25.000000, 19.000000) scale(-1, 1) translate(-25.000000, -19.000000)')

    keyTopNode
      .transition()
      .duration(10)
      .attr('transform', 'translate(0, 5)')
      .style('fill', '#000000')
      .transition()
      .delay(100)
      .duration(30)
      .attr('transform', 'translate(0, 0)')
      .style('fill', '#f7f7f7')
  }

  handleKeyboardEvent = (e) => {
    let key = e.key.toLowerCase()

    // translate key codes to svg ids
    if (key === 'escape') {
      key = 'esc'
    }
    else if (key === ' ') {
      key = 'space'
    }
    else if (key === '_') {
      key = 'unds'
    }

    const keyNode = d3.select(`#key-${key}`)

    this.pressKey(keyNode)
  }

  render() {
    return (<KeyboardLeftSVG id="keyboard-left" />)
  }
}