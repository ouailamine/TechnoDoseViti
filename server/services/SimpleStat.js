class SimpleStat{

    static asc = arr => arr.sort((a, b) => a - b);

    static sum = arr => arr.reduce((a, b) => a + b, 0);

    static mean = arr => Math.round((this.sum(arr) / arr.length)*100)/100.0;

    // sample standard deviation
    static std = (arr) => {
        const mu = this.mean(arr);
        const diffArr = arr.map(a => (a - mu) ** 2);
        return Math.round((Math.sqrt(this.sum(diffArr) / (arr.length)))*100)/100.0;
    };

    static quantile = (arr, q, isSorted =false) => {
        const sorted = isSorted? arr:this.asc(arr);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };

    static filteredPercentil = (arr, p, isSorted =false) => {
        const sorted = isSorted? arr:this.asc(arr);

        const valP005 =  this.quantile(sorted,0.05,true) ;
        const valP095 =  this.quantile(sorted,0.95,true) ;

        const sortedFiltered = sorted.filter(function(value,index,array){return value >= valP005 && value <= valP095})

        const pos = (sortedFiltered.length - 1) * p;
        const base = Math.floor(pos);
        const rest = pos - base;
        let val = 0
        if (sortedFiltered[base + 1] !== undefined) {
            val = sortedFiltered[base] + rest * (sortedFiltered[base + 1] - sortedFiltered[base])
        } else {
            val = sortedFiltered[base]
        }

        val = Math.round(val * 100)/100.0
        return val;

    };



}
module.exports = SimpleStat;