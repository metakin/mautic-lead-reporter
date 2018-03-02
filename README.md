# Lead Reporter with Email for Mautic

### Installation
First, install required packages with npm:
    
    $ cd /path/to/mautic-lead-reporter
    $ npm install
    
After installation, edit configuration file:
  
    $ nano /path/to/config.json
 
Finally run: 
  
    $ node index.js -l 50
    
### Usage

     Usage: index [options]
     Options:

    -V, --version        output the version number
    -l, --limit <limit>  count of leads
    -f, --from <from>    date from: filtering by last active time. (yyyy-mm-dd h:i:s)
    -t, --to <to>        date to: Filtering by last active time. (yyyy-mm-dd h:i:s)
    -h, --help           output usage information
