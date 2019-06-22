import React from "react";
import { AreaChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import moment from "moment";
import * as shape from "d3-shape";
import { StyleSheet, View } from "react-native";
import * as scale from "d3-scale";
import { get, size, map } from "lodash";
import {
  G,
  Line,
  Path,
  Circle,
  LinearGradient,
  Stop,
  Defs
} from "react-native-svg";
import { color, config } from "../config";
import { toJS } from "mobx";

import { inject, observer } from "mobx-react";

type PropsType = {
  type?: string
};

@inject("Sale", "Profit")
@observer
class LayeredChartsExample extends React.Component {
  static defaultProps = { type: config.typeFilterDate[1].id };

  constructor(props) {
    super(props);

    this.state = {
      dataRow: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
    };
  }

  componentDidMount() {
    const { Profit } = this.props;
    if (!Profit.getDataChart) {
      Profit.getChart();
    }
  }

  render() {
    let { Profit } = this.props;
    const dataPrices = toJS(get(Profit, "dataChart.prices"));
    const dataCounts = toJS(get(Profit, "dataChart.counts"));
    const dataMax = toJS(get(Profit, "dataChartConvert.max"));
    const dataMonth = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    //  toJS(get(Profit, "dataChartConvert.days"));

    const CustomGrid = ({ x, y, dataPrices, ticks }) => (
      <G>
        {// Horizontal grid
        size(ticks) > 0 ? (
          ticks.map(tick => (
            <Line
              key={tick}
              x1={"0%"}
              x2={"100%"}
              y1={y(tick)}
              y2={y(tick)}
              stroke={"#EAF0F4"}
            />
          ))
        ) : (
          <View />
        )}
        {// Vertical grid
        dataPrices && size(dataPrices) > 0 ? (
          dataPrices.map((_, index) => (
            <Line
              key={index}
              y1={"0%"}
              y2={"100%"}
              x1={x(index)}
              x2={x(index)}
              stroke={"#EAF0F4"}
            />
          ))
        ) : (
          <View />
        )}
      </G>
    );

    const DecoratorIn = ({ x, y, dataPrices }) => {
      if (dataPrices && size(dataPrices) > 0) {
        return dataPrices.map((value, index) => (
          <Circle
            key={index}
            cx={x(index)}
            cy={y(value)}
            r={2}
            strokeWidth={1}
            stroke={color.color_increase.rgb}
            fill={"white"}
          />
        ));
      }
      return <View />;
    };

    const DecoratorDe = ({ x, y, dataPrices }) => {
      if (dataPrices && size(dataPrices) > 0)
        return dataPrices.map((value, index) => (
          <Circle
            key={index}
            cx={x(index)}
            cy={y(value)}
            r={2}
            strokeWidth={1}
            stroke={color.color_decrease.rgb}
            fill={"white"}
          />
        ));
      return <View />;
    };

    const Gradient = () => (
      <Defs key={"gradient"}>
        <LinearGradient
          id={"gradient"}
          x1={"0%"}
          y={"0%"}
          x2={"0%"}
          y2={"100%"}
        >
          <Stop offset={"0%"} stopColor={"rgba(9, 113, 206, 0.6)"} />
          <Stop offset={"100%"} stopColor={"rgba(9, 113, 206, 0)"} />
        </LinearGradient>
      </Defs>
    );

    return (
      <View
        style={{
          height: "100%",
          flexDirection: "row",
          backgroundColor: "transparent"
        }}
      >
        {dataMax && size(dataMax) > 0 ? (
          <YAxis
            data={dataMax}
            yAccessor={({ index }) => index}
            scale={scale.scaleBand}
            contentInset={{ bottom: 15 }}
            style={{
              marginRight: 10
            }}
            // formatLabel={(value, index) => data[index]}
            formatLabel={(_, index) => dataMax[index]}
          />
        ) : (
          <View />
        )}
        <View
          style={{ flex: 1, width: "100%", backgroundColor: "transparent" }}
        >
          <View
            style={{ flex: 1, width: "100%", backgroundColor: "transparent" }}
          >
            {dataPrices && size(dataPrices) > 0 ? (
              <AreaChart
                numberOfTicks={5}
                animate
                style={StyleSheet.absoluteFill}
                data={dataPrices}
                svg={{
                  fill: color.color_decrease.rgb06,
                  stroke: color.color_decrease.rgb
                }}
                // contentInset={{ marginBottom: 10 }}
                curve={shape.curveNatural}
                yMin={0}
                xMin={0}
              >
                <CustomGrid belowChart={true} />
                <DecoratorDe />
              </AreaChart>
            ) : (
              <View />
            )}
            {dataCounts && size(dataCounts) > 0 ? (
              <AreaChart
                numberOfTicks={5}
                animate
                style={StyleSheet.absoluteFill}
                data={dataCounts}
                svg={{
                  fill: color.color_decrease.rgb06,
                  stroke: color.color_decrease.rgb
                }}
                // contentInset={{ marginBottom: 10 }}
                curve={shape.curveNatural}
                yMin={0}
                xMin={0}
              >
                <DecoratorDe />
              </AreaChart>
            ) : (
              <View />
            )}
          </View>
          {dataMonth && size(dataMonth) > 0 ? (
            <XAxis
              data={dataMonth}
              scale={scale.scaleBand}
              formatLabel={(value, index) =>
                dataMonth[index] || "dataMonth[index]"
              }
              style={{
                marginTop: 10
              }}
              // contentInset={{
              //     left: 10, right: 10
              // }}
              labelStyle={{ color: "#43425D", fontSize: 10 }}
            />
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

export default LayeredChartsExample;
