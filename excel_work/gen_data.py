#!/usr/bin/env python3
# coding=utf8
import sys
import pandas as pd
import csv

offset = 2
idx={
  'date': 1,
  'name': 2,
  'start': 3,
  'watchbirds': 5,
  'people': 6,
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
  'h1': 15+offset,
  'h2': 16+offset,
  'h3': 17+offset,
  'h4': 18+offset,
  'k1': 19+offset,
  'k2': 20+offset,
  'k3': 21+offset,
  'k4': 22+offset,
  's1': 23+offset,
  's2': 24+offset,
  'c1': 25+offset
}



def excel2csv(excelfile, csvfile):
  print(excelfile, csvfile)
  df=pd.read_excel(excelfile, index_col=0)
  data=[]
  fieldname =['date','type','name','ebird','people','watchbirds','p1','p2','p3','p4','starttime','endtime','location','bus', 'distance','birds',]

  for i in range (4, df.shape[0]):
    # 例行
    if df.iat[i, 2]=='星期':
        continue
    tmpdate = (df.iat[i, idx['date']])
    print(tmpdate)
    print(df.iat[i,idx['name']])
    if type(df.iat[i, idx['date']]) != str and \
        not pd.isnull(df.iat[i, idx['name']]) and \
        not pd.isnull(df.iat[i, idx['p1']]) and  \
            df.iat[i, idx['p1']].strip() !='會員大會(不排)':
        print( tmpdate.weekday(),
              tmpdate,  
              df.iat[i, idx['name']],  
              df.iat[i, idx['start']],  
              df.iat[i, idx['location']],
              df.iat[i, idx['distance']], 
              df.iat[i, idx['p1']], 
              df.iat[i, idx['p2']], 
              df.iat[i, idx['p3']], 
              df.iat[i, idx['p4']])
        

        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '白頭翁' if  tmpdate.weekday()==3 else '例行' if tmpdate.weekday()==6 else '周末派',
            'name': df.iat[i, idx['name']].strip(),
            'starttime': df.iat[i, idx['start']].strftime('%H:%M'),
            'endtime': '12:00',
            'location': df.iat[i, idx['location']],
            'distance': df.iat[i, idx['distance']],           
            'birds': df.iat[i, idx['birds']],
            'p1': '' if type(df.iat[i, idx['p1']])==float else df.iat[i, idx['p1']].strip(),
            'p2': '' if type(df.iat[i, idx['p2']])==float else df.iat[i, idx['p2']].strip(),
            'p3': '' if type(df.iat[i, idx['p3']])==float else df.iat[i, idx['p3']].strip(),
            'p4': '' if type(df.iat[i, idx['p4']])==float else df.iat[i, idx['p4']].strip()            
        })

    # 關渡二樓
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['k1']]):
        print('關渡二樓',i, df.iat[i, idx['date']],  df.iat[i, idx['k1']],  df.iat[i, idx['k2']],  df.iat[i, idx['k3']],  df.iat[i, idx['k4']])
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '關渡自然公園中心二樓',
            'starttime': '09:00',
            'endtime': '12:00',
            'p1':'' if type(df.iat[i, idx['k1']])==float else  df.iat[i, idx['k1']].strip(),
            'p2':'' if type(df.iat[i, idx['k2']])==float else  df.iat[i, idx['k2']].strip(),
        })
        # if df.iat[i, idx['k3']].strip() != '*會員大會例行暫停1次':
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '關渡自然公園中心二樓',
            'starttime': '14:00',
            'endtime': '17:00',
            'p1': '' if type(df.iat[i, idx['k3']])==float else df.iat[i, idx['k3']].strip(),
            'p2': '' if type(df.iat[i, idx['k4']])==float else df.iat[i, idx['k4']].strip(),
        })


    # 賞鳥趣
    
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['s1']]):
        print('賞鳥趣', df.iat[i, idx['date']],  df.iat[i, idx['s1']],  df.iat[i, idx['s2']])
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '賞鳥趣',
            'name': '關渡自然公園中心',
            'starttime': '14:00',
            'endtime': '17:00',
            'p1': '' if type(df.iat[i, idx['s1']])==float else df.iat[i, idx['s1']].strip(),
            'p2': '' if type(df.iat[i, idx['s2']])==float else df.iat[i, idx['s2']].strip(),
        })
    
    # 芝山
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['c1']]) and type(df.iat[i, idx['c1']]) != int :
        print('芝山', i, df.iat[i, idx['date']],  df.iat[i, idx['c1']] )
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '芝山綠園',
            'starttime': '14:00',
            'endtime': '17:00',
            'p1': '' if type(df.iat[i, idx['c1']])==float else df.iat[i, idx['c1']].strip(),
        })


    # 大安森林公園
    #if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['d1']]) and not pd.isnull(df.iat[i, idx['d2']]):
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['d1']]) and not pd.isnull(df.iat[i, idx['d2']])and not pd.isnull(df.iat[i, idx['d3']]) and not pd.isnull(df.iat[i, idx['d4']]):
        print('大安',i, df.iat[i, idx['date']],  df.iat[i, idx['d1']],  df.iat[i, idx['d2']],  df.iat[i, idx['d3']],  df.iat[i, idx['d4']])
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '大安森林公園',
            'starttime': '08:30',
            'endtime': '11:30',
            'p1': '' if type(df.iat[i, idx['d1']])==float else df.iat[i, idx['d1']].strip(),
            'p2': '' if type(df.iat[i, idx['d2']])==float else df.iat[i, idx['d2']].strip(),
        })

        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '大安森林公園',
            'starttime': '13:30',
            'endtime': '16:30',
            'p1': '' if type(df.iat[i, idx['d3']])==float else df.iat[i, idx['d3']].strip(),
            'p2': '' if type(df.iat[i, idx['d4']])==float else df.iat[i, idx['d4']].strip(),
        })

    # 華江雁鴨公園
    # if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['h1']]):
    if type(df.iat[i, idx['date']]) != str and not pd.isnull(df.iat[i, idx['d1']]) and not pd.isnull(df.iat[i, idx['d2']])and not pd.isnull(df.iat[i, idx['d3']]) and not pd.isnull(df.iat[i, idx['d4']]):
        print('華江',i, df.iat[i, idx['date']],  df.iat[i, idx['h1']],  df.iat[i, idx['h2']],  df.iat[i, idx['h3']],  df.iat[i, idx['h4']])
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '華江雁鴨公園',
            'starttime': '08:30',
            'endtime': '11:30',
            'p1': '' if type(df.iat[i, idx['h1']])==float else df.iat[i, idx['h1']].strip(),
            'p2': '' if type(df.iat[i, idx['h2']])==float else  df.iat[i, idx['h2']].strip(),
        })

        '''暫停
        data.append({
            'date': tmpdate.strftime('%Y/%m/%d'),
            'type': '駐站',
            'name': '華江雁鴨公園',
            'starttime': '13:30',
            'endtime': '16:30',
            'p1': df.iat[i, idx['h3']].strip(),
            'p2': df.iat[i, idx['h4']].strip(),
        })
        '''

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
