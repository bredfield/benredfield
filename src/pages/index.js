import React from "react"
import styled from "styled-components"

import Layout, { Colors, MobileWidth } from "../components/layout"
import SEO from "../components/seo"
import QuestionIcon from "../images/question-icon.svg"
import { getCachedAirData, aqiusToQuality } from "../helpers/air"
import AirCanvas from "../components/air"
import KeyboardLeft from "../components/keyboard"

const SingleColumnBreak = 1200

const Container = styled.div`
  margin: 0px 80px;
  padding-top: 180px;

  @media (max-width: ${SingleColumnBreak}px) {
    margin: 0 20px;
    max-width: auto;
    padding: 40px 0;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const Column = styled.div`
  /* display: flex;
  flex-direction: column;j
  flex: 1; */
`

const BodyColumn = styled(Column)`
  width: 480px;
  max-width: 640px;
  margin-right: 80px;
`

const KeyboardColumn = styled(Column)`
  flex: 1;
  align-self: center;

  @media (max-width: ${SingleColumnBreak}px) {
    margin-top: 80px;
    margin-left: -20px;
    /* text-align: center; */
  }
`

const Title = styled.h3`
  color: ${Colors.grayLight};
  line-height: 26px;
`

const Body = styled.section`
`

const Job = styled.div`
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

  @media (max-width: ${MobileWidth}px) {
    display: none;
  }
`

const AirTooltipPrompt = styled.a`
  cursor: pointer;
  padding: 20px;
`

const AirTooltip = styled.div`
  background: ${Colors.greenDark};
  max-width: 480px;
  margin: 0px 80px 20px 80px;
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
        <SEO title="Hi" />

        <Container>
          <Row>
            <BodyColumn>
              <Title>
                I'm Ben Redfield, a developer and product manager in Brooklyn, NY.
              </Title>

              <Body>
                <p>
                  I design and build digital products, and love helping humans work well together.
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
            </BodyColumn>
            <KeyboardColumn>
              <KeyboardLeft />
            </KeyboardColumn>
          </Row>
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
