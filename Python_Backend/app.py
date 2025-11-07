import os
import hashlib
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

# Secret key for signing tokens - will be set via environment variable
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# Hashed answers (SHA-256) - answers are NOT stored in plaintext
# These hashes cannot be reversed to get the original answers
PUZZLE_ANSWERS = {
    'puzzle1': hashlib.sha256('3'.encode()).hexdigest(),  # Simple counting
    'puzzle2': hashlib.sha256('PERSEUS'.upper().encode()).hexdigest(),  # Caesar cipher
    'puzzle3': hashlib.sha256('RED SKULL'.upper().encode()).hexdigest(),  # Vigenere
    'puzzle4': hashlib.sha256('MICROTECH'.upper().encode()).hexdigest(),  # Steganography
    'puzzle5': hashlib.sha256('AS-12'.upper().encode()).hexdigest(),  # Riddle hunt
}

def hash_answer(answer):
    """Hash an answer for comparison"""
    return hashlib.sha256(answer.upper().strip().encode()).hexdigest()

def generate_token(puzzle_number):
    """Generate a signed token for accessing a specific puzzle"""
    return serializer.dumps({'puzzle': puzzle_number})

def verify_token(token, required_puzzle):
    """Verify token and check if it grants access to the required puzzle"""
    try:
        data = serializer.loads(token, max_age=86400)  # 24 hour expiry
        return data.get('puzzle') == required_puzzle
    except (BadSignature, SignatureExpired):
        return False

@app.route('/')
def serve_react_app():
    """Serve the React app"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/verify-answer', methods=['POST'])
def verify_answer():
    """Verify a puzzle answer and return a token for the next puzzle"""
    data = request.get_json()
    puzzle_id = data.get('puzzle_id')
    answer = data.get('answer', '')
    
    if not puzzle_id or puzzle_id not in PUZZLE_ANSWERS:
        return jsonify({'success': False, 'message': 'Invalid puzzle'}), 400
    
    # Hash the submitted answer and compare
    answer_hash = hash_answer(answer)
    
    if answer_hash == PUZZLE_ANSWERS[puzzle_id]:
        # Get next puzzle number
        puzzle_num = int(puzzle_id.replace('puzzle', ''))
        next_puzzle = puzzle_num + 1
        
        # Generate token for next puzzle
        token = generate_token(next_puzzle)
        
        return jsonify({
            'success': True,
            'message': 'Correct!',
            'token': token,
            'next_puzzle': next_puzzle
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Incorrect answer. Try again.'
        })

@app.route('/api/verify-access', methods=['POST'])
def verify_access():
    """Verify if user has access to a specific puzzle via token"""
    data = request.get_json()
    token = data.get('token')
    puzzle_number = data.get('puzzle_number')
    
    # Puzzle 1 is always accessible
    if puzzle_number == 1:
        return jsonify({'success': True, 'has_access': True})
    
    if not token:
        return jsonify({'success': False, 'has_access': False, 'message': 'No access token provided'})
    
    # Verify token grants access to this puzzle
    has_access = verify_token(token, puzzle_number)
    
    return jsonify({
        'success': True,
        'has_access': has_access,
        'message': 'Access denied' if not has_access else 'Access granted'
    })

@app.route('/api/start', methods=['POST'])
def start_game():
    """Initialize game and return token for puzzle 1"""
    token = generate_token(1)
    return jsonify({
        'success': True,
        'token': token
    })

# Catch-all route to serve React app for any unmatched routes
@app.route('/<path:path>')
def serve_react_routes(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))