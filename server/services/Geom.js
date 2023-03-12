
class Geom{

    static convexHull (points) {
        points.sort( (a, b) => {
            return a.lat != b.lat ? a.lat - b.lat : a.lng - b.lng;
        });

        var n = points.length;
        var hull = [];

        for (var i = 0; i < 2 * n; i++) {
            var j = i < n ? i : 2 * n - 1 - i;
            while (hull.length >= 2 && this.removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j]))
                hull.pop();
            hull.push(points[j]);
        }

        // hull.pop();
        return hull;
    }

    static removeMiddle  (a, b, c)  {
        var cross = (a.lat - b.lat) * (c.lng - b.lng) - (a.lng - b.lng) * (c.lat - b.lat);
        var dot = (a.lat - b.lat) * (c.lat - b.lat) + (a.lng - b.lng) * (c.lng - b.lng);
        return cross < 0 || cross == 0 && dot <= 0;
    }

    static distance(p1, p2) {
        const lat1 = p1.lat; 
        const lon1 = p1.lng
        const lat2 = p2.lat 
        const lon2 =p2.lng
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
             dist = dist * 1.609344 *1000  // in meters
            // { dist = dist * 0.8684 }
            return dist;
        }
    }
};

module.exports = Geom;