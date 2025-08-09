#!/bin/bash

# Fix DashboardLayout props across all TypeScript files
echo "Fixing DashboardLayout props..."

# Define the files that need fixing based on the TypeScript errors
files=(
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/finance/reports/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/reports/compliance/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/reports/personnel/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/tracking/certificates/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/tracking/expatriate/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/tracking/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/validation/expiry/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/validation/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/immigration/validation/visas/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/inspector/schedule/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/local-content/compliance/page.tsx"
    "/c/Projects/UpstreamTrackingSystem/frontend/src/app/dashboard/personnel/permit-applications/page.tsx"
)

# Fix each file
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing: $file"
        
        # Replace DashboardLayout with missing props
        # Add title and userRole props
        sed -i 's/<DashboardLayout sidebarItems={sidebarItems}>/<DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>/g' "$file"
        
        echo "Fixed: $file"
    else
        echo "File not found: $file"
    fi
done

echo "DashboardLayout props fixes completed!"