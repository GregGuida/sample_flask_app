import os
from sqlalchemy import create_engine
engine = create_engine(os.environ['DATABASE_URL'], echo=True)
from sqlalchemy import Table, Column, Integer, String, Float, Text, MetaData
metadata = MetaData()

favorite_locations_table = Table('favorite_locations', metadata,
  Column('id', Integer, primary_key=True),
  Column('lat', Float),
  Column('lng', Float),
  Column('name', String),
  Column('address', Text)
)
metadata.create_all(engine)
