info-endpoint = "http://api-beta.ly.g0v.tw:8086/db/twer/series?u=guest&p=guest&q=select%20last(pending_ward)%20as%20ward,%20DIFFERENCE(pending_ward)%20as%20ward_diff%20from%20ER%20group%20by%20hospital_sn,%20time(1h)%20where%20time%20%3E%20now()%20-%2024h"

getdata = (url, succes) ->
  console.log succes
  xhr = new XMLHttpRequest
  xhr.open \GET, url, false
  xhr.onreadystatechange = ->
    if xhr.readyState == 4 and xhr.status == 200 
      succes JSON.parse xhr.responseText
    else
      succes []
  xhr.send null

fetch-data = ->
  info <- getdata info-endpoint
  postMessage info
  setTimeout fetch-data, 50000

fetch-data!