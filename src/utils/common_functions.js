export function formatObjToURL(obj) {
    let qs = "";
    for (let key in obj) {
      if (qs !== "") {
        qs += "&";
      }
      qs += key + "=" + obj[key];
    }
    return qs;
}

export function getUrlVars(location) {
  var vars = {};
  location.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}