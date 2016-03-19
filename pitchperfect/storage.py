from flask.ext.sqlalchemy import SQLAlchemy
from os.path import splitext, dirname, realpath

database=SQLAlchemy()

directory=dirname(realpath(__file__))

#def find_format(name, fallback, extensions=[]):
#    extension=splitext(name)[-1].upper()
#    return extension if extension in extensions else fallback
