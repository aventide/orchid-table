import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TableContainer = styled.table`

  --highlight-color: ${props => props.color};
  width: calc(100% - 20px);
  text-align: left;
  border-collapse: collapse;
  border-bottom: 2px solid black;
  word-wrap: break-word;
  
  th{
    background-color: white;
    color: black;
    border-bottom: 2px solid black;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-left: 0.5em;
    cursor: pointer;
    &:hover{
      opacity: 0.8;
      background-color: var(--highlight-color);
      color: white;
    }
  }
  
  tr{
    border-top: 1px solid lightgrey;
    &:hover{
      background-color: var(--highlight-color);
      color: white;
    }
  }
  
  td{
    padding-top: 1em;
    padding-bottom: 1em;
    max-width: 100px;
  }
`

const Page = styled.span`
  --highlight-color: ${props => props.color};
  margin: 5px;
  padding: 3px;
  border: 1px solid darkgrey;
  cursor: pointer;
  &:hover{
    border: 1px solid var(--highlight-color);
    color: var(--highlight-color);
  }
  &:first-of-type{
    margin-left: 15px;
  }
`

const RowDisplayContainer = styled.div`
  --highlight-color: ${props => props.color};
  select option{
    &:active{
      background-color: var(--highlight-color);
      color: white;
    }
  }
`

const DataRows = props => {

  const { rows, rowLimit, columnHeadings, startIndex } = props

  const getValidatedObject = row => {
    const cols = {}
    for (let heading of columnHeadings) {
      cols[heading.toLowerCase()] = row[heading.toLowerCase()]
    }
    return cols
  }

  return (
    <tbody>
    {rows && rows.map((row, rowIndex) => rowIndex >= startIndex && rowIndex < (((startIndex / rowLimit) + 1) * rowLimit) &&
      <tr key={rowIndex}>
        {Object.values(getValidatedObject(row)).map(col => <td>{col}</td>)}
      </tr>)}
    </tbody>
  )
}

DataRows.propTypes = {
  rows: PropTypes.array,
  rowLimit: PropTypes.number,
  columnHeadings: PropTypes.array,
  startIndex: PropTypes.number
}

class Table extends React.Component {

  state = {
    rows: this.props.rows,
    rowLimit: this.props.rowLimit,
    startIndex: 0
    // lastColumnSortedBy to reverse a column sort...or just use up and down icons on the heading
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      rows: newProps.rows
    })
  }

  reorder = e => {
    const columnHeading = e.target.innerText.toLowerCase()
    // note, you need a numerical value in the compare function, not boolean
    const sortedRows = this.state.rows.sort((prevRow, nextRow) => prevRow[columnHeading] >= nextRow[columnHeading] ? 1 : -1)
    this.setState({
      rows: sortedRows
    })

  }

  setRowLimit = e => {
    this.setState({
      rowLimit: parseInt(e.target.value),
      startIndex: 0
    })
  }

  setStartIndex = e => {
    const { rowLimit } = this.state
    const newIndex = ((parseInt(e.target.innerText) - 1) * rowLimit)
    this.setState({
      startIndex: newIndex
    })
  }

  render() {
    const { columnHeadings, color } = this.props
    const { rows, rowLimit } = this.state

    return (
      <Fragment>
        <TableContainer color={color}>

          <tr>
            {columnHeadings.map(heading => <th key={heading} onClick={this.reorder}>{heading}</th>)}
          </tr>
          <DataRows
            rows={this.state.rows}
            rowLimit={this.state.rowLimit}
            columnHeadings={columnHeadings}
            startIndex={this.state.startIndex}
          />
        </TableContainer>
        <RowDisplayContainer style={{ marginTop: '10px' }} color={color}>
          Show&nbsp;
          <select name="rowLimit" id="" onChange={this.setRowLimit} defaultValue={this.props.rowLimit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          &nbsp;Rows
          {[...Array(rows.length ? Math.ceil(rows.length / rowLimit) : 0)].map((blah, index) =>
            <Page
              onClick={this.setStartIndex}
              key={index}
              color={this.props.color}
            >
              {index + 1}
            </Page>)}
        </RowDisplayContainer>
      </Fragment>
    )
  }

  static propTypes = {
    columnHeadings: PropTypes.array,
    row: PropTypes.number,
    rowLimit: PropTypes.number,
    color: PropTypes.string
  }

}

export default Table