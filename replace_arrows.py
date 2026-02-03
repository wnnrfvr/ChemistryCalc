import os

# Define the directory to search
search_directory = r'c:\Users\ASUS\Desktop\Decadino\ChemistryCalc'

# Define the replacements
replacements = {
    '←': '<-',
    '→': '->'
}

# Walk through the directory and its subdirectories
for root, dirs, files in os.walk(search_directory):
    # Skip ignored directories
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if '.git' in dirs:
        dirs.remove('.git')
    
    for file in files:
        if file.endswith('.js'):  # Process only JavaScript files
            file_path = os.path.join(root, file)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check and perform replacements
                new_content = content
                modified = False
                for old, new in replacements.items():
                    if old in new_content:
                        new_content = new_content.replace(old, new)
                        modified = True
                
                if modified:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated: {file_path}")
            
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print("Arrow replacement complete.")
