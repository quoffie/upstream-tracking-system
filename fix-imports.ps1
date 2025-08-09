# PowerShell script to fix import paths
$frontendSrc = "C:\Projects\UpstreamTrackingSystem\frontend\src"

# Get all .tsx and .ts files recursively
$files = Get-ChildItem -Path $frontendSrc -Recurse -Include "*.tsx", "*.ts" | Where-Object { $_.FullName -notlike "*node_modules*" }

$fixedCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Calculate the relative path depth from the file to the app directory
    $relativePath = $file.FullName.Replace($frontendSrc, "").Replace("\", "/")
    $pathParts = $relativePath.Split("/") | Where-Object { $_ -ne "" }
    $depth = $pathParts.Length - 1  # Subtract 1 for the file itself
    
    # Create the correct relative path
    $correctPath = "../" * $depth + "app/components/layouts/"
    
    # Fix DashboardLayout imports
    $content = $content -replace "from\s+['\"]\.\.(\/\.\.)*\/app\/components\/layouts\/DashboardLayout['\"]", "from '$correctPath" + "DashboardLayout'"
    
    # Fix DashboardMenus imports
    $content = $content -replace "from\s+['\"]\.\.(\/\.\.)*\/app\/components\/layouts\/DashboardMenus['\"]", "from '$correctPath" + "DashboardMenus'"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed imports in: $($file.FullName)"
        $fixedCount++
    }
}

Write-Host "`nFixed imports in $fixedCount files"
Write-Host "Import path fixes completed!"