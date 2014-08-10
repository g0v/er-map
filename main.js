// Generated by LiveScript 1.2.0
(function(){
  var div, Map;
  div = React.DOM.div;
  Map = React.createClass({
    getInitialState: function(){
      return {
        map: null,
        markers: []
      };
    },
    getDefaultProps: function(){
      return {
        latitude: 0,
        longitude: 0,
        zoom: 14,
        points: []
      };
    },
    render: function(){
      return div({
        id: 'map'
      }, null);
    },
    componentDidMount: function(){
      var osm, opts, map;
      osm = new L.OSM.Mapnik;
      opts = {
        center: new L.LatLng(this.props.latitude, this.props.longitude),
        zoom: this.props.zoom,
        layers: [osm]
      };
      map = new L.Map('map', opts).addControl(new L.Control.Scale);
      return this.setState({
        map: map
      });
    }
  });
  window.init = function(){
    return navigator.geolocation.getCurrentPosition(function(pos){
      return React.renderComponent(Map({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }), document.body);
    });
  };
}).call(this);