from django.shortcuts import render
from rest_framework import viewsets
from first_app.models import orders
from first_app.serializers import orderserializer
from first_app.utils import get_db_handle, get_collection_handle
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
import json
import numpy as np
import pandas as pd
class ordersviewset(APIView):
    queryset= orders.objects.all()
    print(queryset)
    serializer_class = orderserializer
    db_handle, mongo_client = get_db_handle("SACHIVALAYA_CANTEEN",'mongodb+srv://ShahKandarp:shahkandarp2430@cluster0.bfs094s.mongodb.net/SACHIVALAYA_CANTEEN?retryWrites=true&w=majority')
    collection_handle = get_collection_handle(db_handle, 'orders')
    data=list(collection_handle.find())
    data1=pd.DataFrame(data)
    data1.to_csv('file1.csv')
    collection_handle = get_collection_handle(db_handle, 'dishes')
    data=list(collection_handle.find())
    data1=pd.DataFrame(data)
    data1.to_csv('file2.csv')

    def get(self, request, format=None):
        orders = pd.read_csv("file1.csv")
        dishes = pd.read_csv("file2.csv")
        orders=orders.drop(['Unnamed: 0','_id','otp','button','userId','paymentmode','__v','createdAt','updatedAt','price'],axis=1)
        dishes['dishId']=dishes['_id']
        dishes=dishes.drop(['Unnamed: 0','_id','imageUrl','isAvailable','quantity','noOfRating','__v','priceId','prodId'],axis=1)
        def extract_dish_data(list_of_dicts):
            dishId = []
            qty = []
            for dish_dict in eval(list_of_dicts):
                dishId.append(dish_dict['dishId'])
                qty.append(dish_dict['qty'])
            return pd.Series([dishId, qty], index=['dishId', 'qty'])

        dish_data = orders['items'].apply(extract_dish_data)
        orders = pd.concat([orders, dish_data], axis=1)
        orders.drop('items', axis=1, inplace=True)
        orders = orders.explode(['dishId','qty'])
        function={'qty':'sum','status':'first'}
        newdata=orders.groupby(orders['dishId'],as_index=False).aggregate(function)
        newdata=pd.merge(newdata, dishes, on='dishId',)
        newdata2=newdata.sort_values(by='qty',ascending=False,kind='mergesort')
        high=newdata2.iloc[0].tolist()[4]
        top5={}
        for i in range(5):
            top5[i+1] = newdata2.iloc[i].tolist()[4]
        revenue = 0
        for index, data in newdata.iterrows():
            if data['status'] == "COMPLETED":
                revenue += data['price']*data['qty']
            else:
                newdata.drop(index, axis=0, inplace=True)
        # new=newdata2.drop(['dishId','price','rating'],axis=1)
        # function={'category':'first','qty':'sum','name':'count'}
        # new=new.groupby(new['category'],as_index=False).aggregate(function)
        values1 = newdata['qty'].values.tolist()
        values2 = newdata['name'].values.tolist()
        graph = [{"name": name, "qty": qty} for name, qty in zip(values2, values1)]
       

        output={'revenue':revenue,
                'Highest Selling':high,
                'Top 5:':top5,
                'Graph':graph,
            }
        return Response(output)
# collection_handle.insert({...})
# collection_handle.update({...})