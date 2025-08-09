#!/bin/bash

# Fix Heroicons imports across all TypeScript files
echo "Fixing Heroicons imports..."

# Find all .tsx files and fix the icon imports
find /c/Projects/UpstreamTrackingSystem/frontend/src -name "*.tsx" | while read -r file; do
    # Fix TrendingUpIcon -> ArrowTrendingUpIcon
    sed -i 's/TrendingUpIcon/ArrowTrendingUpIcon/g' "$file"
    
    # Fix TrendingDownIcon -> ArrowTrendingDownIcon
    sed -i 's/TrendingDownIcon/ArrowTrendingDownIcon/g' "$file"
    
    # Fix DatabaseIcon -> CircleStackIcon (or another appropriate icon)
    sed -i 's/DatabaseIcon/CircleStackIcon/g' "$file"
    
    # Fix double Arrow prefixes (ArrowArrowTrendingUpIcon -> ArrowTrendingUpIcon)
    sed -i 's/ArrowArrowTrendingUpIcon/ArrowTrendingUpIcon/g' "$file"
    
    # Fix TransferIcon -> ArrowsRightLeftIcon (if it exists)
    sed -i 's/TransferIcon/ArrowsRightLeftIcon/g' "$file"
    
    echo "Fixed icons in: $file"
done

echo "Heroicons fixes completed!"