require! csv
require! async
node-geocoder = require 'node-geocoder'

geocoder = node-geocoder.getGeocoder \google

export function from_csv(path, opts, transform_cb, done)
  csv!
    .from path, opts
    .transform (record, index, callback) ->
      process.nextTick -> callback null, transform_cb record
    .on \error, -> console.log it.message
    .to.array done

addrs = {}    
f = (record) ->
  if record.7 is \醫事機構代碼 or record.7 is ''
    return
  addrs[record.7] = record.8

<- from_csv \hospbsc-2014.csv, {}, f 
funcs = []
result = {}

for let id,addr of addrs
  funcs.push (done) ->
    geocoder.geocode "#addr, TW"
      .then (res) -> 
        if res 
          result[id] = res.0
        else
          result[id] = null
        setTimeout -> ,200
        done!
      .catch -> 
        console.log it
        done!
<- async.series funcs
console.log JSON.stringify result, null, 4