// Generated by LiveScript 1.2.0
(function(){
  var infoEndpoint, getdata, fetchData;
  infoEndpoint = "http://api-beta.ly.g0v.tw:8086/db/twer/series?u=guest&p=guest&q=select%20last(pending_ward)%20as%20ward,%20DIFFERENCE(pending_ward)%20as%20ward_diff%20from%20ER%20group%20by%20hospital_sn,%20time(1h)%20where%20time%20%3E%20now()%20-%2024h";
  getdata = function(url, succes){
    var xhr;
    console.log(succes);
    xhr = new XMLHttpRequest;
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200) {
        return succes(JSON.parse(xhr.responseText));
      } else {
        return succes([]);
      }
    };
    return xhr.send(null);
  };
  fetchData = function(){
    var result;
    result = [];
    return getdata(infoEndpoint, function(info){
      return getdata('hosp.json', function(addrmap){
        var i$, ref$, len$, point, hospital;
        for (i$ = 0, len$ = (ref$ = info[0].points).length; i$ < len$; ++i$) {
          point = ref$[i$];
          if (addrmap[point[3]]) {
            hospital = addrmap[point[3]];
            result.push({
              hospital: hospital,
              points: point
            });
          }
        }
        postMessage(result);
        return setTimeout(fetchData, 50000);
      });
    });
  };
  fetchData();
}).call(this);
