from pymongo import MongoClient
def get_db_handle(db_name, host):
    client = MongoClient(host)
    db_handle = client.get_database(db_name)
    return db_handle, client
def get_collection_handle(db_handle,collection_name):
    records=db_handle[collection_name]
    return records