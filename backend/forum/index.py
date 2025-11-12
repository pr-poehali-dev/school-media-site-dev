import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: School forum API - get topics, replies, create new posts
    Args: event with httpMethod (GET/POST), body, queryStringParameters
    Returns: HTTP response with forum data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cursor = conn.cursor()
    
    if method == 'GET':
        action = event.get('queryStringParameters', {}).get('action', 'topics')
        
        if action == 'topics':
            category = event.get('queryStringParameters', {}).get('category')
            
            if category and category != 'all':
                query = "SELECT id, title, author, category, emoji, views, created_at FROM forum_topics WHERE category = %s ORDER BY created_at DESC"
                cursor.execute(query, (category,))
            else:
                query = "SELECT id, title, author, category, emoji, views, created_at FROM forum_topics ORDER BY created_at DESC"
                cursor.execute(query)
            
            topics = []
            for row in cursor.fetchall():
                cursor.execute("SELECT COUNT(*) FROM forum_replies WHERE topic_id = %s", (row[0],))
                replies_count = cursor.fetchone()[0]
                
                topics.append({
                    'id': row[0],
                    'title': row[1],
                    'author': row[2],
                    'category': row[3],
                    'emoji': row[4],
                    'views': row[5],
                    'replies': replies_count,
                    'created_at': row[6].isoformat() if row[6] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'topics': topics}),
                'isBase64Encoded': False
            }
        
        elif action == 'replies':
            topic_id = event.get('queryStringParameters', {}).get('topic_id')
            
            if not topic_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'topic_id required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("UPDATE forum_topics SET views = views + 1 WHERE id = %s", (topic_id,))
            
            cursor.execute(
                "SELECT id, author, content, likes, created_at FROM forum_replies WHERE topic_id = %s ORDER BY created_at ASC",
                (topic_id,)
            )
            
            replies = []
            for row in cursor.fetchall():
                replies.append({
                    'id': row[0],
                    'author': row[1],
                    'content': row[2],
                    'likes': row[3],
                    'created_at': row[4].isoformat() if row[4] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'replies': replies}),
                'isBase64Encoded': False
            }
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'create_topic':
            title = body_data.get('title')
            author = body_data.get('author')
            category = body_data.get('category')
            emoji = body_data.get('emoji', '💬')
            
            if not all([title, author, category]):
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'title, author, category required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "INSERT INTO forum_topics (title, author, category, emoji) VALUES (%s, %s, %s, %s) RETURNING id",
                (title, author, category, emoji)
            )
            topic_id = cursor.fetchone()[0]
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'topic_id': topic_id, 'message': 'Topic created'}),
                'isBase64Encoded': False
            }
        
        elif action == 'create_reply':
            topic_id = body_data.get('topic_id')
            author = body_data.get('author')
            content = body_data.get('content')
            
            if not all([topic_id, author, content]):
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'topic_id, author, content required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "INSERT INTO forum_replies (topic_id, author, content) VALUES (%s, %s, %s) RETURNING id",
                (topic_id, author, content)
            )
            reply_id = cursor.fetchone()[0]
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'reply_id': reply_id, 'message': 'Reply created'}),
                'isBase64Encoded': False
            }
        
        elif action == 'like':
            reply_id = body_data.get('reply_id')
            
            if not reply_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'reply_id required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("UPDATE forum_replies SET likes = likes + 1 WHERE id = %s", (reply_id,))
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Liked'}),
                'isBase64Encoded': False
            }
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
