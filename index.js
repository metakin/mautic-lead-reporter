const config = require('./config');
const mysql = require('mysql');
const commander = require('commander');

commander.version('1.0.1').option('-l, --limit <limit>', 'count of leads')
                        .option('-f, --from <from>', 'date from: Filtering by last active time. (yyyy-mm-dd h:i:s)')
                        .option('-t, --to <to>', 'date To: Filtering by last active time. (yyyy-mm-dd h:i:s)')
                        .parse(process.argv);

var connection = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    port: config.db_port
});

connection.connect( err => {
    if(err) console.log('error connecting: %s', err.stack);
    var leads = require('./mods/leads');
    var options = {};
    
    if(commander.limit) options.limit = commander.limit;
    if(commander.from) options.dateFrom = commander.from;
    if(commander.to) options.dateTo = commander.to;

    leads.getLastLeads(connection, options, (err, leads) => {
        var template = require('./mods/template');
        template.generateMail(leads, (err, rendered) => {
            if(err) throw err;
            template.sendMail(rendered);
        });
    });
  } 
);




