try:
    from configparser import ConfigParser
except ImportError:
    from ConfigParser import ConfigParser
import json

def load_configuration(location, formatting):
    if formatting=="CFG":
        c=ConfigParser
    
