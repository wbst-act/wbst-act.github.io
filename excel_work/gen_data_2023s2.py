#!/usr/bin/env python3                                                                       
# coding=utf8
import sys
import pandas as pd
import csv
import datetime
offset = 2
years=0
idx={
  'date': 0,
  'name': 2,
  'start': 3,
  'location': 4+offset,
  'distance': 5+offset,
  'birds': 6+offset,
  'p1': 7+offset,
  'p2': 8+offset,
  'p3': 9+offset,
  'p4': 10+offset,
  'd1': 11+offset,
  'd2': 12+offset,
  'd3': 13+offset,
  'd4': 14+offset,
  'h1': 13+offset,
  'h2': 14+offset,
  'k1': 15+offset,
  'k2': 16+offset,
  'k3': 17+offset,
  'k4': 18+offset,
  's1': 19+offset,
  's2': 20+offset,
  'c1': 21+offset
}

A=1
K=1
S=1
H=1
C=1
D=1

def excel2csv(excelfile, csvfile):
  print(excelfile, csvfile)
  df=pd.read_excel(excelfile, index_col=0)
  data=[]
#   fieldname =['date','type','name','starttime','endtime','location','distance','birds','p1','p2','p3','p4',  'people', 'watchbirds', 'ebird','cancel','cancel_help']
  fieldname =['date','type','name','ebird','people','watchbirds','p1','p2','p3','p4','starttime','endtime','location','bus', 'distance','birds',]
  df.fillna('', inplace=True)
  for i in range (6, df.shape[0]):
    if type(df.iat[i, idx['date']]) != str:
        tmpdate = (df.iat[i, idx['date']]+pd.DateOffset(years=years))
    else:
        continue
    # 例行    
    if A:
        if  df.iat[i, idx['name']]!='' and (df.iat[i, idx['p1']] !='' or df.iat[i, idx['p2']] !='') :
            
            print(tmpdate,  df.iat[i, idx['name']],  df.iat[i, idx['start']],  df.iat[i, idx['location']],df.iat[i, idx['distance']], df.iat[i, idx['p1']], df.iat[i, idx['p2']], df.iat[i, idx['p3']], df.iat[i, idx['p4']])
            
            if df.iat[i, idx['location']].find('(公車')>0:
                location = df.iat[i, idx['location']][:df.iat[i, idx['location']].find('(公車')]
                bus = df.iat[i, idx['location']][df.iat[i, idx['location']].find('(公車')+1:-1]
            else:
                location = df.iat[i, idx['location']]
                bus = ''

            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '白頭翁' if  tmpdate.weekday()==3 else '例行' if tmpdate.weekday()==6 else '周末派',
                'name': df.iat[i, idx['name']],
                'starttime': df.iat[i, idx['start']].strftime('%H:%M'),
                'endtime': '12:00',
                'location': location,
                'distance': df.iat[i, idx['distance']],
                'bus': bus,
                'birds': df.iat[i, idx['birds']],
                'p1': df.iat[i, idx['p1']],
                'p2': df.iat[i, idx['p2']],
                'p3': df.iat[i, idx['p3']],
                'p4': df.iat[i, idx['p4']],
                
            })
    
    # 關渡二樓
    if K:
        if ( df.iat[i, idx['k1']]!='' or df.iat[i, idx['k2']]!=''):
            
            print(i, tmpdate,  df.iat[i, idx['k1']],  df.iat[i, idx['k2']],  df.iat[i, idx['k3']],  df.iat[i, idx['k4']])
            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '駐站',
                'name':  '關渡自然公園中心二樓' if  df.iat[i, idx['date']] > datetime.datetime(2023, 6, 1) else '關渡自然公園 月池平台/2號賞鳥小屋',
                'starttime': '09:00',
                'endtime': '12:00',
                'p1': df.iat[i, idx['k1']],
                'p2': df.iat[i, idx['k2']],
            })
            
            data.append({
                'date': (df.iat[i, idx['date']]+pd.DateOffset(years=years)).strftime('%Y/%m/%d'),
                'type': '駐站',
                'name':  '關渡自然公園中心二樓' if  df.iat[i, idx['date']] > datetime.datetime(2023, 6, 1) else '關渡自然公園 月池平台/2號賞鳥小屋',
                'starttime': '14:00',
                'endtime': '17:00',
                'p1': df.iat[i, idx['k3']],
                'p2': df.iat[i, idx['k4']],
            })

    if S:
        # 賞鳥趣
        if df.iat[i, idx['date']] < datetime.datetime(2023, 5, 1):
            print(i, df.iat[i, idx['date']],  df.iat[i, idx['s1']],  df.iat[i, idx['s2']])
            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '賞鳥趣',
                'name': '關渡自然公園 月池平台/2號賞鳥小屋',
                'starttime': '14:00',
                'endtime': '17:00',
                'p1': df.iat[i, idx['s1']],
                'p2': df.iat[i, idx['s2']],
            })
    
    # 芝山
    if C:
        if df.iat[i, idx['d1']]!='' or df.iat[i, idx['d2']]!='' :
            tmpdate = (df.iat[i, idx['date']]+pd.DateOffset(years=years))
            print(i, df.iat[i, idx['date']],  df.iat[i, idx['c1']] )
            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '駐站',
                'name': '芝山綠園',
                'starttime': '14:00',
                'endtime': '17:00',
                'p1': df.iat[i, idx['c1']],
            })
    

    # 大安森林公園
    if D:
        if df.iat[i, idx['d1']]!='' or df.iat[i, idx['d2']]!='' :
            tmpdate = (df.iat[i, idx['date']]+pd.DateOffset(years=years))
            print(i, df.iat[i, idx['date']],  df.iat[i, idx['d1']],  df.iat[i, idx['d2']])
            # data.append({
            #     'date': tmpdate.strftime('%Y/%m/%d'),
            #     'type': '駐站',
            #     'name': '大安森林公園',
            #     'starttime': '08:30',
            #     'endtime': '11:30',
            #     'p1': df.iat[i, idx['d1']],
            #     'p2': df.iat[i, idx['d2']],
            # })

            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '駐站',
                'name': '大安森林公園',
                'starttime': '13:30',
                'endtime': '16:30',
                'p1': df.iat[i, idx['d1']],
                'p2': df.iat[i, idx['d2']],
            })
    if H:
        # 華江雁鴨公園
        if df.iat[i, idx['date']] < datetime.datetime(2023, 5, 1) and (df.iat[i, idx['h1']]!='' or df.iat[i, idx['h2']]!=''):
            #print(i, df.iat[i, idx['date']],  df.iat[i, 17],  df.iat[i, 18],  df.iat[i, 19],  df.iat[i, 20])
            print(i, df.iat[i, idx['date']],  df.iat[i, idx['h1']],  df.iat[i, idx['h2']])
            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '駐站',
                'name': '華江雁鴨公園',
                'starttime': '08:30',
                'endtime': '11:30',
                'p1': df.iat[i, idx['h1']],
                'p2': df.iat[i, idx['h2']],
            })

            # data.append({
            #     'date': tmpdate.strftime('%Y/%m/%d'),
            #     'type': '駐站',
            #     'name': '華江雁鴨公園',
            #     'starttime': '13:30',
            #     'endtime': '16:30',
            #     'p1': df.iat[i, idx['h3']],
            #     'p2': df.iat[i, idx['h4']],
            # })

  with open(csvfile, 'w', encoding='UTF8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldname)
    writer.writeheader()
    writer.writerows(data)



if __name__ == '__main__':
  if len(sys.argv) < 3:
    print("gendata.py 例行.xlsx, 例行.csv")
    sys.exit()
  excelfile = sys.argv[1]
  csvfile = sys.argv[2]
  
  if sys.argv==4 and sys.argv[3]:
    offset = int(sys.argv[3])
  excel2csv(excelfile, csvfile)