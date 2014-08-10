{div} = React.DOM

Map = React.createClass do
  getInitialState: -> do
    map: null
    markers: []
  getDefaultProps: -> do
    latitude: 0
    longitude: 0
    zoom: 14 
    points: []
  render: ->
    div {id:\map}, null
  componentDidMount: -> 
    osm = new L.OSM.Mapnik
    opts = do
      center: new L.LatLng @props.latitude, @props.longitude
      zoom: @props.zoom
      layers: [osm]
    map = new L.Map 'map', opts 
      .addControl new L.Control.Scale    
    @setState {map: map}

window.init = ->
  pos <- navigator.geolocation.getCurrentPosition
  React.renderComponent Map({latitude:pos.coords.latitude, longitude: pos.coords.longitude}), document.body