const through = require('through2');
const PluginError = require('plugin-error');
const jSmart = require('jsmart');

/**
 * Copernica Database structure
 */
var _DB = {
	"Profiles": [],
	"Content": [],
	"Tiles": []
};

/**
 * Custom functions
 */
jSmart.prototype.registerPlugin(
    'function',
    'loadprofile',
    function (params, data) {
        let tmp = _DB[params["source"]][0];

        if (params["ArticleId"]) {
            let found = _DB[params["source"]].find(function (obj) {
                return obj["ArticleId"] == params["ArticleId"];
            });

            if (found) {
                tmp = found;
            }
        }

        if (params["assign"]) {
            data[params["assign"]] = tmp;
        }

        return '';
    }
);

jSmart.prototype.registerPlugin(
    'function',
    'base64_encode',
    function(params, data) {
        return Buffer.from(params[0]).toString('base64');
    }
);

/**
 * Custom modifiers
 */
jSmart.prototype.registerPlugin(
    'modifier',
    'explode',
    function (s, str) {
        return str.split(s);
    }
);

jSmart.prototype.registerPlugin(
    'modifier',
    'strpos',
    function (s, find) {
        return s.indexOf(find);
    }
);

jSmart.prototype.registerPlugin(
    'modifier',
    'substr',
    function (s, from, to) {
        return s.substr(from, to);
    }
);

jSmart.prototype.registerPlugin(
    'modifier',
    'replace',
    function (s, search, replace) {
        return s.replace(search, replace)
    }
);

module.exports = function (options) {
		if (!options) {
			options = {};
		}

    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
        this.emit('error', new PluginError('gulp-jsmart-copernica', 'Streaming not supported'));
        return cb();
        }

        if (file.data) {
            _DB = file.data;
				}

				var profileData = {}

				if (options.profileId) {
					profileData = _DB["Profiles"][options.profileId];
				} else {
					profileData = _DB["Profiles"][0];
				}

        let filePath = file.path;

        try {
            let compiledTemplate = new jSmart(file.contents.toString())
            file.contents = Buffer.from(compiledTemplate.fetch(profileData));

            this.push(file);
            cb();
        } catch (err) {
            this.emit('error', new PluginError('gulp-copernica', err, {fileName: filePath}));
            cb();
        }
    });
}
