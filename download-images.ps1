# Function to download image
function Download-Image {
    param (
        [string]$Url,
        [string]$FilePath
    )
    Invoke-WebRequest -Uri $Url -OutFile $FilePath
}

# Create images directory if it doesn't exist
$imagesDir = "public/images"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir
}

# Download Pablo logo
Download-Image -Url "https://raw.githubusercontent.com/user/pablo/main/logo.png" -FilePath "$imagesDir/pablo-logo.svg"

# Download Amex card image
Download-Image -Url "https://cdn.wallethub.com/common/product/images/creditcards/500/american-express-gold-card-1435220c.png" -FilePath "$imagesDir/amex-gold-card.png"

# Apartment 1 images
Download-Image -Url "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" -FilePath "$imagesDir/apt1-living.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1511882150382-421056c89033" -FilePath "$imagesDir/apt1-gaming.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" -FilePath "$imagesDir/apt1-master.jpg"

# Apartment 2 images
Download-Image -Url "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1" -FilePath "$imagesDir/apt2-living.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1556911220-bff31c812dba" -FilePath "$imagesDir/apt2-kitchen.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a" -FilePath "$imagesDir/apt2-bunk.jpg"

# Influencer avatars
Download-Image -Url "https://images.unsplash.com/photo-1494790108377-be9c29b29330" -FilePath "$imagesDir/influencer-sarah.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" -FilePath "$imagesDir/influencer-mike.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1534528741775-53994a69daeb" -FilePath "$imagesDir/influencer-emma.jpg"

# Article images
Download-Image -Url "https://images.unsplash.com/photo-1522083165195-3424ed129620" -FilePath "$imagesDir/article-uws.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1513883049090-d0b7439799bf" -FilePath "$imagesDir/article-kids.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1509440159596-0249088772ff" -FilePath "$imagesDir/article-bakeries.jpg" 