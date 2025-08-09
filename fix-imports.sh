#!/bin/bash

# Function to calculate relative path depth and fix imports
fix_file_imports() {
    local file="$1"
    local src_dir="/c/Projects/UpstreamTrackingSystem/frontend/src"
    
    # Calculate relative path from file to src directory
    local rel_path=$(realpath --relative-to="$src_dir" "$file")
    local dir_path=$(dirname "$rel_path")
    
    # Count directory depth
    local depth=0
    if [ "$dir_path" != "." ]; then
        depth=$(echo "$dir_path" | tr '/' '\n' | wc -l)
    fi
    
    # Create correct relative path
    local correct_path=""
    for ((i=0; i<depth; i++)); do
        correct_path="../$correct_path"
    done
    correct_path="${correct_path}app/components/layouts/"
    
    # Fix the imports using sed
    sed -i "s|from ['\"]\\.\\.\\(/\\.\\.\\)*/app/components/layouts/DashboardLayout['\"]|from '${correct_path}DashboardLayout'|g" "$file"
    sed -i "s|from ['\"]\\.\\.\\(/\\.\\.\\)*/app/components/layouts/DashboardMenus['\"]|from '${correct_path}DashboardMenus'|g" "$file"
    
    echo "Fixed imports in: $file"
}

# Find all .tsx and .ts files and fix their imports
find /c/Projects/UpstreamTrackingSystem/frontend/src -name "*.tsx" -o -name "*.ts" | while read -r file; do
    if grep -q "from ['\"]\\.\\.\\(/\\.\\.\\)*/app/components/layouts/Dashboard" "$file"; then
        fix_file_imports "$file"
    fi
done

echo "Import path fixes completed!"