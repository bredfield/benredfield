import React from "react"
import styled from "styled-components"

import Layout, { Colors } from "../components/layout"
import SEO from "../components/seo"
import QuestionIcon from "../images/question-icon.svg"
import { getCachedAirData, aqiusToQuality } from "../helpers/air"
import AirCanvas from "../components/air"


const Container = styled.div`
  margin: 0px 80px;
  max-width: 480px;
  padding-top: 180px;

  @media (max-width: 480px) {
    margin: 0 20px;
    max-width: auto;
    padding-top: 40px;
  }
`

const Title = styled.h3`
  color: ${Colors.grayLight};
  margin-bottom: 30px;
  line-height: 26px;
`

const Body = styled.section`
  margin: 40px 0;
`

const Job = styled.div`
  margin-top: 20px;
`

const JobDate = styled.h4`
  color: ${Colors.gray};
  font-weight: 600;
  margin-bottom: 6px;
`

const JobTitle = styled.p`
  margin-top: 0;
  margin-bottom: 20px;
`

const AirInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    position: static;
    margin-top: 100px;
  }
`

const AirTooltipPrompt = styled.a`
  cursor: pointer;
  padding: 20px;
  order: 1;

  @media (max-width: 480px) {
    order: 0;
  }
`

const AirTooltip = styled.div`
  background: ${Colors.greenDark};
  max-width: 480px;
  margin: 0px 80px 20px 80px;
  order: 0;

  @media (max-width: 480px) {
    order: 1;
    margin: 0 20px;
    max-width: auto;
  }
`
const AirData = styled.span`
  font-weight: 900;
  color: ${Colors.gray};
`

const ContactButton = styled.a`
  border: 1px solid ${Colors.green};
  display: inline-block;
  padding: 10px 20px;
  width: 140px;
  border-radius: 4px;
  margin-top: 40px;
  text-align: center;

  &:hover {
    background: ${Colors.green};
    color: ${Colors.bg};
  }
`

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pollution: null,
      showAirTooltip: false
    }
  }

  async componentDidMount() {
    // pull cached or fresh air data, save to state
    const airData = await getCachedAirData()
    if (airData.current) {
      this.setState({
        city: airData.city,
        state: airData.state,
        pollution: airData.current.pollution
      })
    }
  }

  render(){
    const { city, state, pollution, showAirTooltip } = this.state

    return (
      <Layout>
        <SEO title="Ben Redfield" />

        <Container>
          <Title>
            I'm Ben Redfield, a developer and product manager in Brooklyn, NY.
          </Title>

          <Body>
            <p>
              I design and build digital products and love helping humans work well together.
            </p>
          </Body>

          <Job>
            <JobDate>Presently</JobDate>
            <JobTitle>
              Founder &amp; Product Manager @ <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://density.io">
                  Density
              </a>
            </JobTitle>
          </Job>

          <Job>
            <JobDate>Pastly</JobDate>
            <JobTitle>
              Partner &amp; Developer @ <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://roundedco.com">
                  Rounded
              </a>
            </JobTitle>
          </Job>

          <ContactButton href="mailto:ben@benredfield.dev">
            Say hi
          </ContactButton>
        </Container>

        <AirCanvas pollution={pollution} />
        <AirInfo>
          {showAirTooltip && pollution ? (<AirTooltip>
            <p>Floating particles are rendered based on the air quality near you.</p>
            <p>The Air Quality Index in <AirData>{city}, {state}</AirData> is <AirData>{pollution.aqius}</AirData>, which is considered <AirData>{aqiusToQuality(pollution.aqius)}</AirData>.</p>
            <p>Click for more info on the AQI.</p>
          </AirTooltip>) : null}
          <AirTooltipPrompt
            onMouseEnter={() => this.setState({ showAirTooltip: true })}
            onMouseLeave={() => this.setState({ showAirTooltip: false })}
            target="_blank"
            rel="noopener noreferrer"
            href="https://airnow.gov/index.cfm?action=aqibasics.aqi">
              <QuestionIcon />
          </AirTooltipPrompt>
        </AirInfo>
      </Layout>
    )
  }
}
