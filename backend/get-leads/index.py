import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает список всех заявок из базы данных
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response dict со списком заявок
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        params = event.get('queryStringParameters') or {}
        limit = int(params.get('limit', 50))
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute("""
            SELECT 
                id, name, phone, city, address, object_type, object_type_other,
                area, rooms, services, start_time, deadline, budget,
                materials_interest, consultation_type, created_at
            FROM t_p41703409_one_page_chat_landin.leads
            ORDER BY created_at DESC
            LIMIT %s
        """, (limit,))
        
        columns = [desc[0] for desc in cur.description]
        leads = []
        
        for row in cur.fetchall():
            lead = dict(zip(columns, row))
            lead['created_at'] = lead['created_at'].isoformat() if lead['created_at'] else None
            leads.append(lead)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'leads': leads,
                'total': len(leads)
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
