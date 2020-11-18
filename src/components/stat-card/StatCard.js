import React from "react";
import './StatCard.scss';
import * as d3 from "d3";

export default class StatCard extends React.Component {
    chartCreated = false;
    ref = React.createRef();

    componentDidMount() {
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
                    .datum(self.props.data.values)
                    .attr('fill', '#ffffff')
                    .attr('stroke', '#d3d3d3')
                    .attr('filter', 'url(#dropshadow' + self.props.index + ')')
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
                        const d = p.attr('d').replace('M0,', 'M-10,-10V') + 'h10V0Z';
                        p.attr('d', d);
                    });
            }

            const chart = d3.select(this.ref.current)
                .select('.chart');

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
                    '<filter id="dropshadow' + this.props.index + '" height="250%">' +
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
                .domain([d3.min(this.props.data.values.map(e => e.y.price)) * 0.8, d3.max(this.props.data.values.map(e => e.y.price)) * 1.3])
                .range([height - 32, 0]);

            // create x scale
            const x = d3.scaleTime()
                .domain([d3.min(this.props.data.values.map(e => e.x)), d3.max(this.props.data.values.map(e => e.x))])
                .range([0, width]);

            // add path
            addPath();
        }
    }

    render() {
        return (
            <div className="StatCard" ref={this.ref}>
                <div className="header">
                    <div className="name">
                        <div className="name-text">{this.props.data.symbolAlt || this.props.data.symbol}</div>
                        <div className="d-flex flex-column">
                            <span className="dot"/>
                            <span className="dot"/>
                        </div>
                    </div>
                    <div className={"growth" + (this.props.data.growth.startsWith('+') ? ' green' : ' red')}>{this.props.data.growth}</div>
                    <div className="price">{this.props.data.current}</div>
                </div>
                <div className="chart">
                    <button>Details</button>
                </div>
            </div>
        );
    }
}
