import React, { Component } from 'react'
import styled from 'styled-components'
import Table from './Table'
import {generateRandomPersonData} from '../utils/get_data'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class App extends Component {

  state={
    rows: []
  }

  componentDidMount() {
    this.setState({
      rows: [...generateRandomPersonData(20)]
    })
  }

  render() {

    const mockDataHeadings = [
      'Name',
      'City',
      'Specialty',
      'Email',
      'ID'
    ]

    return (
      <Wrapper>
        <Table
          columnHeadings={mockDataHeadings}
          rows={this.state.rows}
          rowLimit={10}
          color="darkorchid"
        />
      </Wrapper>
    )
  }
}

App.propTypes = {}

export default App
