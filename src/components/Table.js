import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { orderBy } from 'natural-orderby'

// https://ionicons.com/

const TableContainer = styled.table`

  --highlight-color: ${props => props.color};
  width: calc(100% - 20px);
  text-align: left;
  border-bottom: 2px solid black;
  word-wrap: break-word;
  border-spacing: 0;
  
  th{
    background-color: white;
    color: black;
    border-bottom: 2px solid black;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    cursor: pointer;
    &:hover{
      opacity: 0.8;
      background-color: var(--highlight-color);
      color: white;
    }
  }
  
  /* on small screen, hide some columns. Reveal the expand details column later */
  th, td{
    &:nth-child(n + 3){
      @media (max-width: 600px) {
        display: none;
      } 
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
    padding-top: 1rem;
    padding-bottom: 1rem;
    max-width: 100px;
  }
`

const Page = styled.span`
  --highlight-color: ${props => props.color};
  margin: 5px;
  padding: 3px 6px;
  border: 1px solid darkgrey;
  cursor: pointer;
  font-weight: 600;
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
        {Object.values(getValidatedObject(row)).map((col, colIndex) => <td key={colIndex}>{col}</td>)}
        <ExpandRow>.</ExpandRow>
      </tr>)}
    </tbody>
  )
}

const ExpandRowHeader = styled.th`
  display: none;
  @media (max-width: 600px) {
    display: block !important;
  }
`

const ExpandRow = styled.td`
  display: none;
  @media (max-width: 600px) {
    display: block !important;
  }
`

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

    const columnHeading = e.target.textContent.toLowerCase()
    const sortedRows = orderBy(this.state.rows, [v => v[columnHeading]])

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
          <thead>
          <tr>
            {columnHeadings.map(heading => <th key={heading} onClick={this.reorder}>{heading}</th>)}
            <ExpandRowHeader>
              *
            </ExpandRowHeader>
          </tr>
          </thead>
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