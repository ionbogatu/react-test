import React from 'react';
import './Stats.scss';
import * as d3 from 'd3';
import * as moment from 'moment';
import StatCard from '../stat-card/StatCard';

class Stats extends React.Component {
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    chartCreated = false;
    assetStatsRef;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentValue: null,
            selectedChartSymbol: 'AAPL'
        };

        this.assetStatsRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            data: [
                {
                    symbol: 'NASDAQ',
                    growth: '-0.85%',
                    current: '5.055.55',
                    values: [
                        {
                            x: new Date(2014, 2),
                            y: {
                                price: 5000,
                                low: 4998,
                                high: 5001,
                                open: 4999,
                                marketCap: '735.34B',
                                dividentYield: '1.65%',
                                peRatio: 15.32
                            }
                        }, {
                            x: new Date(2014, 3),
                            y: {
                                price: 5040,
                                low: 5038,
                                high: 5041,
                                open: 5039,
                                marketCap: '735.35B',
                                dividentYield: '1.66%',
                                peRatio: 15.33
                            }
                        }, {
                            x: new Date(2014, 4),
                            y: {
                                price: 5013,
                                low: 5011,
                                high: 5014,
                                open: 5012,
                                marketCap: '735.36B',
                                dividentYield: '1.67%',
                                peRatio: 15.34
                            }
                        }, {
                            x: new Date(2014, 5),
                            y: {
                                price: 5027,
                                low: 5025,
                                high: 5028,
                                open: 5026,
                                marketCap: '735.37B',
                                dividentYield: '1.68%',
                                peRatio: 15.35
                            }
                        }, {
                            x: new Date(2014, 6),
                            y: {
                                price: 5001,
                                low: 4999,
                                high: 5002,
                                open: 5000,
                                marketCap: '735.38B',
                                dividentYield: '1.69%',
                                peRatio: 15.36
                            }
                        }, {
                            x: new Date(2014, 7),
                            y: {
                                price: 4989,
                                low: 4987,
                                high: 4990,
                                open: 4988,
                                marketCap: '735.39B',
                                dividentYield: '1.7%',
                                peRatio: 15.37
                            }
                        }, {
                            x: new Date(2014, 8),
                            y: {
                                price: 4987,
                                low: 4985,
                                high: 4988,
                                open: 4986,
                                marketCap: '735.4B',
                                dividentYield: '1.71%',
                                peRatio: 15.38
                            }
                        }, {
                            x: new Date(2014, 9),
                            y: {
                                price: 5003,
                                low: 5001,
                                high: 5004,
                                open: 5002,
                                marketCap: '735.41B',
                                dividentYield: '1.72%',
                                peRatio: 15.39
                            }
                        }, {
                            x: new Date(2014, 10),
                            y: {
                                price: 5017,
                                low: 5015,
                                high: 5018,
                                open: 5016,
                                marketCap: '735.42B',
                                dividentYield: '1.73%',
                                peRatio: 15.4
                            }
                        }, {
                            x: new Date(2014, 11),
                            y: {
                                price: 5024,
                                low: 5022,
                                high: 5025,
                                open: 5023,
                                marketCap: '735.43B',
                                dividentYield: '1.74%',
                                peRatio: 15.41
                            }
                        }, {
                            x: new Date(2015, 0),
                            y: {
                                price: 5008,
                                low: 5006,
                                high: 5009,
                                open: 5007,
                                marketCap: '735.44B',
                                dividentYield: '1.75%',
                                peRatio: 15.42
                            }
                        }, {
                            x: new Date(2015, 1),
                            y: {
                                price: 5003,
                                low: 5001,
                                high: 5004,
                                open: 5002,
                                marketCap: '735.45B',
                                dividentYield: '1.76%',
                                peRatio: 15.43
                            }
                        }, {
                            x: new Date(2015, 2),
                            y: {
                                price: 4995,
                                low: 4993,
                                high: 4996,
                                open: 4994,
                                marketCap: '735.46B',
                                dividentYield: '1.77%',
                                peRatio: 15.44
                            }
                        }, {
                            x: new Date(2015, 3),
                            y: {
                                price: 4998,
                                low: 4996,
                                high: 4999,
                                open: 4997,
                                marketCap: '735.47B',
                                dividentYield: '1.78%',
                                peRatio: 15.45
                            }
                        }
                    ]
                }, {
                    symbol: 'AAPL',
                    growth: '+0.51%',
                    current: '126.56',
                    values: [
                        {
                            x: new Date(2014, 2),
                            y: {
                                price: 100,
                                low: 98,
                                high: 101,
                                open: 99,
                                marketCap: '735.30B',
                                dividentYield: '1.63%',
                                peRatio: 15.73
                            }
                        }, {
                            x: new Date(2014, 3),
                            y: {
                                price: 110,
                                low: 108,
                                high: 111,
                                open: 109,
                                marketCap: '735.31B',
                                dividentYield: '1.64%',
                                peRatio: 15.74
                            }
                        }, {
                            x: new Date(2014, 4),
                            y: {
                                price: 95,
                                low: 93,
                                high: 96,
                                open: 94,
                                marketCap: '735.32B',
                                dividentYield: '1.65%',
                                peRatio: 15.75
                            }
                        }, {
                            x: new Date(2014, 5),
                            y: {
                                price: 97,
                                low: 95,
                                high: 98,
                                open: 96,
                                marketCap: '735.33B',
                                dividentYield: '1.66%',
                                peRatio: 15.76
                            }
                        }, {
                            x: new Date(2014, 6),
                            y: {
                                price: 110,
                                low: 108,
                                high: 111,
                                open: 109,
                                marketCap: '735.34B',
                                dividentYield: '1.67%',
                                peRatio: 15.77
                            }
                        }, {
                            x: new Date(2014, 7),
                            y: {
                                price: 111,
                                low: 109,
                                high: 112,
                                open: 110,
                                marketCap: '735.35B',
                                dividentYield: '1.68%',
                                peRatio: 15.78
                            }
                        }, {
                            x: new Date(2014, 8),
                            y: {
                                price: 107,
                                low: 105,
                                high: 108,
                                open: 106,
                                marketCap: '735.36B',
                                dividentYield: '1.69%',
                                peRatio: 15.79
                            }
                        }, {
                            x: new Date(2014, 9),
                            y: {
                                price: 108,
                                low: 106,
                                high: 1109,
                                open: 107,
                                marketCap: '735.37B',
                                dividentYield: '1.70%',
                                peRatio: 15.80
                            }
                        }, {
                            x: new Date(2014, 10),
                            y: {
                                price: 119,
                                low: 117,
                                high: 120,
                                open: 118,
                                marketCap: '735.38B',
                                dividentYield: '1.71%',
                                peRatio: 15.81
                            }
                        }, {
                            x: new Date(2014, 11),
                            y: {
                                price: 118,
                                low: 116,
                                high: 119,
                                open: 117,
                                marketCap: '735.39B',
                                dividentYield: '1.72%',
                                peRatio: 15.82
                            }
                        }, {
                            x: new Date(2015, 0),
                            y: {
                                price: 104,
                                low: 102,
                                high: 105,
                                open: 103,
                                marketCap: '735.4B',
                                dividentYield: '1.73%',
                                peRatio: 15.83
                            }
                        }, {
                            x: new Date(2015, 1),
                            y: {
                                price: 106,
                                low: 104,
                                high: 107,
                                open: 105,
                                marketCap: '735.41B',
                                dividentYield: '1.74%',
                                peRatio: 15.84
                            }
                        }, {
                            x: new Date(2015, 2),
                            y: {
                                price: 112,
                                low: 110,
                                high: 113,
                                open: 111,
                                marketCap: '735.42B',
                                dividentYield: '1.75%',
                                peRatio: 15.85
                            }
                        }, {
                            x: new Date(2015, 3),
                            y: {
                                price: 100,
                                low: 98,
                                high: 101,
                                open: 99,
                                marketCap: '735.43B',
                                dividentYield: '1.76%',
                                peRatio: 15.86
                            }
                        }
                    ]
                }, {
                    symbol: 'DOW J',
                    symbolAlt: 'DOW JONES',
                    growth: '-0.34%',
                    current: '19.926.02',
                    values: [
                        {
                            x: new Date(2014, 2),
                            y: {
                                price: 19900,
                                low: 19898,
                                high: 19901,
                                open: 19989,
                                marketCap: '735.56B',
                                dividentYield: '1.32%',
                                peRatio: 15.22
                            }
                        }, {
                            x: new Date(2014, 3),
                            y: {
                                price: 18750,
                                low: 18648,
                                high: 18751,
                                open: 18749,
                                marketCap: '735.57B',
                                dividentYield: '1.33%',
                                peRatio: 15.23
                            }
                        }, {
                            x: new Date(2014, 4),
                            y: {
                                price: 19300,
                                low: 19298,
                                high: 19301,
                                open: 19299,
                                marketCap: '735.58B',
                                dividentYield: '1.34%',
                                peRatio: 15.24
                            }
                        }, {
                            x: new Date(2014, 5),
                            y: {
                                price: 20276,
                                low: 20274,
                                high: 20277,
                                open: 20275,
                                marketCap: '735.59B',
                                dividentYield: '1.35%',
                                peRatio: 15.25
                            }
                        }, {
                            x: new Date(2014, 6),
                            y: {
                                price: 21832,
                                low: 21830,
                                high: 21833,
                                open: 21831,
                                marketCap: '735.6B',
                                dividentYield: '1.36%',
                                peRatio: 15.26
                            }
                        }, {
                            x: new Date(2014, 7),
                            y: {
                                price: 20387,
                                low: 20385,
                                high: 20388,
                                open: 20386,
                                marketCap: '735.61B',
                                dividentYield: '1.37%',
                                peRatio: 15.27
                            }
                        }, {
                            x: new Date(2014, 8),
                            y: {
                                price: 18054,
                                low: 18052,
                                high: 18055,
                                open: 18053,
                                marketCap: '735.62B',
                                dividentYield: '1.38%',
                                peRatio: 15.28
                            }
                        }, {
                            x: new Date(2014, 9),
                            y: {
                                price: 19502,
                                low: 19500,
                                high: 19503,
                                open: 19501,
                                marketCap: '735.63B',
                                dividentYield: '1.39%',
                                peRatio: 15.29
                            }
                        }, {
                            x: new Date(2014, 10),
                            y: {
                                price: 19668,
                                low: 19666,
                                high: 19669,
                                open: 19667,
                                marketCap: '735.64B',
                                dividentYield: '1.4%',
                                peRatio: 15.30
                            }
                        }, {
                            x: new Date(2014, 11),
                            y: {
                                price: 20119,
                                low: 20117,
                                high: 20120,
                                open: 20118,
                                marketCap: '735.65B',
                                dividentYield: '1.41%',
                                peRatio: 15.31
                            }
                        }, {
                            x: new Date(2015, 0),
                            y: {
                                price: 20540,
                                low: 20538,
                                high: 20541,
                                open: 20539,
                                marketCap: '735.66B',
                                dividentYield: '1.42%',
                                peRatio: 15.32
                            }
                        }, {
                            x: new Date(2015, 1),
                            y: {
                                price: 21007,
                                low: 21005,
                                high: 21008,
                                open: 21006,
                                marketCap: '735.67B',
                                dividentYield: '1.43%',
                                peRatio: 15.33
                            }
                        }, {
                            x: new Date(2015, 2),
                            y: {
                                price: 20832,
                                low: 20830,
                                high: 20833,
                                open: 20831,
                                marketCap: '735.68B',
                                dividentYield: '1.44%',
                                peRatio: 15.34
                            }
                        }, {
                            x: new Date(2015, 3),
                            y: {
                                price: 20493,
                                low: 20491,
                                high: 20494,
                                open: 20492,
                                marketCap: '735.69B',
                                dividentYield: '1.45%',
                                peRatio: 15.35
                            }
                        }
                    ]
                }, {
                    symbol: 'GOOG',
                    growth: '+0.70%',
                    current: '534.53',
                    values: [
                        {
                            x: new Date(2014, 2),
                            y: {
                                price: 100,
                                low: 98,
                                high: 101,
                                open: 99,
                                marketCap: '735.30B',
                                dividentYield: '1.63%',
                                peRatio: 15.73
                            }
                        }, {
                            x: new Date(2014, 3),
                            y: {
                                price: 110,
                                low: 108,
                                high: 111,
                                open: 109,
                                marketCap: '735.31B',
                                dividentYield: '1.64%',
                                peRatio: 15.74
                            }
                        }, {
                            x: new Date(2014, 4),
                            y: {
                                price: 95,
                                low: 93,
                                high: 96,
                                open: 94,
                                marketCap: '735.32B',
                                dividentYield: '1.65%',
                                peRatio: 15.75
                            }
                        }, {
                            x: new Date(2014, 5),
                            y: {
                                price: 97,
                                low: 95,
                                high: 98,
                                open: 96,
                                marketCap: '735.33B',
                                dividentYield: '1.66%',
                                peRatio: 15.76
                            }
                        }, {
                            x: new Date(2014, 6),
                            y: {
                                price: 110,
                                low: 108,
                                high: 111,
                                open: 109,
                                marketCap: '735.34B',
                                dividentYield: '1.67%',
                                peRatio: 15.77
                            }
                        }, {
                            x: new Date(2014, 7),
                            y: {
                                price: 111,
                                low: 109,
                                high: 112,
                                open: 110,
                                marketCap: '735.35B',
                                dividentYield: '1.68%',
                                peRatio: 15.78
                            }
                        }, {
                            x: new Date(2014, 8),
                            y: {
                                price: 107,
                                low: 105,
                                high: 108,
                                open: 106,
                                marketCap: '735.36B',
                                dividentYield: '1.69%',
                                peRatio: 15.79
                            }
                        }, {
                            x: new Date(2014, 9),
                            y: {
                                price: 108,
                                low: 106,
                                high: 1109,
                                open: 107,
                                marketCap: '735.37B',
                                dividentYield: '1.70%',
                                peRatio: 15.80
                            }
                        }, {
                            x: new Date(2014, 10),
                            y: {
                                price: 119,
                                low: 117,
                                high: 120,
                                open: 118,
                                marketCap: '735.38B',
                                dividentYield: '1.71%',
                                peRatio: 15.81
                            }
                        }, {
                            x: new Date(2014, 11),
                            y: {
                                price: 118,
                                low: 116,
                                high: 119,
                                open: 117,
                                marketCap: '735.39B',
                                dividentYield: '1.72%',
                                peRatio: 15.82
                            }
                        }, {
                            x: new Date(2015, 0),
                            y: {
                                price: 104,
                                low: 102,
                                high: 105,
                                open: 103,
                                marketCap: '735.4B',
                                dividentYield: '1.73%',
                                peRatio: 15.83
                            }
                        }, {
                            x: new Date(2015, 1),
                            y: {
                                price: 106,
                                low: 104,
                                high: 107,
                                open: 105,
                                marketCap: '735.41B',
                                dividentYield: '1.74%',
                                peRatio: 15.84
                            }
                        }, {
                            x: new Date(2015, 2),
                            y: {
                                price: 112,
                                low: 110,
                                high: 113,
                                open: 111,
                                marketCap: '735.42B',
                                dividentYield: '1.75%',
                                peRatio: 15.85
                            }
                        }, {
                            x: new Date(2015, 3),
                            y: {
                                price: 100,
                                low: 98,
                                high: 101,
                                open: 99,
                                marketCap: '735.43B',
                                dividentYield: '1.76%',
                                peRatio: 15.86
                            }
                        }
                    ]
                }
            ]
        }, () => {
            const newCurrentValue = this.state.data.find((e) => e.symbol === this.state.selectedChartSymbol);

            if (newCurrentValue) {
                this.setState({
                    currentValue: newCurrentValue.values[1]
                });
            }
        });

        window.onresize = () => {
            this.chartCreated = false;
            this.forceUpdate();
        };
    }

    componentDidUpdate() {
        const newCurrentValue = this.state.data.find((e) => e.symbol === this.state.selectedChartSymbol);

        if (!this.chartCreated && newCurrentValue) {
            this.chartCreated = true;

            const self = this;

            function addYAxis() {
                let y_axis = d3.axisLeft(y)
                    .tickSizeInner(0)
                    .tickSizeOuter(0);

                const yAxisG = svg.append('g')
                    .style('transform', 'translateX(' + (width - 55) + 'px)')
                    .style('font-family', 'Montserrat, sans-serif')
                    .style('font-weight', '700')
                    .style('font-size', '14px')
                    .call(y_axis);

                yAxisG.call(g => g.select('g:first-of-type').style('visibility', 'hidden'))
                    .call(g => g.select('g:last-child').style('visibility', 'hidden'));

                yAxisG.selectAll('text').attr('fill', 'rgb(176, 176, 176)');

                yAxisG.select('.domain')
                    .remove();
            }

            function addXAxis() {
                let x_axis = d3.axisBottom(x)
                    .tickSizeInner(0)
                    .tickSizeOuter(0);

                const xAxisG = svg.append('g')
                    .style('transform', 'translateY(calc(' + (height) + 'px - 5.6em))')
                    .style('font-family', 'Montserrat, sans-serif')
                    .style('font-weight', '700')
                    .style('font-size', '1.5em')
                    .call(x_axis);

                xAxisG.call(g => g.select('g:first-of-type').remove());
                xAxisG.call(g => g.select('g:last-child').remove());

                xAxisG.selectAll('text').attr('fill', 'rgb(176, 176, 176)');

                xAxisG.selectAll('.tick').each(function (t, i) {
                    if (t instanceof Date) {
                        const $this = d3.select(this);
                        $this.select('text').node().textContent = self.months[t.getMonth()];

                        if (t.getMonth() === 0 || i === 0) {
                            let text = $this.append('text')
                                .text(t.getFullYear())
                                .attr('fill', 'rgb(243, 243, 243)')
                                .style('font-family', 'Montserrat, sans-serif')
                                .style('font-size', '5.5em');

                            if (t.getMonth() === 0) {
                                text = text.style('transform', 'translate(0.9em, 1em)');
                            } else {
                                text = text.style('transform', 'translateY(1em)');
                            }
                        }
                    }
                });

                xAxisG.select('.domain')
                    .remove();
            }

            function addPath() {
                svg.append('path')
                    .datum(newCurrentValue.values)
                    .attr('fill', '#fff')
                    .attr('stroke', 'none')
                    .attr('filter', 'url(#dropshadow)')
                    .attr('d', d3.line()
                        .x(function (d) {
                            return x(d.x)
                        })
                        .y(function (d) {
                            return y(d.y.price)
                        })
                        .curve(d3.curveCardinal)
                    )
                    .call(p => {
                        const d = p.attr('d').replace('M0,', 'M0,0V') + 'V0Z';
                        p.attr('d', d);
                    });
            }

            function mouseMove(event) {
                const x0 = x.invert(d3.pointer(event)[0]);
                const value = newCurrentValue.values.find(e => e.x.getFullYear() === x0.getFullYear() && e.x.getMonth() === x0.getMonth());

                if (value) {
                    if (value.x === newCurrentValue.values[0].x) {
                        return;
                    }

                    circleGroup.attr('transform', 'translate(' + x(value.x) + ', ' + y(value.y.price) + ')');

                    self.setState({
                        currentValue: value
                    });
                }
            }

            function addCircle() {
                circleGroup.append('circle')
                    .attr('r', 20)
                    .attr('fill', '#F9633155')
                    .attr('stroke', 'none');

                circleGroup.append('circle')
                    .attr('r', 10)
                    .attr('fill', '#F96331')
                    .attr('stroke', 'none');

                svg.append('rect')
                    .style('fill', 'none')
                    .style('pointer-events', 'all')
                    .attr('width', width)
                    .attr('height', height)
                    .on('mousemove', mouseMove);

                const defaultValue = self.state.data.find((e) => e.symbol === self.state.selectedChartSymbol);

                if (defaultValue) {
                    circleGroup.attr('transform', 'translate(' + x(defaultValue.values[1].x) + ', ' + y(defaultValue.values[1].y.price) + ')');
                }
            }

            const tabContent = d3.select('.tab-content');

            if (!tabContent.node()) {
                return;
            }

            tabContent.select('svg')
                .remove();

            const svg = tabContent
                .append('svg')
                .attr('width', tabContent.node().clientWidth);

            let svgHeight = '100%';
            if (window.document.body.clientWidth >= 1700) {
                svgHeight = (tabContent.node().clientHeight * 0.93) + 'px';
            } else {
                svgHeight = 'calc(100% - ' + this.assetStatsRef.current.clientHeight + 'px)';
            }

            svg.style('height', svgHeight);

            svg.html(
                '<defs>' +
                '<filter id="dropshadow" height="130%">' +
                '<feGaussianBlur in="SourceAlpha" stdDeviation="30"/>' +
                '<feOffset dx="0" dy="-30" result="offsetblur"/>' +
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
                .domain([d3.min(newCurrentValue.values.map(e => e.y.price)) * 0.8, d3.max(newCurrentValue.values.map(e => e.y.price)) * 1.3])
                .range([height - 32, 0]);

            // create x scale
            const x = d3.scaleTime()
                .domain([d3.min(newCurrentValue.values.map(e => e.x)), d3.max(newCurrentValue.values.map(e => e.x))])
                .range([0, width]);

            // add path
            addPath();

            // add y axis
            addYAxis();

            // add x axis
            addXAxis();

            // add circle
            const circleGroup = svg.append('g');
            addCircle();
        }
    }

    dateFormat(date) {
        let result = '';

        if (date instanceof Date) {
            return moment(date).format('MMM DD H:mm A');
        }

        return result;
    }

    handleClick(symbol) {
        const newCurrentValue = this.state.data.find((e) => e.symbol === symbol);

        if (newCurrentValue) {
            d3.select('.tab-content > svg').remove();

            this.chartCreated = false;

            this.setState({
                selectedChartSymbol: symbol,
                currentValue: newCurrentValue.values[1]
            });
        }
    }

    render() {
        return (
            <div className='Stats'>
                <div className="stats-inner d-none d-md-flex">
                    <div className='tab-header'>
                        {this.state.data.map((e, i) => {
                            return (
                                <div
                                    className={'tab-anchor' + (e.symbol === this.state.selectedChartSymbol ? ' active' : '')}
                                    key={i} onClick={() => this.handleClick(e.symbol)}>
                                    <div className='asset'>
                                        <div className='asset-name'>{e.symbol}</div>
                                        <div className='asset-price'>{e.current}</div>
                                    </div>
                                    <div
                                        className={'asset-growth' + (e.growth.startsWith('+') ? ' green' : ' red')}>{e.growth}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='tab-content'>
                        <div className="asset-stats" ref={this.assetStatsRef}>
                            <div className="current-price">
                                <div className="symbol">NASDAQ: {this.state.selectedChartSymbol}</div>
                                <div className="bid">{this.state.currentValue?.y.price}</div>
                                <div className="date">{this.dateFormat(this.state.currentValue?.x)} EDT</div>
                            </div>
                            <div className="day-stats-wrapper">
                                <div className="day-stats">
                                    <div className="name">Low</div>
                                    <div className="value">{this.state.currentValue?.y.low}</div>
                                    <div className="name">Marget Cap</div>
                                    <div className="value"
                                         style={{paddingLeft: '1.5rem'}}>{this.state.currentValue?.y.marketCap}</div>
                                    <div className="name">High</div>
                                    <div className="value">{this.state.currentValue?.y.high}</div>
                                    <div className="name">Divident yield</div>
                                    <div className="value"
                                         style={{paddingLeft: '1.5rem'}}>{this.state.currentValue?.y.dividentYield}</div>
                                    <div className="name">Open</div>
                                    <div className="value">{this.state.currentValue?.y.open}</div>
                                    <div className="name">P/E ratio (ttm)</div>
                                    <div className="value"
                                         style={{paddingLeft: '1.5rem'}}>{this.state.currentValue?.y.peRatio}</div>
                                </div>
                                <div className="graphic-type-wrapper">
                                    <div className="graphic-type">
                                        <i className="fa fa-line-chart" aria-hidden="true"/>
                                        <span>1 Year</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.data.length ?
                    (<div className="stats-mobile-inner d-flex d-md-none">
                        <div className="w-50">
                            <StatCard index={1} data={this.state.data[0]}/>
                        </div>
                        <div className="w-50">
                            <StatCard index={2} data={this.state.data[2]}/>
                        </div>
                    </div>) : ''
                }
            </div>
        );
    }
}

export default Stats;
