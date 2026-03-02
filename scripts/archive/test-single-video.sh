#!/bin/bash

# Quick Single Video Test Script
# Usage: ./scripts/test-single-video.sh <video-filename> <intro-variant> <outro-variant>

set -e

if [ $# -ne 3 ]; then
    echo "Usage: $0 <video-filename> <intro-variant> <outro-variant>"
    echo "Example: $0 04-trampa-bebidas B B"
    echo "Variants: A, B, C, D, E"
    exit 1
fi

VIDEO_FILENAME=$1
INTRO_VARIANT=$2
OUTRO_VARIANT=$3

echo "🎬 Testing single video: $VIDEO_FILENAME"
echo "🎭 Intro Variant: $INTRO_Variant, Outro Variant: $OUTRO_VARIANT"

# Check if videos config exists
if [ ! -f "data/videos-batch-01.json" ]; then
    echo "❌ Videos config not found at data/videos-batch-01.json"
    exit 1
fi

# Get video props and template
VIDEO_PROPS=$(cat data/videos-batch-01.json | jq ".videos[] | select(.filename==\"$VIDEO_FILENAME\") | .props")
TEMPLATE=$(cat data/videos-batch-01.json | jq ".videos[] | select(.filename==\"$VIDEO_FILENAME\") | .template" | tr -d '"')

if [ "$VIDEO_PROPS" = "null" ]; then
    echo "❌ Video $VIDEO_FILENAME not found in data/videos-batch-01.json"
    exit 1
fi

echo "📋 Template: $TEMPLATE"

# Build props JSON
PROPS_JSON="{\"contentProps\": $VIDEO_PROPS, \"template\": \"$TEMPLATE\", \"introVariant\": \"$INTRO_VARIANT\", \"outroVariant\": \"$OUTRO_VARIANT\"}"

# Output filename
OUTPUT_FILE="out/test/${VIDEO_FILENAME}-intro${INTRO_VARIANT}-outro${OUTRO_VARIANT}.mp4"

# Create output directory
mkdir -p out/test

echo "🎥 Rendering..."
echo "  Props: $PROPS_JSON"
echo "  Output: $OUTPUT_FILE"

# Run remotion render
npx remotion render MyComposition "$OUTPUT_FILE" \
    --props="$PROPS_JSON" \
    --jpeg-quality=80

echo ""
echo "✅ Render complete: $OUTPUT_FILE"
echo "📊 Test this variant and track:"
echo "  - First 3 seconds retention"
echo "  - Overall completion rate"
echo "  - End-screen CTA clicks"
echo "  - Social engagement (likes, comments, shares)"