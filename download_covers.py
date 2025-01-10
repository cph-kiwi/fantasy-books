import json
import requests
import os
from pathlib import Path

def create_public_folder():
    # Create a 'public/covers' directory if it doesn't exist
    Path("public/covers").mkdir(parents=True, exist_ok=True)

def download_cover(isbn, size='L'):
    """
    Download cover image for a given ISBN
    size can be 'S', 'M', or 'L' for small, medium, or large
    """
    url = f"https://covers.openlibrary.org/b/isbn/{isbn}-{size}.jpg"
    response = requests.get(url)
    
    # Check if we got a valid image (Open Library returns a 1x1 pixel for missing covers)
    if response.status_code == 200 and len(response.content) > 1000:  # Assuming any real cover is > 1KB
        return response.content
    return None

def save_cover(isbn, image_data):
    """Save the cover image to the public/covers directory"""
    filename = f"public/covers/{isbn}.jpg"
    with open(filename, 'wb') as f:
        f.write(image_data)
    return f"covers/{isbn}.jpg"  # Return relative path for use in your application

def process_books(json_file):
    # Read the JSON file
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    # Create the public folder
    create_public_folder()
    
    # Process each book
    for book in data['books']:
        isbn = book['isbn'].replace('-', '')  # Remove hyphens from ISBN
        print(f"Downloading cover for {book['title']}...")
        
        # Try to download the cover
        image_data = download_cover(isbn)
        if image_data:
            # Save the image and update the coverImage path in the JSON
            relative_path = save_cover(isbn, image_data)
            book['coverImage'] = f"/{relative_path}"  # Update to use local path
            print(f"✓ Successfully downloaded cover for {book['title']}")
        else:
            print(f"✗ No cover found for {book['title']}")
    
    # Save the updated JSON with local paths
    with open(json_file, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    process_books('src/assets/fantasy-books.json')