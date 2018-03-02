var dateFormat = require('dateformat');

module.exports.getLastLeads = (connection, options, callback) => {

    var fn_options = {
        limit: 10,
        dateFrom: dateFormat(new Date(), 'yyyy-mm-dd 00:00:00'),
        dateTo: dateFormat(new Date(), 'yyyy-mm-dd 23:59:59')
    }

    if(typeof options === 'object') {
        if(options.limit) fn_options.limit = options.limit;
        if(options.dateFrom) fn_options.dateFrom = options.dateFrom;
        if(options.dateTo) fn_options.dateTo = options.dateTo;
    }

    var leadString = "SELECT * FROM leads where email IS NOT NULL AND last_active > '"+ fn_options.dateFrom +"' AND last_active < '"+ fn_options.dateTo +"' ORDER BY points DESC LIMIT " + fn_options.limit;

    connection.query(leadString, (err, results, fields) => {
        if(err) throw err;
        var leads = [];
        var lead_count = results.length;

        results.forEach( lead => {
                lead_info = {
                    firstname: lead.firstname,
                    lastname: lead.lastname,
                    email: lead.email,
                    phone: lead.phone,
                    position: lead.position,
                    company: lead.company,
                    city: lead.city,
                    points: lead.points,
                    website: lead.website,
                    profile_url: require('../config').mautic_url + "s/contacts/view/" + lead.id
                }

                leads.push(lead_info);
                lead_count--;
                if(lead_count <= 0) callback(null, leads);
                
            } 
        );
    
    });
}




