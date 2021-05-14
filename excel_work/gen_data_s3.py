#!/usr/bin/env python3                                                                       
# coding=utf8
import sys
import pandas as pd
import csv

offset = 0
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
  'k1': 19+offset,
  'k2': 20+offset,
  'k3': 21+offset,
  'k4': 22+offset,
  'c1': 19+offset
}



def excel2csv(excelfile, csvfile):
  print(excelfile, csvfile)
  df=pd.read_excel(excelfile, index_col=0)
  data=[]
  fieldname =['date','type','name','starttime','endtime','location','distance','birds','p1','p2','p3','p4',  'people', 'watchbirds', 'ebird','cancel','cancel_help']

  for i in range (3, df.shape[0]):
    
    # 例行    
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['name']]) and not pd.isnull(df.iat[i, idx['p1']]) and  df.iat[i, idx['p1']].strip() !='會員大會(不排)':
        tmpdate = (df.iat[i, idx['date']]+pd.DateOffset(years=years))
        #print(tmpdate,  df.iat[i, idx['name']],  df.iat[i, idx['start']],  df.iat[i, idx['location']],df.iat[i, idx['distance']], df.iat[i, idx['p1']], df.iat[i, idx['p2']], df.iat[i, idx['p3']], df.iat[i, idx['p4']])

        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '白頭翁' if  tmpdate.weekday()==3 else '例行' if tmpdate.weekday()==6 else '周末派',
            'name': df.iat[i, idx['name']].strip(),
            'starttime': df.iat[i, idx['start']].strftime('%H:%M'),
            'endtime': '12:00',
            'location': df.iat[i, idx['location']],
            'distance': df.iat[i, idx['distance']],
            'birds': df.iat[i, idx['birds']],
            'p1': df.iat[i, idx['p1']].strip(),
            'p2': df.iat[i, idx['p2']].strip(),
            'p3': df.iat[i, idx['p3']].strip(),
            'p4': df.iat[i, idx['p4']].strip(),
            'watchbirds': 0,
            'people': 0
        })
    
    # 關渡二樓
    
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['k1']]):
        tmpdate = (df.iat[i, idx['date']]+pd.DateOffset(years=years))
        #print(i, tmpdate,  df.iat[i, idx['k1']],  df.iat[i, idx['k2']],  df.iat[i, idx['k3']],  df.iat[i, idx['k4']])
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '關渡自然公園中心二樓',
            'starttime': '09:00',
            'endtime': '12:00',
            'p1': df.iat[i, idx['k1']].strip(),
            'p2': df.iat[i, idx['k2']].strip(),
        })
        if df.iat[i, idx['k3']].strip() != '*會員大會例行暫停1次':
            data.append({
                'date': (df.iat[i, idx['date']]+pd.DateOffset(years=years)).strftime('%Y/%m/%d'),
                'type': '駐站',
                'name': '關渡自然公園中心二樓',
                'starttime': '14:00',
                'endtime': '17:00',
                'p1': df.iat[i, idx['k3']].strip(),
                'p2': df.iat[i, idx['k4']].strip(),
            })

    if 0:
        # 賞鳥趣
        if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['s1']]):
            #print(i, df.iat[i, idx['date']],  df.iat[i, 25],  df.iat[i, 26])
            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '賞鳥趣',
                'name': '關渡自然公園中心',
                'starttime': '14:00',
                'endtime': '17:00',
                'p1': df.iat[i, idx['s1']].strip(),
                'p2': df.iat[i, idx['s2']].strip(),
            })
    
    # 芝山
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['c1']]) and type(df.iat[i, idx['c1']]) != int :
        tmpdate = (df.iat[i, idx['date']]+pd.DateOffset(years=years))
        #print(i, df.iat[i, idx['date']],  df.iat[i, idx['c1']] )
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '芝山綠園',
            'starttime': '14:00',
            'endtime': '17:00',
            'p1': df.iat[i, idx['c1']].strip(),
        })
    

    # 大安森林公園
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['d1']]) and not pd.isnull(df.iat[i, idx['d2']]):
        tmpdate = (df.iat[i, idx['date']]+pd.DateOffset(years=years))
        #print(i, df.iat[i, idx['date']],  df.iat[i, idx['d1']],  df.iat[i, idx['d2']],  df.iat[i, idx['d3']],  df.iat[i, idx['d4']])
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '大安森林公園',
            'starttime': '08:30',
            'endtime': '11:30',
            'p1': df.iat[i, idx['d1']].strip(),
            'p2': df.iat[i, idx['d2']].strip(),
        })

        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '大安森林公園',
            'starttime': '13:30',
            'endtime': '16:30',
            'p1': df.iat[i, idx['d3']].strip(),
            'p2': df.iat[i, idx['d4']].strip(),
        })
    if 0:
        # 華江雁鴨公園
        if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['h1']]):
            #print(i, df.iat[i, idx['date']],  df.iat[i, 17],  df.iat[i, 18],  df.iat[i, 19],  df.iat[i, 20])
            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '駐站',
                'name': '華江雁鴨公園',
                'starttime': '08:30',
                'endtime': '11:30',
                'p1': df.iat[i, idx['h1']].strip(),
                'p2': df.iat[i, idx['h2']].strip(),
            })

            data.append({
                'date': tmpdate.strftime('%Y/%m/%d'),
                'type': '駐站',
                'name': '華江雁鴨公園',
                'starttime': '13:30',
                'endtime': '16:30',
                'p1': df.iat[i, idx['h3']].strip(),
                'p2': df.iat[i, idx['h4']].strip(),
            })

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