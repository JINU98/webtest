import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { country: 'Male', area: 70 ,ko:"dsks"},
  { country: 'Female', area: 30, ko:"sdss"},
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            name="ko"
            valueField="area"
            argumentField="country"
          />
          <Title
            text="Area of Countries"
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
