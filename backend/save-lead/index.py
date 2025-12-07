import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Сохраняет заявку клиента в базу данных
    Args: event - dict с httpMethod, body, headers
          context - объект с request_id, function_name и другими атрибутами
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
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
        body_data = json.loads(event.get('body', '{}'))
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute("""
            INSERT INTO t_p41703409_one_page_chat_landin.leads (
                name, phone, city, address, object_type, object_type_other,
                area, rooms, services, start_time, deadline, budget,
                materials_interest, consultation_type
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, created_at
        """, (
            body_data.get('name'),
            body_data.get('phone'),
            body_data.get('city'),
            body_data.get('address'),
            body_data.get('objectType'),
            body_data.get('objectTypeOther'),
            body_data.get('area'),
            body_data.get('rooms'),
            body_data.get('services', []),
            body_data.get('startTime'),
            body_data.get('deadline'),
            body_data.get('budget'),
            body_data.get('materialsInterest'),
            body_data.get('consultationType')
        ))
        
        lead_id, created_at = cur.fetchone()
        conn.commit()
        
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
                'leadId': lead_id,
                'createdAt': created_at.isoformat()
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
