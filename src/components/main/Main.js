import React from 'react';
import "./Main.scss";
import * as moment from "moment";
import * as d3 from "d3";

export default class Main extends React.Component {
    temp = {
        mean: 76,
        next: [{
            time: '6 AM',
            value: 65
        }, {
            time: '9 AM',
            value: 86
        }, {
            time: '12 AM',
            value: 88
        }, {
            time: '3 PM',
            value: 79
        }, {
            time: '6 PM',
            value: 62
        }, {
            time: '9 PM',
            value: 59
        }, {
            time: '12 AM',
            value: 52
        }, {
            time: '3 AM',
            value: 49
        }]
    };
    chartCreated = false;
    chartRef = React.createRef();

    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=Iasi&units=metric&appid=07998c4c7535f2ee9ea696569c6e1eb6')
            .then(response => response.json())
            .then(response => {
                if (response && response.list && response.list.length > 8) {
                    const values = response.list.slice(0, 8);
                    this.temp.next = values.map(e => {
                        return {
                            time: moment(e.dt * 1000).format('h A'),
                            value: Math.round(e.main.temp)
                        }
                    });
                    this.temp.mean = this.temp.next.reduce((acc, e) => {
                        return acc + e.value;
                    }, 0);
                    this.temp.mean = Math.round(this.temp.mean / 8);
                    this.forceUpdate();
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.chartCreated = false;
            });

        window.onresize = () => {
            this.chartCreated = false;
            this.forceUpdate();
        };
    }

    componentDidUpdate() {
        if (!this.chartCreated) {
            this.chartCreated = true;

            const self = this;

            function addPath() {
                svg.append('path')
                    .datum(self.temp.next)
                    .attr('fill', '#FFB236')
                    .attr('filter', 'url(#dropshadowtemp)')
                    .attr('d', d3.line()
                        .x(function (d) {
                            return x(d.time)
                        })
                        .y(function (d) {
                            return y(d.value)
                        })
                        .curve(d3.curveCardinal)
                    )
                    .call(p => {
                        const d = p.attr('d').replace('M0,', 'M-10,-10V') + 'H' + (width + 10) + 'V0Z';
                        p.attr('d', d);
                    });
            }

            const chart = d3.select(this.chartRef.current);

            if (!chart.node()) {
                return;
            }

            chart.select('svg')
                .remove();

            const svg = chart
                .append('svg')
                .style('position', 'absolute')
                .attr('width', chart.node().clientWidth)
                .attr('height', chart.node().clientHeight);

            svg.html(
                '<defs>' +
                    '<filter id="dropshadowtemp" height="180%">' +
                        '<feGaussianBlur in="SourceAlpha" stdDeviation="30"/>' +
                        '<feOffset dx="0" dy="-10" result="offsetblur"/>' +
                        '<feComponentTransfer>' +
                            '<feFuncA type="linear" slope="0.5"/>' +
                        '</feComponentTransfer>' +
                        '<feMerge>' +
                            '<feMergeNode/>' +
                            '<feMergeNode in="SourceGraphic"/>' +
                        '</feMerge>' +
                    '</filter>' +
                '</defs>'
            );

            const width = svg.node().clientWidth;
            const height = svg.node().clientHeight;

            // create y scale
            const y = d3.scaleLinear()
                .domain([d3.min(this.temp.next.map(e => e.value)) * 0.7, d3.max(this.temp.next.map(e => e.value)) * 1.3])
                .range([height - 60, 0]);

            // create x scale
            const x = d3.scaleBand()
                .domain(this.temp.next.map(e => e.time))
                .range([0, width]);

            // add path
            addPath();
        }
    }

    render() {
        return (
            <div className="Main">
                <div className="left d-none d-lg-flex">
                    <div className="background-image" style={{backgroundImage: 'url("article.jpg")'}}/>
                    <div className="article">
                        <div className="heading">Astronauts could land on Red Planet by 2039</div>
                        <div className="details">
                            <div className="detail">
                                <i className="detail-icon fa fa-times"/>
                                <span className="detail-text">SPACE.com</span>
                            </div>
                            <div className="detail">
                                <i className="detail-icon fa fa-clock-o"/>
                                <span className="detail-text">20m ago</span>
                            </div>

                            <div className="category">SCIENCE</div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="temp-overview-wrapper">
                        <div className="temp-overview">
                            <img src="/Icons/clouds.png"/>
                            <div className="temp-overview-description">Mostly Cloudy</div>
                            <div className="temp-overview-location">New York</div>
                        </div>
                        <div className="day-selector">
                            <ul className="day-selector-links d-none d-sm-flex">
                                <li className="active">Today</li>
                                <li>Tomorrow</li>
                                <li>Week</li>
                            </ul>
                            <div className="day-selector-temp">{this.temp.mean} &deg;</div>
                        </div>
                    </div>
                    <div className="temp-detailed">
                        {this.temp.next.map((e) => {
                            return (
                                <div className="temp-by-time">
                                    <div className="temp">{e.value}&deg;</div>
                                    <div className="time">{e.time}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chart" ref={this.chartRef}/>
                </div>
            </div>
        );
    }
}
