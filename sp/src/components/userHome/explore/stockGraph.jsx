import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getHistory } from '../stock_functions.js';
const d3 = require("d3");

export default class StockGraph extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        getHistory(this.props.title).then(data=>{
            if (!data) this.componentDidMount()
            else this.drawChart(data)
        });
    }

    drawChart(data){
        // const loadData = d3.json('sample-json.data').then(data => {
        //     console.log("trace")
        //   const chartResultsData = data['chart']['result'][0];
        //   const quoteData = chartResultsData['indicators']['quote'][0];
        //   return chartResultsData['timestamp'].map((time, index) => ({
        //     date: new Date(time * 1000),
        //     high: quoteData['high'][index],
        //     low: quoteData['low'][index],
        //     open: quoteData['open'][index],
        //     close: quoteData['close'][index],
        //     volume: quoteData['volume'][index]
        //   }));
        // });
        const loadData = data => {
          const chartResultsData = data['chart']['result'][0];
          const quoteData = chartResultsData['indicators']['quote'][0];
          return chartResultsData['timestamp'].map((time, index) => ({
            date: new Date(time * 1000),
            high: quoteData['high'][index],
            low: quoteData['low'][index],
            open: quoteData['open'][index],
            close: quoteData['close'][index],
            volume: quoteData['volume'][index]
          }));
        };

        const movingAverage = (data, numberOfPricePoints) => {
          return data.map((row, index, total) => {
            const start = Math.max(0, index - numberOfPricePoints);
            const end = index;
            const subset = total.slice(start, end + 1);
            const sum = subset.reduce((a, b) => {
              return a + b['close'];
            }, 0);

            return {
              date: row['date'],
              average: sum / subset.length
            };
          });
        };

        // credits: https://brendansudol.com/writing/responsive-d3
        const responsivefy = svg => {
          // get container + svg aspect ratio
          const container = d3.select(svg.node().parentNode),
            width = parseInt(svg.style('width')),
            height = parseInt(svg.style('height')),
            aspect = width / height;

          // get width of container and resize svg to fit it
          const resize = () => {
            var targetWidth = 500;
            // svg.attr('width', targetWidth);
            // svg.attr('height', Math.round(targetWidth / aspect));
          };

          // add viewBox and preserveAspectRatio properties,
          // and call resize so that svg resizes on inital page load
          svg
            .attr('viewBox', '0 0 ' + width + ' ' + height)
            .attr('perserveAspectRatio', 'xMinYMid')
            .call(resize);

          // to register multiple listeners for same event type,
          // you need to add namespace, i.e., 'click.foo'
          // necessary if you call invoke this function for multiple svgs
          // api docs: https://github.com/mbostock/d3/wiki/Selections#on
          d3.select(window).on('resize.' + container.attr('id'), resize);
        };

        const initialiseChart = data => {
          data = data.filter(
            row => row['high'] && row['low'] && row['close'] && row['open']
          );

          const thisYearStartDate = new Date(2018, 0, 1);

          // filter out data based on time period
          data = data.filter(row => {
            if (row['date']) {
              return row['date'] >= thisYearStartDate;
            }
          });

          const margin = { top: 10, right: 20, bottom: 20, left: 30 };
          const width = 800; // Use the window's width
          const height = 220; // Use the window's height

          // find data range
          const xMin = d3.min(data, d => {
            return d['date'];
          });

          const xMax = d3.max(data, d => {
            return d['date'];
          });

          const yMin = d3.min(data, d => {
            return d['close'];
          });

          const yMax = d3.max(data, d => {
            return d['close'];
          });

          // scale using range
          const xScale = d3
            .scaleTime()
            .domain([xMin, xMax])
            .range([0, width]);

          const yScale = d3
            .scaleLinear()
            .domain([yMin - 5, yMax])
            .range([height, 0]);

          // add chart SVG to the page
          const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin['left'] + margin['right'])
            .attr('height', height + margin['top'] + margin['bottom'])
            .call(responsivefy)
            .append('g')
            .attr('transform', `translate(${margin['left']}, ${margin['top']})`);

          // create the axes component
          // svg
          //   .append('g')
          //   .attr('id', 'xAxis')
          //   .attr('transform', `translate(0, ${height})`)
          //   .call(d3.axisBottom(xScale));

          // svg
          //   .append('g')
          //   .attr('id', 'yAxis')
          //   .attr('transform', `translate(${width}, 0)`)
          //   .call(d3.axisRight(yScale));

          // renders close price line chart and moving average line chart

          // generates lines when called
          const line = d3
            .line()
            .x(d => {
              return xScale(d['date']);
            })
            .y(d => {
              return yScale(d['close']);
            });

          const movingAverageLine = d3
            .line()
            .x(d => {
              return xScale(d['date']);
            })
            .y(d => {
              return yScale(d['average']);
            })
            .curve(d3.curveBasis);

          svg
            .append('path')
            .data([data]) // binds data to the line
            .style('fill', 'none')
            .attr('id', 'priceChart')
            .attr('stroke', '#E21010')
            .attr('stroke-width', '3.5')
            .attr('d', line);

          // calculates simple moving average over 50 days
          const movingAverageData = movingAverage(data, 49);
          svg
            .append('path')
            .data([movingAverageData])
            .style('fill', 'none')
            .attr('id', 'movingAverageLine')
            .attr('stroke', 'black')
            .attr('d', movingAverageLine);

          // renders x and y crosshair
          const focus = svg
            .append('g')
            .attr('class', 'focus')
            .style('display', 'none');

          focus.append('circle').attr('r', 4.5);
          // focus.append('line').classed('x', true);
          focus.append('line').classed('y', true);

          svg
            .append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', () => focus.style('display', null))
            .on('mouseout', () => focus.style('display', 'none'))
            .on('mousemove', generateCrosshair);

          d3.select('.overlay').style('fill', 'none');
          d3.select('.overlay').style('pointer-events', 'all');

          d3.selectAll('.focus line').style('fill', 'none');
          d3.selectAll('.focus line').style('stroke', 'gray');
          d3.selectAll('.focus line').style('stroke-width', '1.5px');
          d3.selectAll('.focus line').style('stroke-dasharray', '3 3');

          //returs insertion point
          const bisectDate = d3.bisector(d => d.date).left;

          /* mouseover function to generate crosshair */
          function generateCrosshair(event) {
            //returns corresponding value from the domain
            const correspondingDate = xScale.invert(d3.pointer(event)[0]);
            //gets insertion point
            var i = bisectDate(data, correspondingDate, 1);
            i = (i==data.length) ? i-1 : i;

            const d0 = data[i - 1];
            const d1 = data[i];
            const currentPoint =
              correspondingDate - d0['date'] > d1['date'] - correspondingDate ? d1 : d0;
            focus.attr(
              'transform',
              `translate(${xScale(currentPoint['date'])}, ${yScale(
                currentPoint['close']
              )})`
            );

            focus
              .select('line.x')
              .attr('x1', 0)
              .attr('x2', width - xScale(currentPoint['date']))
              .attr('y1', 0)
              .attr('y2', 0);

            focus
              .select('line.y')
              .attr('x1', 0)
              .attr('x2', 0)
              .attr('y1', 0)
              .attr('y2', height - yScale(currentPoint['close']));

            // updates the legend to display the date, open, close, high, low, and volume of the selected mouseover area
            updateLegends(currentPoint);
          }

          /* Legends */
          const updateLegends = currentData => {
              const items = document.getElementsByName("legendItems"); var item;
              for (item of items){
                  if (item.id == 'thatdate'){
                      item.innerHTML = "Date: "+currentData['date'].toLocaleDateString()
                  } else if (item.id == 'closeprice') {
                      item.innerHTML = "Closing Price: "+ currentData['close'].toFixed(2)+" INR"
                  } else if (item.id == 'volume') {
                      item.innerHTML = "Volume: "+ currentData['volume']
                  }
              }

              //     return `${d}: ${currentData[d].toLocaleDateString()}`;
              //   } else if (
              //     d === 'high' ||
              //     d === 'low' ||
              //     d === 'open' ||
              //     d === 'close'
              //   ) {
              //     return `${d}: ${currentData[d].toFixed(2)}`;
              //   } else {
              //     return `${d}: ${currentData[d]}`;
              //   }
              // })
              // .style('fill', '#00B140')
              // .attr('transform', 'translate(10,9)'); //align texts with boxes
          };

          /* Volume series bars */
          const volData = data.filter(d => d['volume'] !== null && d['volume'] !== 0);

          const yMinVolume = d3.min(volData, d => {
            return Math.min(d['volume']);
          });

          const yMaxVolume = d3.max(volData, d => {
            return Math.max(d['volume']);
          });

          const yVolumeScale = d3
            .scaleLinear()
            .domain([yMinVolume, yMaxVolume])
            .range([height, height * (3 / 4)]);

          svg.selectAll()
            .data(volData)
            .enter()
            .append('rect')
            .attr('x', d => {
              return xScale(d['date']);
            })
            .attr('y', d => {
              return yVolumeScale(d['volume']);
            })
            .attr('class', 'vol')
            .attr('fill', (d, i) => {
              if (i === 0) {
                return '#03a678';
              } else {
                return volData[i - 1].close > d.close ? '#c0392b' : '#03a678'; // green bar if price is rising during that period, and red when price  is falling
              }
            })
            .attr('width', 1)
            .attr('height', d => {
              return height - yVolumeScale(d['volume']);
            });
          // testing axis for volume
          /*
          svg.append('g').call(d3.axisLeft(yVolumeScale));
          */
        };
        initialiseChart(loadData(data))
        // loadData(data).then(data => {
        //   initialiseChart(data);
        // });
    }

    render(){
        return (
            <div id="chart" style={chartStyle.mainDiv}>
                <div style={chartStyle.topDiv}>
                    <div style={chartStyle.heading}>
                        <p style={chartStyle.title}>{this.props.title}</p>
                        <p style={chartStyle.subtitle}>Sample Company Name</p>
                    </div>
                    <div style={chartStyle.legend}>
                        <p name="legendItems" id="thatdate" style={chartStyle.legendItems}></p>
                        <p name="legendItems" id="closeprice" style={chartStyle.legendItems}></p>
                        <p name="legendItems" id="volume" style={chartStyle.legendItems}></p>
                    </div>
                </div>
            </div>
        );
    }
}

