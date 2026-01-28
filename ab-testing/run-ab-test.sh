#!/bin/bash

# A/B Test Runner for Bilan Videos
# Usage: ./scripts/run-ab-test.sh

set -e

echo "🎬 Starting A/B Test Generation for Bilan Videos..."

# Create output directories
mkdir -p out/ab-test
mkdir -p out/batch

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "⚠️  jq is required but not installed. Please install jq first:"
    echo "   sudo apt-get install jq  # Ubuntu/Debian"
    echo "   brew install jq           # macOS"
    exit 1
fi

# Check if test config exists
if [ ! -f "data/ab-test-config.json" ]; then
    echo "❌ A/B test config not found at data/ab-test-config.json"
    exit 1
fi

# Check if videos config exists
if [ ! -f "data/videos-batch-01.json" ]; then
    echo "❌ Videos config not found at data/videos-batch-01.json"
    exit 1
fi

echo "📋 Reading configuration files..."

# Read configuration
TEST_CONFIG=$(cat data/ab-test-config.json)
VIDEOS_CONFIG=$(cat data/videos-batch-01.json)

# Function to render a specific video variant
render_video_variant() {
    local video_filename=$1
    local intro_variant=$2
    local outro_variant=$3
    local test_id=$4
    local template_name=$5
    
    echo "  🎥 Rendering $video_filename (Intro: $intro_variant, Outro: $outro_variant)"
    
    # Get video props
    local video_props=$(echo $VIDEOS_CONFIG | jq ".videos[] | select(.filename==\"$video_filename\") | .props")
    local template=$(echo $VIDEOS_CONFIG | jq ".videos[] | select(.filename==\"$video_filename\") | .template" | tr -d '"')
    
    # Use provided template name or get from config
    if [ "$template_name" != "" ]; then
        template="$template_name"
    fi
    
    # Build props JSON
    local props_json="{\"contentProps\": $video_props, \"template\": \"$template\", \"introVariant\": \"$intro_variant\", \"outroVariant\": \"$outro_variant\"}"
    
    # Output filename
    local output_file="out/ab-test/${video_filename}-${test_id}-intro${intro_variant}-outro${outro_variant}.mp4"
    
    # Run remotion render
    echo "    Props: $props_json"
    echo "    Output: $output_file"
    
    npx remotion render MyComposition "$output_file" \
        --props="$props_json" \
        --jpeg-quality=80 \
        --concurrency=2 || {
        echo "    ❌ Failed to render $video_filename with variants $intro_variant/$outro_variant"
        return 1
    }
    
    echo "    ✅ Rendered $output_file"
}

# Main A/B test generation
echo "🧪 Generating A/B test videos..."

# Loop through test matrix
test_ids=$(echo $TEST_CONFIG | jq -r '.testMatrix[].id')

for test_id in $test_ids; do
    echo ""
    echo "📊 Processing test: $test_id"
    
    # Get test configuration
    test_config=$(echo $TEST_CONFIG | jq ".testMatrix[] | select(.id==\"$test_id\")")
    intro_variant=$(echo $test_config | jq -r '.introVariant')
    outro_variant=$(echo $test_config | jq -r '.outroVariant')
    videos=$(echo $test_config | jq -r '.videos[]')
    hypothesis=$(echo $test_config | jq -r '.hypothesis')
    
    echo "  Hypothesis: $hypothesis"
    echo "  Videos: $videos"
    
    # Render each video in the test
    for video_filename in $videos; do
        render_video_variant "$video_filename" "$intro_variant" "$outro_variant" "$test_id"
    done
done

echo ""
echo "🎯 Generating all variants for single video (for detailed comparison)..."

# Generate all 5 variants for first video to compare directly
first_video=$(echo $VIDEOS_CONFIG | jq -r '.videos[0].filename')
echo "📈 All variants for $first_video:"

for variant in A B C D E; do
    render_video_variant "$first_video" "$variant" "$variant" "all-variants"
done

echo ""
echo "📋 Summary of generated videos:"
echo "Generated files in out/ab-test/:"
ls -la out/ab-test/ | grep ".mp4" | awk '{print "  " $9}' | sort

echo ""
echo "🔍 Quick Comparison Guide:"
echo "  - A: Curiosity hook + Community CTA"
echo "  - B: Pain agititon + Direct action"
echo "  - C: Authority + Challenge" 
echo "  - D: Social proof + Validation"
echo "  - E: Urgency + Limited offer"

echo ""
echo "📊 Next Steps:"
echo "1. Upload test videos to social media"
echo "2. Track views, completion rate, engagement for 7 days"
echo "3. Update data/results.json with performance data"
echo "4. Choose winning variant per video type"
echo "5. Regenerate final videos with winning variants"

echo ""
echo "✅ A/B Test generation complete!"
echo "📂 Check out/ab-test/ for generated videos"