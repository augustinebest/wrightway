const jwt = require('jsonwebtoken');


exports.uuid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (var i=0; i<3; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    let idNo = text;
    return idNo;
}

exports.getToken = (idNo, email) => {
    const token = jwt.sign({
        idNo: idNo,
        email: email
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '24h'
    }
    )
    return token;
}

exports.checkAuth = (req, res, next) => {
    try {
        const token = req.body.token || req.params.token || req.headers.token || req.headers.authorization.split(" ")[1];
        // console.log('from backend', token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log('decoded',decoded);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.json({
            message: 'Auth Failed!',
            code: 90
        })
    }
}

exports.formatDaysDate = (date) => {
    // console.log(date);
    const d = date;
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const n = weekday[d.getDay()];
    // console.log(n)
    return n;
}

exports.formatMonthDate = (date) => {
    // console.log(date);
    const d = date;
    var weekday = new Array(12);
    weekday[0] = "January";
    weekday[1] = "February";
    weekday[2] = "March";
    weekday[3] = "April";
    weekday[4] = "May";
    weekday[5] = "June";
    weekday[6] = "July";
    weekday[7] = "August";
    weekday[8] = "September";
    weekday[9] = "October";
    weekday[10] = "November";
    weekday[11] = "December";
    const m = weekday[d.getMonth()];
    // console.log(m)
    return m;
}