const chartStyle = { mainDiv: {
        background: "none",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
        // border: "thin solid black"
    }, topDiv: {
        background: "none",
        width: "95%",
        height: "60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "10 10 0 10",
        // border: "thin solid black"
    }, heading:{
        background: "none",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // margin: "10 0 0 10",
        // border: "thin solid black"
    }, legend:{
        background: "none",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        // margin: "10  0 0",
        // border: "thin solid black"
    }, title: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "28px",
        textDecoration: "none",
        color: "#E21010",
        margin: "0",
    }, subtitle: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "600",
        fontSize: "20px",
        textDecoration: "none",
        margin: "0",
    }, legendItems: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        textDecoration: "none",
        color: "gray",
        margin: "0",
        marginRight: "0 20 0 0"
    }
}
//
// body {
//   background: #00151c;
// }
//
// #chart {
//   background: #0e3040;
//   color: #67809f;
//   width: 100%;
//   height: 100%;
// }
//
// .flex-container {
//   padding: 0;
//   margin: 0;
//   list-style: none;
//
//   display: -webkit-box;
//   display: -moz-box;
//   display: -ms-flexbox;
//   display: -webkit-flex;
//   display: flex;
//
//   -webkit-flex-flow: row nowrap;
//   justify-content: flex-start;
//   align-items: center;
// }
//
// .flex-item {
//   color: white;
//   text-align: left;
//   padding: 1em;
// }
//
// a {
//   color: #67809f;
// }
