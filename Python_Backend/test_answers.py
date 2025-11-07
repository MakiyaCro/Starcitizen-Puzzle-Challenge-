#!/usr/bin/env python3
"""
Test script to verify puzzle answers and generate new hashes
"""

import hashlib

def hash_answer(answer):
    """Hash an answer the same way the app does"""
    return hashlib.sha256(answer.upper().strip().encode()).hexdigest()

def verify_puzzles():
    """Verify all puzzle answers match their hashes"""
    
    # Expected answers
    answers = {
        'puzzle1': '3',
        'puzzle2': 'PERSEUS',
        'puzzle3': 'RED SKULL',
        'puzzle4': 'MICROTECH',
        'puzzle5': 'AS-12',
    }
    
    # Hashes from app.py
    expected_hashes = {
        'puzzle1': hashlib.sha256('3'.encode()).hexdigest(),
        'puzzle2': hashlib.sha256('PERSEUS'.upper().encode()).hexdigest(),
        'puzzle3': hashlib.sha256('RED SKULL'.upper().encode()).hexdigest(),
        'puzzle4': hashlib.sha256('MICROTECH'.upper().encode()).hexdigest(),
        'puzzle5': hashlib.sha256('AS-12'.upper().encode()).hexdigest(),
    }
    
    print("=" * 60)
    print("PUZZLE ANSWER VERIFICATION")
    print("=" * 60)
    print()
    
    all_correct = True
    
    for puzzle_id, answer in answers.items():
        computed_hash = hash_answer(answer)
        expected_hash = expected_hashes[puzzle_id]
        
        match = computed_hash == expected_hash
        all_correct = all_correct and match
        
        status = "✓ PASS" if match else "✗ FAIL"
        
        print(f"{puzzle_id}:")
        print(f"  Answer: {answer}")
        print(f"  Hash: {computed_hash[:32]}...")
        print(f"  Status: {status}")
        print()
    
    print("=" * 60)
    if all_correct:
        print("✓ All puzzle hashes are correct!")
    else:
        print("✗ Some hashes don't match. Check your answers.")
    print("=" * 60)
    
    return all_correct

def generate_new_hash():
    """Interactive tool to generate hash for a new answer"""
    print("\n" + "=" * 60)
    print("GENERATE NEW ANSWER HASH")
    print("=" * 60)
    print("Enter a new answer to get its hash (or 'quit' to exit)")
    print()
    
    while True:
        answer = input("New answer: ").strip()
        
        if answer.lower() in ['quit', 'exit', 'q']:
            break
        
        if not answer:
            print("Please enter an answer.\n")
            continue
        
        hashed = hash_answer(answer)
        
        print(f"\nAnswer: {answer.upper()}")
        print(f"Hash: {hashed}")
        print("\nCopy this hash to app.py:")
        print(f"'puzzle_X': '{hashed}',")
        print()

if __name__ == '__main__':
    import sys
    
    print("\nStar Citizen Puzzle - Answer Hash Tool\n")
    
    # Verify existing puzzles
    verify_puzzles()
    
    # Offer to generate new hashes
    if len(sys.argv) > 1 and sys.argv[1] == '--generate':
        generate_new_hash()
    else:
        print("\nTo generate new answer hashes, run:")
        print("python test_answers.py --generate")
        print()