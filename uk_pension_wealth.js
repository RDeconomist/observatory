
// pension wealth dataviz
let vis_pension_wealth = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      autosize: { type: "fit", contains: "padding" },
          padding: 5,
          style: "cell",
          signals: [
          {
              name: "width",
              init: "containerSize()[0]",
              on: [{ events: "window:resize", update: "containerSize()[0]" }]
          },
          {
              name: "height",
              init: "containerSize()[1]",
              on: [{ events: "window:resize", update: "containerSize()[1]" }]
          }
          ],
    "data": {"url": "https://raw.githubusercontent.com/RDeconomist/observatory/main/total_uk_pension_wealth.csv"},
    "width": "container",
    "height": "container",
    "encoding": {"x": {"field": "year", 
    "type": "temporal", 
    "scale": {"domain": ["2006","2018"]},
    "axis": {"grid": false, "tickCount": 10, "title":null}
  }
  },

    "layer": [
      {
        "encoding": {
          "color": {"field": "name", "type": "nominal"},
          "y": {"field": "£ billions", 
          "type": "quantitative"
      }
        },
        "layer": [
          {"mark": {"type": "line", "point": true}},
          {"transform": [{"filter": {"selection": "hover"}}], "mark": "point"}
        ]
      },
      {
        "transform": [{"pivot": "name", "value": "£ billions", "groupby": ["year"]}],
        "mark": "rule",
        "encoding": {
          "opacity": {
            "condition": {"value": 0.3, "selection": "hover"},
            "value": 0
          },
          "tip": [
            {"field": "Total pension wealth", "type": "nominal"},
            {"field": "Estimated elements of pension wealth", "type": "quantitative"},
            {"field": "Constant 2006-8 rates", "type": "quantitative"}
          ]
        }, 
        "selection": {
          "hover": {
            "type": "single",
            "fields": ["year"],
            "nearest": true,
            "on": "mouseover",
            "empty": "none",
            "clear": "mouseout"
          }
        }
      }
    ],
    "config": {
      "arc": {"fill": "#3366CC"},
      "area": {"fill": "#3366CC"},
      "path": {"stroke": "#3366CC"},
      "rect": {"fill": "#3366CC"},
      "shape": {"stroke": "#3366CC"},
      "symbol": {"stroke": "#3366CC"},
      "circle": {"fill": "#3366CC"},
      "background": "#fff",
      "padding": {"top": 10, "right": 10, "bottom": 10, "left": 10},
      "style": {
          "guide-label": {"font": "Arial, sans-serif", "fontSize": 12},
          "guide-title": {"font": "Arial, sans-serif", "fontSize": 12},
          "group-title": {"font": "Arial, sans-serif", "fontSize": 12}
      },
      "title": {
          "font": "Arial, sans-serif",
          "fontSize": 14,
          "fontWeight": "bold",
          "dy": -3,
          "anchor": "start"
      },
      "axis": {
          "gridColor": "#ccc",
          "tickColor": "#ccc",
          "domain": false,
          "grid": true
      },
      "legend": {
          "orient": "top",
          "title": null
      },
      "range": {
          "category": [
          "#4285F4",
          "#DB4437",
          "#F4B400",
          "#0F9D58",
          "#AB47BC",
          "#00ACC1",
          "#FF7043",
          "#9E9D24",
          "#5C6BC0",
          "#F06292",
          "#00796B",
          "#C2185B"
          ],
          "heatmap": ["#c6dafc", "#5e97f6", "#2a56c6"]
      }
      }
  };
  const pension_wealth = new vega.View(vega.parse(vis_pension_wealth), {
      renderer: "canvas", // renderer (canvas or svg)
      container: "#vis_pension_wealth", // parent DOM container
      hover: true // enable hover processing
    });
    pension_wealth.runAsync();
  vegaEmbed('#vis_pension_wealth', vis_pension_wealth);
// pension wealth dataviz END