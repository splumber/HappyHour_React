import React from 'react'
import Moment from 'react-moment'

export default class MyComponent extends React.Component {
  render () {
    const dateToFormat = '1976-04-19T12:59-0500'
    return (

      <Moment date={dateToFormat} />
    )
  }
}
