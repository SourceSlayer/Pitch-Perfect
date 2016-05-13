#!/usr/bin/env python

from pitchperfect import app, storage
from argparse import ArgumentParser
from configuration_loader import load_configuration, create_settings_object

if __name__=="__main__":
    parser=ArgumentParser()
    parser.add_argument("--debug", "-d", action="store_true", help="Tells Flask to run app in debug mode.", default=True)
    parser.add_argument("--production", "-p", action="store_false", help="Tells Flask to run app outside of debug mode.", default=False, dest="debug")
    parser.add_argument("--host", "-a", action="store", help="Tells the server what host to run on, in the form \"address:port.\" E.g. 0.0.0.0:80", default="127.0.0.1:5000")
    parser.add_argument("--config", "-c", action="store", dest="configuration-file", type=open, help="Sets the location of the configuration file, unless otherwise specified, it will default to the file format, or cfg. E.g. /some/file.cfg", default=storage.directory+"/settings.cfg")
    parser.add_argument("--config-format", action="store", dest="config-format", help="Specifies the format of the configuration file, out of \"CFG\", \"JSON\" or \"PY\" (be careful with this).", default="CFG")
    arguments=vars(parser.parse_args())
    print(arguments)
    host=arguments["host"].split(":")
    host, port=host[0], int(host[1])
    #app.config.from_object(load_configuration(arguments["configuration-file"], arguments["config-format"]))
    app.config.from_pyfile("settings.cfg")
    app.run(debug=arguments["debug"], host=host, port=port)
